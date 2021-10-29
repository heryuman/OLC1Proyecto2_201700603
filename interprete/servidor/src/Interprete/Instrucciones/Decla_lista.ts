import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Obj_vector from "./obj_vector";


export default class Decla_lista implements Instruccion{

    public tipo_lista:Tipo;
    public id_lista:string;
    public linea: number;
    public columna:number;
    public lista:any;
    public expresion:Expresion|undefined;

    constructor(tipo_lista:Tipo, id_lista: string,linea:number,columna:number,expre?:Expresion){

        this.tipo_lista =tipo_lista;
        this.id_lista=id_lista;
        this.linea=linea;
        this.columna=columna;
        this.expresion=expre;
    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){

        if(ts.existeEnActual(this.id_lista)){
            let error =new Errores("Semantico","El id del vector ya existe en el entorno actual",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna: ${this.columna}, el Id, del vector ya se encuentra declarado`);
            return tipo.ERROR;
        }

        if(this.expresion== undefined){

            if(this.tipo_lista.enum_tipo == tipo.ENTERO ||this.tipo_lista.enum_tipo == tipo.DOBLE || this.tipo_lista.enum_tipo == tipo.BOOLEANO || this.tipo_lista.enum_tipo == tipo.CADENA || this.tipo_lista.enum_tipo == tipo.CARACTER){

                this.lista=[];
    
                let nLista = new Tipo("LISTA");
                let nObjL= new Obj_vector(this.lista,this.tipo_lista,0);
                let nSimbolo= new Simbolo(5,nLista,this.id_lista,nObjL);
                ts.agregar(this.id_lista,nSimbolo);
             
            }else{
    
                //error el tipo de lista no pertenece a los tipos 
                let error= new Errores("semantico",`el tipo, de la lista ${this.id_lista} que se declara no pertenece a un tipo valido`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`Error:Semantico, en la linea ${this.linea} y columna ${this.columna}, el tipo, de la lista ${this.id_lista} que se declara no pertenece a un tipo valido`);
                return tipo.ERROR;
    
            }
        }else{

            // aqui se crea la lista para tochararray

            if(this.tipo_lista.enum_tipo== tipo.CARACTER){
                let nLista= new Tipo("LISTA");
                let tipo_exp = this.expresion.getTipo(controlador,ts);
                let val_exp= this.expresion.getValor(controlador,ts);

                if(tipo_exp ==tipo.CADENA){

                    let lista_char = Array.from(val_exp);
                    let nObj_lista= new Obj_vector(lista_char,this.tipo_lista,lista_char.length);
                    let nSimbolo= new Simbolo(5,nLista,this.id_lista,nObj_lista);
                    ts.agregar(this.id_lista,nSimbolo);
                }else{

                    //retornar error la expresion no es de tipo cadena
                    let error= new Errores("Semantico",`la expresion del metodo ToCharArray de la lista ${this.id_lista} no corresponde al tipo caracter`,this.linea,this.columna);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columna}, la expresion del metodo ToCharArray de la lista ${this.id_lista} no corresponde al tipo caracter`);
                    return tipo.ERROR;
                }


            }


        }
        

    }

    recorrer():Nodo{

        throw new Error("")
    }
}