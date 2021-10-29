import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Append_list implements Instruccion{

    public id_lista:string;
    public expresion:Expresion;
    public linea:number;
    public columana:number;

    constructor(id:string, exp:Expresion,linea:number,col:number){

        this.id_lista=id;
        this.expresion=exp;
        this.linea=linea;
        this.columana=col
    }


    ejecutar(controlador:Controlador,ts:TablaSimbolos){

        if(ts.existe(this.id_lista)){

            let simbolo= ts.getSimbolo(this.id_lista);
            if(simbolo?.tipo.enum_tipo== tipo.LISTA){

                let tipo_simbolo= simbolo.valor.tipo_lista.enum_tipo;
                let tipo_exp= this.expresion.getTipo(controlador,ts);
                let val_exp=this.expresion.getValor(controlador,ts);
                let lalista= simbolo.valor.lista;
                if(tipo_simbolo == tipo_exp){
                     lalista.push(val_exp);
                     console.log("se agregó a la lista: "+val_exp);
                     console.log("tamaño lista: "+lalista.length)

                }else{

                    //reportar queel tipo del dato no es igual al de la lista
                    let error= new Errores("Semantico","El tipo de dato a agregar no corresponde al tipo de la lista",this.linea,this.columana);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columana}, El tipo de dato a agregar no corresponde al tipo de la lista`);
                    return tipo.ERROR;
                }

            }else{

                //reportar que no es lista
                let erro= new Errores("Semantico","El simbolo no es una lista",this.linea,this.columana);
                controlador.errores.push(erro);
                controlador.append(`!Error:Semantico, en la linea ${this.linea} y columna ${this.columana}, el simbolo no es una lista`);
                return tipo.ERROR;
            }

        }else{

            //reportar que no existe
            let erro= new Errores("Semantico",`El id: ${this.id_lista} de la lista no aparece en la tabla de simbolos`,this.linea,this.columana);
            controlador.errores.push(erro);
            controlador.append(`!Error:Semantico, en la linea ${this.linea} y columna ${this.columana}, eEl id: ${this.id_lista} de la lista no aparece en la tabla de simbolos`);
            return tipo.ERROR;
        }

    }

    recorrer():Nodo{
        throw new Error("")
    }
}