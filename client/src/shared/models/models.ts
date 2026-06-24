export type AuthState = 'Checking'| 'Unauthorized' | 'Authorized'

export type BackUpState = {
    date : Date,
    status : boolean,
    amountSaved : number,
    spaceUsed : number // New used space in this backup
}

export type Chunk = {
    offset : number,
    hash : string
}

export type FileData = {
    hash : string,
    path : string
}