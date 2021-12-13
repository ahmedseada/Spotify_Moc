import { IArtitstSearchItem, ITrackSearchItem } from "./SearchItems";

export interface ITrackSeachResult{
    href : string,
    items : Array<ITrackSearchItem> ,
    limit : number,
    next : string ,
    offset:number,
    previous:string,
    total : number
}
export interface IArtistSeachResult{
    href : string,
    items : Array<IArtitstSearchItem> ,
    limit : number,
    next : string ,
    offset:number,
    previous:string,
    total : number
}

// export interface I