import {  ITrackSearch ,IArtistSearch } from '../Models/SearchInterface';
import { ipcMain, app } from "electron";
import { FormServices } from "./../Services/FormServices";
import denv from 'dotenv';
import axios from "axios";
export class Main {
  formServices!: FormServices;

  constructor() {
    this.formServices = new FormServices("Main");
    this.listen();
    denv.config();
  }
   listen() {
    console.log("Listening...");

   
     
       
    ipcMain.on("load-tracks", async (evt, search_term  ,search_type) => {
      
      let term = encodeURI(search_term);
        let url = `https://api.spotify.com/v1/search?q=${term}&type=${search_type}&limit=20`;
        try {
            let  res = await   axios(url, {
                headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization:
                              "Bearer " + process.env.Brear_TOKEN
                          }
              });
              if (search_type =="track") {
                let searResult = res.data as ITrackSearch;
                
                this.formServices.send("tracks",  searResult.tracks.items);
              }else{
                let searResult = res.data as IArtistSearch;
                this.formServices.send("artists",  searResult.artists.items);
              }
        } catch (error :any) {
          console.log(error);
            this.formServices.error(error.message);
        }
      
     
    });
 
    ipcMain.on("min", (evt, args) => {
      this.formServices.window.minimize();
    });
    ipcMain.on("close", (evt, args) => {
  
      app.exit(0);
    });
    ipcMain.addListener("max", (evt, args) => {
      console.log("Maxmized  ? ", this.formServices.window.isMaximized());
      this.formServices.window.setMinimumSize(800, 700);
      if (this.formServices.window.isMaximized()) {
        this.formServices.window.setSize(1, 2);
      } else {
        this.formServices.window.maximize();
      }
    });
  }
}
