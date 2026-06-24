import { Chunk } from "../shared/models/models"
import { chunksToHash, fileSliceToHash } from "./crypto_utils";
import { FileData } from "../shared/models/models";


const fileToChunks = async (file : File) : Promise<Chunk[]> => { // units(chunkSize) == Byte
    let chunkPromises : Promise<Chunk>[] = [];
    const chunkSize : number = Number(await window.electronApi.getEnvVariable("CHUNK_SYZE"));

    if(!chunkSize) Promise.reject({error : "An error occured processing your files"});

    try{
        for(let offset = 0; offset<(file.size/chunkSize);offset++) {
        let slice = file.slice(offset*chunkSize, offset*chunkSize+chunkSize);

        const chunkPromise = fileSliceToHash(slice).then(hash => ({
            offset: offset,
            hash: hash
        }));
        chunkPromises.push(chunkPromise);
        }
    }catch(error){
        Promise.reject({error : `An error occured processing your files : ${error}`});
    }

    return Promise.all(chunkPromises);
}

const rawFilesHandler = async (files : File[]) : Promise<FileData[]> => {
    const procesedFiles : FileData[] = []
    
    try{
        for(let file of files) {
            let chunks : Chunk[] = await fileToChunks(file);
            let fileHash : string =  await chunksToHash(chunks);
            
            procesedFiles.push({
                hash : fileHash,
                path : file.webkitRelativePath
            })
        }
    }catch(error) {
        Promise.reject({error : `An error occured processing your files : ${error}`});
    };
    return Promise.resolve(procesedFiles);
}

