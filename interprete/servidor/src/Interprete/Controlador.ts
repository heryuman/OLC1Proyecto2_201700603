import Errores from "./Ast/Errores";

export default class Controlador{

    public errores: Array<Errores>;
    public consola:string;
    public sent_ciclica:boolean;

    constructor(){
        this.errores=new Array<Errores>();
        this.consola="";
        this.sent_ciclica=false;
    }

    append(cadena:string){

        this.consola=this.consola+cadena+"\n";
    }
    
}