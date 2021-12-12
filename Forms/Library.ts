import { FormServices } from "../Services/FormServices";

export class Library{
    formServices! : FormServices;
    
    constructor() {
            this.formServices = new FormServices("Library");
    } 
}