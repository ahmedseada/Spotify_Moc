import { ipcMain , Dialog, dialog, app } from 'electron';
import { FormServices } from './../Services/FormServices';
export class Main{
    formServices! : FormServices ;
    
    constructor() {
            this.formServices  = new FormServices("Main");
            this.listen()
    }
     listen(){
        console.log("Listening...");
    
        ipcMain.on('load-tracks',async (evt,args)=>{
            console.log("Clicked");
            
             let {filePaths} =  await 
             dialog.showOpenDialog(this.formServices.window,{title : "Select Tracks" ,buttonLabel : "Select Tracks"   ,properties : ['multiSelections'] });

             this.formServices.send("paths",filePaths);
                
            
            
            

        });

        // this.formServices.
        //  dialog.showOpenDialogSync(this.formServices.window);
        // ipcMain.removeAllListeners();
        ipcMain.on('min',(evt,args)=>{
            this.formServices.window.minimize();
        })
        ipcMain.on('close',(evt,args)=>{
            // this.formServices.window.close();
            console.log("Exting.....");
            
            app.exit(0);
        })
        ipcMain.addListener('max',(evt,args)=>{
            console.log("Maxmized  ? " ,this.formServices.window.isMaximized());
            this.formServices.window.setMinimumSize(800,700);
            if (this.formServices.window.isMaximized()) {
                    console.log("Got If");
                    
                    this.formServices.window.setSize(1,2);
                }else{
                    console.log("Got Else");
                this.formServices.window.maximize();

            }
        })
      
    }
}