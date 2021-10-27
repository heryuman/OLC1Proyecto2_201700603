import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Setvector implements Instruccion{

    public id_vector:string;
    public index:Expresion;
    public nValor:Expresion;
    public linea:number;
    public columan:number;

    constructor(id_vector:string, index:Expresion,nValor:Expresion, linea:number, columna:number){

        this.id_vector=id_vector;
        this.index=index;
        this.nValor=nValor;
        this.linea=linea;
        this.columan=columna;

    }

    ejecutar(control:Controlador,ts:TablaSimbolos){

        if(ts.existe(this.id_vector)){

            let simbolo=ts.getSimbolo(this.id_vector);
            if(simbolo?.tipo.enum_tipo == tipo.VECTOR){

                let valor_index=this.index.getValor(control,ts);
                let tipo_index=this.index.getTipo(control,ts);

                if(tipo_index== tipo.ENTERO){

                    let nuevo_item_val=this.nValor.getValor(control,ts);
                    let nuevo_ite_tipo=this.nValor.getTipo(control,ts);
                    let tipo_vector= simbolo.valor.tipo_lista.enum_tipo;
                    let size_vector= simbolo.valor.size;
                    let elvector=simbolo.valor.lista;

                    if(valor_index<size_vector-1){

                        if(tipo_vector == nuevo_ite_tipo){

                            elvector[valor_index]=nuevo_item_val;
                        }else{

                            //retornar error el nuevo dato no corresponde al tipo declarado del vector

                            let  error= new Errores("Semantico","El tipo de dato asignado no corresponde con el tipo del vector",this.linea,this.columan);
                            control.errores.push(error);
                            control.append(`**Error:Semantico, en la linea ${this.linea} y columma ${this.columan}, El tipo de dato asignado no corresponde con el tipo del vector`);

                        }

                    }else{

                        //retornar error indice fuera de rango
                        let  error= new Errores("Semantico","El indice está fuera de rango",this.linea,this.columan);
                        control.errores.push(error);
                        control.append(`**Error:Semantico, en la linea ${this.linea} y columma ${this.columan}, El indice está fuera de rango`);
                            

                    }


                }else{

                    //devolver error que  indice no es entero
                    let  error= new Errores("Semantico","El indice no es de tipo entero",this.linea,this.columan);
                    control.errores.push(error);
                    control.append(`**Error:Semantico, en la linea ${this.linea} y columma ${this.columan}, El indice no es tipo entero`);
                      

                }


            }else{

                //devolver error que no es vector

                let  error= new Errores("Semantico","El Simbolo utilizado no es de tipo Vector",this.linea,this.columan);
                control.errores.push(error);
                control.append(`**Error:Semantico, en la linea ${this.linea} y columma ${this.columan}, El Simbolo utilizado no es de tipo Vector`);
                  
            }

        }
    }

    recorrer():Nodo{

        throw new Error("")
    }




}