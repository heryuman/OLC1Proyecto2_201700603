import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Ternario implements Expresion{

    public condicion : Expresion;
    public verdadero : Expresion;
    public falso : Expresion;
    public linea : number;
    public columna : number;

    constructor(condicion : Expresion, verdadero :Expresion, falso :Expresion, linea: number, columna: number) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        // condicion ? true : false;
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            return valor_condicion ? this.verdadero.getTipo(controlador,ts) : this.falso.getTipo(controlador,ts);
        }else{
            let error = new Errores("Semantico","la condicion no es de tipo boobleana",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columna} , el tipo de la condicion no es booleana`);
            return tipo.ERROR;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            return valor_condicion ? this.verdadero.getValor(controlador,ts) : this.falso.getValor(controlador,ts);
        }else{
            let error = new Errores("Semantico", `No se puede operar el ternario porque se produjo un error.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semántico, No se puede operar el ternario porque se produjo un error. En la línea ${this.linea} y columna ${this.columna}`);
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Ternario","");
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(this.verdadero.recorrer());
        padre.AddHijo(new Nodo(":",""));
        padre.AddHijo(this.falso.recorrer());

    return padre;
    }

    getSize(){

        return 0;
    }
}