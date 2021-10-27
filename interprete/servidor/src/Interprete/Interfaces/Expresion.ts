import Controlador from "../Controlador";
import Nodo from "../Ast/Nodo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export interface Expresion{


    getTipo(controlador:Controlador,ts:TablaSimbolos): tipo;

    getValor(controlador: Controlador,ts: TablaSimbolos):any;

    getSize(controlador:Controlador,ts:TablaSimbolos):number;

    recorrer():Nodo;

}