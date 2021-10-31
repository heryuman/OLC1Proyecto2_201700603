import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Detener from "../SentBreak";
import Continue from "../sent_transfer/Sentcontinue";
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
        //controlador.lista_ts.push(ts_local);
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

                                if(res instanceof Continue){

                                    let error = new Errores("Semantico"," la palabra continue no corresponde a la estructura de la instruccion Swithc",this.linea,this.columna);
                                    controlador.errores.push(error);
                                    controlador.append(`**Error:semántico, en la instruccion Switch en la linea: ${this.linea} y columna: ${this.columna}`);
                                    return tipo.ERROR;
                                }

                                if (res instanceof Detener){
                                    return res;
                                }else{

                                    siguiente_caso=true;
                                }
                            }
                        else{

                            if(siguiente_caso==true){

                                let res:any= cases.ejecutar(controlador,ts_local);

                                if(res instanceof Continue){

                                    let error = new Errores("Semantico"," la palabra continue no corresponde a la estructura de la instruccion Swithc",this.linea,this.columna);
                                    controlador.errores.push(error);
                                    controlador.append(`**Error:semántico, en la instruccion Switch en la linea: ${this.linea} y columna: ${this.columna}`);
                                    return tipo.ERROR;
                                }
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

        let padre = new Nodo("Sentencia_Switch","");
        padre.AddHijo(new Nodo("Switch",""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new Nodo(")",""));
        padre.AddHijo(new Nodo("{",""));

        let hijo = new Nodo("casos","")
        for( let caso of this.casos){
            
            hijo.AddHijo(caso.recorrer());
            
        }
        padre.AddHijo(hijo);

        padre.AddHijo(new Nodo("}",""));




        return padre;
    }

}