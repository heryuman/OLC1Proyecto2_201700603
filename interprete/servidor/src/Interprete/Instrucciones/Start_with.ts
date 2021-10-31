import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamadas";


export default class Startwith implements Instruccion{

    public llamada:Llamada;
    public linea:number;
    public columna:number;

    constructor(llamada:Llamada,linea:number,columna:number){


        this.llamada=llamada;
        this.linea=linea;
        this.columna=columna;

    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){
        this.llamada.ejecutar(controlador,ts);
    }

    recorrer():Nodo{
        let padre = new Nodo("Start_With","");
        padre.AddHijo(this.llamada.recorrer());

        return padre;
        
    }
}