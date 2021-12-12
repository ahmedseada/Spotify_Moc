import { FormServices } from './../Services/FormServices';
export class Main{
    formServices! : FormServices ;
    
    constructor() {
            this.formServices  = new FormServices("Main");
    }
}