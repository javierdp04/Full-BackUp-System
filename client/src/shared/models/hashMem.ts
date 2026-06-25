import { Chunk } from "./models";

class chunkMemManager {
    private memSet : Set<Record<string, Chunk[]>>;

    constructor(newSet : Set<Record<string, Chunk[]>> = new Set<Record<string, Chunk[]>>() ){
        this.memSet = newSet
    }

    addChunk(newChunk : Record<string, Chunk[]> | Record<string, Chunk[]>[]) : void{
        if(Array.isArray(newChunk)) {
            for( let chunk of newChunk) this.memSet.add(chunk);
        } else {
            this.memSet.add(newChunk);
        }
    }
    getChunks() : Set<Record<string, Chunk[]>> {
        return this.memSet;
    }
}

export default chunkMemManager;