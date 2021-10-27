import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
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

    constructor(tipo_lista:Tipo, id_lista: string,linea:number,columna:number){

        this.tipo_lista =tipo_lista;
        this.id_lista=id_lista;
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){

        if(ts.existeEnActual(this.id_lista)){
            let error =new Errores("Semantico","El id del vector ya existe en el entorno actual",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna: ${this.columna}, el Id, del vector ya se encuentra declarado`);
    
        }

        if(this.tipo_lista.enum_tipo == tipo.ENTERO ||this.tipo_lista.enum_tipo == tipo.DOBLE || this.tipo_lista.enum_tipo == tipo.BOOLEANO || this.tipo_lista.enum_tipo == tipo.CADENA || this.tipo_lista.enum_tipo == tipo.CARACTER){

            this.lista=[];

            let nLista = new Tipo("LISTA");
            let nObjL= new Obj_vector(this.lista,this.tipo_lista,0);
            let nSimbolo= new Simbolo(5,nLista,this.id_lista,nObjL);
            ts.agregar(this.id_lista,nSimbolo);
         
        }else{

            //error el tipo de lista no pertenece a los tipos 


        }
        

    }

    recorrer():Nodo{

        throw new Error("")
    }
}