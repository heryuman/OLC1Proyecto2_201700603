import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";


export default class Sent_return implements Instruccion{

    public expresion:Expresion;
    constructor(exp:Expresion) {
        this.expresion=exp;

     }
    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
        if(this.expresion != null){

            let valor= this.expresion.getValor(controlador,ts);

            return this;
            
        }else{

            return this;
        }

    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}