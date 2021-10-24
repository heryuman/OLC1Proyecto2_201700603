import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Detener from "./SentBreak";
import Continue from "./sent_transfer/Sentcontinue";


export default class Sentfor implements Instruccion{


    public declafor:Instruccion;
    public condicion:Expresion;
    public actualizacion:Instruccion;
    public list_instruciones:Array<Instruccion>;
    public linea:number;
    public columna:number;

    constructor(declafor:Instruccion,condiciion:Expresion,control:Instruccion,Instruccs:Array<Instruccion>,linea:number,columna:number){

        this.declafor=declafor;
        this.condicion=condiciion;
        this.actualizacion=control;
        this.list_instruciones=Instruccs;
        this.linea= linea;
        this.columna=columna

    }
     

    ejecutar(controlador:Controlador,ts:TablaSimbolos){

       let ts_local = new TablaSimbolos(ts);
       let temp= controlador.sent_ciclica;
       controlador.sent_ciclica=true;
       this.declafor.ejecutar(controlador,ts_local);

       
      

       if (this.condicion.getTipo(controlador,ts_local) == tipo.BOOLEANO){

        
        while(this.condicion.getValor(controlador,ts_local)){

            let ts_local2= new TablaSimbolos(ts_local);

            for(let inst of this.list_instruciones){

                let res= inst.ejecutar(controlador,ts_local2);

                if(res != null || res != undefined){

                    if(res instanceof Detener){

                        controlador.sent_ciclica=temp
                        return res;
                    }
                    else if(res instanceof Continue){

                        this.actualizacion.ejecutar(controlador,ts_local2);
                    }
                }

            }
           this.actualizacion.ejecutar(controlador,ts_local);
          
        }


       }else{
        let error = new Errores("Semantico", `La condicion no es booleana y eso produjo un error.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semántico, La condicion no es booleana y eso produjo un error. En la línea ${this.linea} y columna ${this.columna}`);
            return tipo.ERROR;

       }

       controlador.sent_ciclica=temp;
       return null;

    }

    recorrer():Nodo{

        throw new Error("Method not implemented.");
    }
}