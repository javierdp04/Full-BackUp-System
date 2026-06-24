import { Chunk } from "../shared/models/models";

const fileSliceToHash= async (slice : Blob) : Promise<string> => {
    let content = await slice.text();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const hashAlg = await window.electronApi.getEnvVariable("HASH_ALG_FILES");

    const data = encoder.encode(content);

    let hash = await crypto.subtle.digest(hashAlg, data);
    let result = decoder.decode(hash);

    return Promise.resolve(result);
}   

const chunksToHash = (chunks : Chunk[]) : Promise<string> => {
    let joinedHash : string = "";

    chunks.map((chunk) => {
        joinedHash += chunk.hash;
    })

    return Promise.resolve(joinedHash);
}

export { fileSliceToHash, chunksToHash }