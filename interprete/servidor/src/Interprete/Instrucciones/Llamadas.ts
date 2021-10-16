import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import parametro from "./parametro";
import Sent_return from "./sent_transfer/Sent_return";



export default class Llamadas implements Instruccion{


    public id_llamada:string;
    public lista_params:Array<Expresion>;
    public linea:number;
    public columna:number;

    constructor(id_llamada:string,lparamas:Array<Expresion>, linea:number,columna:number){
        this.id_llamada=id_llamada;
        this.lista_params=lparamas;
        this.linea=linea;
        this.columna=columna;
    }


    ejecutar(controlador:Controlador,ts:TablaSimbolos){
        var cont=0;
        let iguales=false;
        
        if(ts.existe(this.id_llamada)){
            let ts_local= new TablaSimbolos(ts);
            console.log("existe la funcion "+this.id_llamada);
            let simbol= ts.getSimbolo(this.id_llamada);
            if(simbol?.simbolo==2){

               // console.log("el tipo de simbolo es: "+simbol?.simbolo)
               

             /*   for (let param of this.lista_params){

                    if(simbol.lista_params != undefined){

                        for(let paramsim of simbol.lista_params){

                            //console.log("antes if el tipo param: "+param.getTipo(controlador,ts)+" el tipo paramsim: "+paramsim.tipo.enum_tipo);

                            if(param.getTipo(controlador,ts)== paramsim.tipo.enum_tipo){

                                console.log("el tipo param: "+param.getTipo(controlador,ts)+" el tipo paramsim: "+paramsim.tipo.enum_tipo);
                                cont=cont+1;
                                let valorParam= param.getValor(controlador,ts)
                                console.log("nuevo valor:"+valorParam+" del parametro"+paramsim.identificador);
                                paramsim.setValor(valorParam)

                                

                                if(cont== this.lista_params.length && cont == simbol.lista_params.length){
                                    console.log("el num param es: "+cont);
                                    iguales=true;
                                }



                            }
                        }


                    }
                }*/

                for(let i=0; i<this.lista_params.length; i++){

                    if(simbol.lista_params != undefined){
                        if(this.lista_params[i].getTipo(controlador,ts)==simbol.lista_params[i].tipo.enum_tipo){

                            let valor_param= this.lista_params[i].getValor(controlador,ts);
                            let id_param_sim= simbol.lista_params[i].identificador;
                            simbol.lista_params[i].setValor(valor_param);
                            let tipo_sim= simbol.lista_params[i].tipo;
                            let valor_param_sim= simbol.lista_params[i].valor;

                            console.log("el nuevo valor del simbolo: "+id_param_sim+" es: "+valor_param_sim);

                            let nsimbolo= new Simbolo(1,tipo_sim,id_param_sim,valor_param);
                            ts_local.agregar(id_param_sim,nsimbolo);
                            cont=cont+1;
                            if(cont== this.lista_params.length && cont == simbol.lista_params.length){
                                console.log("el num param es: "+cont);
                                iguales=true;
                            }

                        }
                    }

                }


                if(iguales== true){
                    console.log("iguales: "+iguales)
                    console.log("ejecuta instrucciones de la func."+this.id_llamada)
                    simbol.valor.ts=ts_local

                    for (let ins of simbol.valor.L_inst){

                        ins.ejecutar(controlador,simbol.valor.ts);
                    }

                 
                }
               /* let error= new Errores("semantico",`La funcion espera retornar un valor`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`***ERROR: Semantico, La funcion espera retornar un valor, en la linea: ${this.linea} y columna: ${this.columna}`);
                return null;*/



            }


            

        }

    }

    recorrer():Nodo{
        throw new Error("Metodo no implementado");
    }
}