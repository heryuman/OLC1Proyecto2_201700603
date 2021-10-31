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

            return valor;
            
        }else{

             this;
        }

    }
    recorrer(): Nodo {
        let padre = new Nodo("Sente_return","");
        if(this.expresion != null){

            padre.AddHijo(new Nodo("return",""))
            padre.AddHijo(this.expresion.recorrer());
            padre.AddHijo(new Nodo(";",""));
        }else{

            padre.AddHijo(new Nodo("return",""))
            padre.AddHijo(new Nodo(";",""));
        }
        return padre;
    }
}