import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";



export interface Instruccion{


    ejecutar(controlador:Controlador,ts : TablaSimbolos):any;

    recorrer():Nodo;
}