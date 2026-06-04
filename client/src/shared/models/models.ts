export type AuthState = 'Checking'| 'Unauthorized' | 'Authorized'

export type BackUpState = {
    date : Date,
    status : boolean,
    amountSaved : number,
    spaceUsed : number // Newly used space in this backup
}