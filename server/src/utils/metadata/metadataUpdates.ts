import connection from "../../db/dbAPI.ts";
import type { BackUpMetadata, Chunk, FileData } from "../../models/models.ts";

const updateMetadata =  async (metadata : BackUpMetadata) : Promise<string[]> => {
    let hashOfChunksToSend : string[] = [];
    
    await createNewFiles(metadata.files);
    hashOfChunksToSend = await  insertNewChunks(metadata.chunks);
    deleteFileChunkRows(metadata.chunks);
    updateOffsets(metadata.chunks);

    return hashOfChunksToSend;
};

const createNewFiles = async (files : FileData[]) => {
    let qry = "Insert into File (fullpath, size) values (?, ?)"

    for(const file of files) {
        connection.query(qry, [file.path, file.size]);
    }
};

const deleteFileChunkRows = (chunks : Map<string, Chunk[]>) => {
    let qry = `delete from File-Chunk where hashSha256 not in ? and filePath <> ?`

    for(const [filePath, chunk] of chunks) {
        connection.query(qry, [chunk, filePath])
    }
};  

const insertNewChunks = async (chunks : Map<string, Chunk[]>) : Promise<string[]> => {
    let insertQry = "INSERT IGNORE INTO Chunk (hashSha256) VALUES (?)";
    let hashesInserted : string[] = [];

    for(const [filePath, chunk] of chunks) {
        for(const c of chunk) {
            connection.query(insertQry, [c.hash], (error, result) => {
                if (result.affectedRows === 1) {
                    createNewFileChunk(c.filePath, c.hash, c.offset);
                    hashesInserted.push(c.hash);
                }
            })
        }
    }
    return hashesInserted;
};

const createNewFileChunk = (filePath : string, chunkHash : string, offset : number) => {
    let qry = "Insert into File-Chunk (hashSha256, filePath, offset) values (?, ?, ?)";

    connection.query(qry, [chunkHash, filePath, offset]);
};

const updateOffsets = (chunks : Map<string, Chunk[]>) => {
    let updateQry = "update File-Chunks set offset = ? where (hashSha256 = ? and filePath = ? and offset <> ?)"

    for(const [filePath, chunk] of chunks) {
        for(const c of chunk) {
            connection.query(updateQry, [c.offset, c.hash, filePath, c.offset]);
        }
    }
}

export { updateMetadata }