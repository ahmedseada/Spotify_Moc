import { app, BrowserWindow } from "electron";
import  path  from 'path';
interface IFormServices{
    window: BrowserWindow;
    create_window(viewName :string) : void;
  
    send(channel : string , data : any) : void;
}

export class FormServices implements IFormServices{
    window!: BrowserWindow;
    appPath :string  = require.main?.path.toString() || "";
    constructor(viewName :string) {
        this.create_window(viewName)
      
    }
    send(channel: string, data: any): void {
      this.window.webContents.send(channel,data);
    }
 
    create_window(viewName :string) {
              this.window = new  BrowserWindow({
                autoHideMenuBar : true,
                titleBarStyle:"hidden",
                width : 1366,
                height : 700,                
                webPreferences : {
                    nodeIntegration:true,
                    contextIsolation : false
                }
            });
            this.window.loadFile(path.join(this.appPath , "views",viewName +".html"));
    }
    error(message:string){
        this.send("error-msg",message);
    }
  
}