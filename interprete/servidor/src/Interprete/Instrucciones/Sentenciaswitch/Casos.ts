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
      
        controlador.lista_ts.push(ts_local);
        let parar=false;
       
            
        
            for (let ins of this.L_instrucciones){

                let res:any = ins.ejecutar(controlador,ts_local);
                if( res instanceof Detener){
                    console.log("hay detener");
                    this.parar=true;
                    return res;
 
                }
               
            }
        


       

    }

    recorrer():Nodo{

        let padre = new Nodo("Caso","");
        padre.AddHijo(new Nodo("case",""));
        if(this.default == false){
            padre.AddHijo(this.condicion.recorrer());

        }else{

            padre.AddHijo(new Nodo("default",""));
        }
       
        padre.AddHijo(new Nodo(":",""));
        for(let inst of this.L_instrucciones){

            padre.AddHijo(inst.recorrer());
        }
       
      

        return padre;
        

    }


}