import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";



export default class Detener implements Instruccion{

        constructor() { }
    
        ejecutar(controlador: Controlador, ts: TablaSimbolos) {
            return this;
        }
        recorrer(): Nodo {
            let padre= new Nodo("Sent_Break","");
            padre.AddHijo(new Nodo("break",""));
            padre.AddHijo(new Nodo(";",""));

            return padre;
        }
    
}
