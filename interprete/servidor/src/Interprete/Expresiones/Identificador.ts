import { Expresion } from "../Interfaces/Expresion";
import Controlador  from "../Controlador";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Nodo from "../Ast/Nodo";


export default class Identificador implements Expresion{

    public identificador: string;
    public linea:number;
    public columna : number;

    constructor(identifador: string, linea : number, columna : number) {
        this.identificador = identifador;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador,ts: TablaSimbolos):tipo{

        let existe_id = ts.getSimbolo(this.identificador);

        if(existe_id != null){
            return existe_id.tipo.enum_tipo;
        }else{
            return tipo.ERROR;
        }

    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador);

        if(existe_id != null){
            return existe_id.valor;
        }else{
            // reportar error semantico
            return null;
        }
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }


}