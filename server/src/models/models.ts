export type FileData = {
    path : string,
    size : number
}

export type Chunk = {
    offset : number,
    hash : string,
    filePath : string
}

export type BackUpMetadata = {
    "chunks" : Map<string, Chunk[]>,
    "files" : FileData[]
}
