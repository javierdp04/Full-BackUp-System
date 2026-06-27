import { fileSliceToHash, getToken  } from "./crypto_utils";
import { FileData, Chunk, BackUpMetadata } from "../shared/models/models";

const sendMetadataAndGetFilesToSend(metaData : BackUpMetadata) : Promise<any> => {
    const jwt : string | null = getToken();
    if(!jwt || jwt?.length === 0) throw Error("Can't get jwt");

    const serializable = {
        chunks: Object.fromEntries(metaData.chunks), // Map → objeto plano
        files: metaData.files
    }

    let response = await fetch("/backup/update-metadata", {
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${jwt}`,
            "Content-type" : "application/json"
        },
        body : JSON.stringify(serializable);
    })
}

const packageBackUpMetaData = async (files : File[]) : Promise<BackUpMetadata> => {
    let result : BackUpMetadata = {
        chunks : new Map<string, Chunk[]>,
        files : []
    };

    result["files"] = standarizeFileFormat(files);
    result["chunks"] = await standarizeAllChunks(files);

    return result;
}

const standarizeFileFormat = (files : File[]) : FileData[] => {
    const standarizedFiles : FileData[] = [];

    for(const file of files) {
        standarizedFiles.push({
            path : file.webkitRelativePath,
            size : file.size
        })
    }

    return standarizedFiles;
}

const standarizeAllChunks = async (files : File[]) : Promise<Map<string, Chunk[]>> => {
    const result = new Map<string, Chunk[]>();

    for(const file of files) {
        const [filePath, chunks] = await extractChunksFromFile(file);
        result.set(filePath, chunks);
    }

    return result;
}


const extractChunksFromFile = async (file : File) : Promise<[string, Chunk[]]> => {
    const chunks : Chunk[] = [];
    const chunkSize = Number(await window.electronApi.getEnvVariable("CHUNK_SIZE"));
    const chunkNum = Math.ceil(file.size/chunkSize);
    try{   
        for(let offset = 0;offset<chunkNum;offset++){
            const rawChunk = file.slice(offset*chunkSize, offset*chunkSize+chunkSize);
            const chunkHash : string = await fileSliceToHash(rawChunk);
            
            chunks.push({
                offset : offset,
                hash : chunkHash,
                filePath : file.webkitRelativePath
            })
        }
    }catch(err){
        throw err;
    }
    const filePath : string = chunks.at(0)!.filePath;7
    

    return [filePath, chunks];
}


