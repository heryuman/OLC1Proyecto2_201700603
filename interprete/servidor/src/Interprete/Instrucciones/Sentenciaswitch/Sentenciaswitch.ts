import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Detener from "../SentBreak";
import Caso from "./Casos";



export default class Sentenciaswitch implements Instruccion{

    public condicion:Expresion;
    public casos:Array<Caso>;
    public linea: number;
    public columna: number;

    constructor(condicion:Expresion,casos:Array<Caso>, linea:number,columna:number){

        this.condicion=condicion;
        this.casos=casos;
        this.linea=linea;
        this.columna=columna;

        
    }


    ejecutar(controlador:Controlador,ts:TablaSimbolos){
        console.log("dentro del switch");
        let ts_local=new TablaSimbolos(ts);
        let siguiente_caso=false;
        for (let cases of this.casos){

                if(cases.default != true){
                    
                  
                    let  val_condicion=this.condicion.getValor(controlador,ts);
                    let  val_condicion_case=cases.condicion.getValor(controlador,ts);
                    let  tipo_condicion= this.condicion.getTipo(controlador,ts);
                    let tipo_condicion_caso= cases.condicion.getTipo(controlador,ts)
                    console.log("tipo condicon del caso");
                    console.log(tipo_condicion_caso);
                    console.log("tipo condicion switch");
                    console.log(tipo_condicion);
                    if(tipo_condicion==tipo_condicion_caso){

                        if(val_condicion == val_condicion_case){
                                let res:any= cases.ejecutar(controlador,ts_local);
                                if (res instanceof Detener){
                                    return res;
                                }else{

                                    siguiente_caso=true;
                                }
                            }
                        else{

                            if(siguiente_caso==true){

                                let res:any= cases.ejecutar(controlador,ts_local);
                                        if (res instanceof Detener){
                                            siguiente_caso=false;
                                            return res;
                                        }else{
        
                                            siguiente_caso=true;
                                        }
        
                            }
                        }
                        

                    }else{

                       {

                            let error = new Errores("Semantico", `El tipo de de la condicion del case [${val_condicion_case}], no corresponde al tipo de la condicion del switch.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, El tipo de de la condicion del case [${val_condicion_case}], no corresponde al tipo de la condicion del switch [${val_condicion}]. en la fila ${this.linea} y columna ${this.columna}`);
                    
                        }

                    
                    }

                  
                    
                }else{

                   let res:any= cases.ejecutar(controlador,ts);
                   if(res instanceof Detener){

                    return res;
                   }
                }
            

        }

    }

    recorrer():Nodo{

        throw new Error("Metodo no implementado");
    }

}