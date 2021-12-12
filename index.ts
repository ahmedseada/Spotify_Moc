import { app } from 'electron';
import { Library } from './Forms/Library';
import { Main } from './Forms/Main';




app.on("ready",(evt,args)=>{
        let mainForm = new Main();
        
        // let lib = new Library();
})