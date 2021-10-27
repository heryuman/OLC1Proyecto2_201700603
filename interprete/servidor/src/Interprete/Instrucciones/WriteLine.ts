import { write } from "fs";
import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo,{ tipo } from "../TablaSimbolos/Tipo";


export default class WriteLine implements Instruccion{


    public expresion :Expresion;
    public linea: number;
    public columna: number;

    constructor(exp:Expresion,linea:number,colum:number){
        this.expresion=exp;
        this.linea=linea;
        this.columna=colum;
    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){

        let tipo_valor= this.expresion.getTipo(controlador,ts);
        if(tipo_valor==tipo.ENTERO || tipo_valor==tipo.DOBLE || tipo_valor== tipo.CARACTER ||tipo_valor== tipo.CADENA || tipo_valor == tipo.BOOLEANO || tipo_valor == tipo.VECTOR){

            console.log("en wl tipo de exp= "+tipo_valor)
            let valor= this.expresion.getValor(controlador,ts);
            controlador.append(valor);
        }else{

            let error = new Errores("Semantico",`la funcion no puede imprimir un valor ${tipo_valor}`,this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error: Samntico, la funcion no puede imprimir un valor ${tipo_valor} en la linea: ${this.linea} y columna: ${this.columna} `);
        }
    }

    recorrer():Nodo{
        throw new Error("Method not implemented.");
    }

}
