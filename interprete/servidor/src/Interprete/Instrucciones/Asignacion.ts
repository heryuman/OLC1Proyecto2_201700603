import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";


export default class Asignacion implements Instruccion{

    public id:string;
    public valor:Expresion;
    public linea:number;
    public columna:number;

    constructor(iden:string,valor:Expresion,linea:number,columna:number){

        this.id=iden;
        this.valor=valor;
        this.linea=linea;
        this.columna=columna;

    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){
        if(ts.existe(this.id)){
            let valor = this.valor.getValor(controlador,ts);
            let variable = ts.getSimbolo(this.id);
            if(variable?.tipo.enum_tipo == this.valor.getTipo(controlador,ts)){
                ts.getSimbolo(this.id)?.setValor(valor);
            }else{

                let error = new Errores("Semantico","El valor asignado a la variable no corresponde al tipo declarado",this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`***Error:Semantico, el valor asignado no corresponde al tipo declarado, en la linea: ${this.linea} y columna: ${this.columna}`);
                return null;
            }

        }else{

            let error= new Errores("semantico",`La variable ${this.id} no existe en la tabla de simbolos`,this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`***ERROR: Semantico, la variable ${this.id} no existe en la tabla de simbolos, en la linea: ${this.linea} y columna: ${this.columna}`);
            return null;
        }

    }

    recorrer():Nodo{
        
        throw new Error("Method not implemented.");

    }


}