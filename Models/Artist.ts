export interface IArtist{
    name:string,
    id:string,
    images : Array<{
        url : string,
        height : number,
        width : number
    }>
}