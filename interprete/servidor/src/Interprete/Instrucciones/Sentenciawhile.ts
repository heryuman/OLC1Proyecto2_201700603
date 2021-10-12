  
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Detener from "../Instrucciones/SentBreak";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(condicion:Expresion, lista_instrucciones:Array<Instruccion>, linea:number, columna:number) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(typeof valor_condicion == 'boolean'){

            while(this.condicion.getValor(controlador,ts)){

                let ts_local = new TablaSimbolos(ts);

                for(let ins of this.lista_instrucciones){
                    let res = ins.ejecutar(controlador,ts_local);
                     //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                     if(ins instanceof Detener || res instanceof Detener ){
                         return res;
                     }

                }
            }
        }
    }
    
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}