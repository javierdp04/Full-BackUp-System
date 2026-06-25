import connection from "../../db/dbAPI.ts"
import type {Chunk}  from "../../models/models.ts";

const compareFilesWithDB = async (hashes : string[]) : Promise<string[]> => {
    const qry = `Select hash from File where File.hash = ? `;
    const hashesList : string[] = [];

    for( const hash of hashes) {   
        connection.query(qry, hash, (err, results) => {
            if(err) throw err;

            if(results.lenght != 0 ) hashesList.push(hash);
        })
    }
    return hashesList;
}

const compareChunksWithDB = async (chunks : Chunk[]) : Promise<Chunk[]> => {
    const qry = "Select hash form Chunk where Chunk.hash = ?";
    const chunkList : Chunk[] = [];

    for(const chunk of chunks) {
        connection.query(qry, chunk.hash, (err, results) => {
            if(err) throw err;

            if(results.lenght! != 0 ) chunkList.push(chunk);
        })
    }
    return chunkList;
}

export {compareChunksWithDB, compareFilesWithDB};