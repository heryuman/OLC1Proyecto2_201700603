import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Detener from "./SentBreak";
import Continue from "./sent_transfer/Sentcontinue";
import Sent_return from "./sent_transfer/Sent_return";



export default class Sentenciaif implements Instruccion {

    public condicion : Expresion;
    public listaIfs  : Array<Instruccion>;
    public listaElses: Array<Instruccion>;

    public linea: number;
    public columna: number;

    constructor(exp:Expresion,l_ifs: Array<Instruccion>,l_elses:Array<Instruccion>,linea:number,columna:number){

        this.condicion=exp;
        this.listaIfs=l_ifs;
        this.listaElses=l_elses;
        this.linea=linea;
        this.columna= columna;
    }

    ejecutar(controlador:Controlador, ts:TablaSimbolos){
     
        let ts_local = new TablaSimbolos(ts);

        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO ||this.condicion.getTipo(controlador, ts) == tipo.ENTERO || this.condicion.getTipo(controlador, ts) == tipo.DOBLE || this.condicion.getTipo(controlador, ts) == tipo.CADENA || tipo.CARACTER){
            if(valor_condicion){
                for(let ins of this.listaIfs){
                    let res = ins.ejecutar(controlador, ts_local);
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETURN
                    if(res instanceof Detener){
                        if(controlador.sent_ciclica){
                            return res;
                        }else{
                            let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
                        }
                    }

                    if(res instanceof Continue){
                        if(controlador.sent_ciclica){
                            console.log("se detecto continue");
                            return res;
                        }else{
                            let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
                        }
                    }

                    if (res instanceof Sent_return){

                        return res;
                    }
                   

                    if( res != null){
                        return res;
                    }
                }
            }else{
                for(let ins of this.listaElses){
                    
                    let res = ins.ejecutar(controlador,ts_local);

                    if( res instanceof Detener  ){
                        if(controlador.sent_ciclica){
                            return res;
                        }else{
                            let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
                        }
                    }

                    if(res instanceof Continue){
                        if(controlador.sent_ciclica){
                            return res;
                        }else{
                            let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
                        }
                    }

                    if (res instanceof Sent_return){

                        return res;
                    }
                   

                    if( res != null){
                        return res;
                    }

                    
                }
            }
        }
        return null;
    }

    recorrer():Nodo{

        throw new Error("Metodo no implementado");

    }

}