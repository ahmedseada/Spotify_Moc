export interface IAlbum{
    id : string,
    name:string
    images : Array<{
        url : string,
        height : number,
        width : number
    }>
}