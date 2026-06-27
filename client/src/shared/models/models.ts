export type AuthState = 'Checking'| 'Unauthorized' | 'Authorized'

export type BackUpState = {
    date : Date,
    status : boolean,
    amountSaved : number,
    spaceUsed : number // New used space in this backup
}

export type Chunk = {
    offset : number,
    hash : string,
    filePath : string
}

export type FileData = {
    path : string,
    size : number
}

export type BackUpMetadata = {
    "chunks" : Map<string, Chunk[]>,
    "files" : FileData[]
}