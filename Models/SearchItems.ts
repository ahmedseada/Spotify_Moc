import { IArtist } from "./Artist";
import { IAlbum } from "./Album";

export interface ITrackSearchItem { 
    album:IAlbum,
    id:string,
    artists : Array<IArtist>
    href:string,
    preview_url :string,
    type:string,
    name : string
}

export interface IArtitstSearchItem{
    album:IAlbum,
    id:string,
    images : Array<{
        url : string ,
        width : number,
        height : number
    }>,
    href:string,
    type:string,
    name : string 

}