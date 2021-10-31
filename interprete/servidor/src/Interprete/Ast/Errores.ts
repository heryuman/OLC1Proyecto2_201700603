import Controlador from "../Controlador";
import { lista_errores } from "./Lista_Errores";

export default class Errores{

    public tipo : string;
    public descripcion : string;
    public linea : number;
    public columna : number;
   

    constructor(tipo: string, descripcion:string, linea:number, columna:number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;

        if(tipo.toLowerCase()=="sintactico" || tipo.toLowerCase() == "lexico"){

            console.log("se alamacena un error de tipo: "+tipo.toLowerCase())
            
         
            lista_errores.L_Errores.push(this);// this es todo lo que contiene el constructor
          
        }
    }

    ejecutar(){

      
        
    }
 
}