import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Detener from "../SentBreak";


export default class Caso implements Instruccion{

    public condicion:Expresion;
    public L_instrucciones:Array<Instruccion>;
    public default:boolean;
    public linea:number;
    public columna:number;
    public parar:boolean;

    constructor(condicion:Expresion,instruccs:Array<Instruccion>,def:boolean, fila:number,columna:number){

        this.condicion=condicion;
        this.L_instrucciones=instruccs;
        this.default=def;
        this.linea=fila;
        this.columna=columna;
        this.parar=false;

    }

    ejecutar(controlador:Controlador, ts:TablaSimbolos){
        let ts_local= new TablaSimbolos(ts);
        console.log("se ejecutara el caso");
        let parar=false;
       
            
        
            for (let ins of this.L_instrucciones){

                let res = ins.ejecutar(controlador,ts_local);
                if(ins instanceof Detener || res instanceof Detener){
                    console.log("hay detener");
                    this.parar=true;
 
                }
               
            }
        


       

    }

    recorrer():Nodo{

        throw new Error("Metodo no implementado");
    }


}