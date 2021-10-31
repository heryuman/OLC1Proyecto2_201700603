import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


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
            //2. si existe verificamos que el valor a asignar sea del mismo tipo de la variable 
            let valor = this.valor.getValor(controlador,ts);
            let variable = ts.getSimbolo(this.id);
            let tipo_valor= this.valor.getTipo(controlador,ts);
            if(variable?.tipo.enum_tipo == this.valor.getTipo(controlador,ts) ){
                //3. si es del mismo tipo se asigna de lo contrario se reporta error. 
                ts.getSimbolo(this.id)?.setValor(valor);
            }else{
                if(variable?.tipo.enum_tipo == tipo.DOBLE && tipo_valor == tipo.ENTERO){
                    ts.getSimbolo(this.id)?.setValor(valor);
                }else if(variable?.tipo.enum_tipo == tipo.ENTERO && tipo_valor == tipo.DOBLE){
                    ts.getSimbolo(this.id)?.setValor(Math.trunc(valor));
                }else{
                    //reportar error semantico 
                    let error = new Errores("Semantico",` La variable ${this.id} no pudo ser casteada implicitamente.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`*** ERROR: Semantico, La variable ${this.id} no pudo ser casteada implicitamente. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
            }
        }else{
            //reportar error semantico 
            let error = new Errores("Semantico", `La variable ${this.id} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append( `*** ERROR: Semantico, La variable ${this.id} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor. En la linea ${this.linea} y columna ${this.columna}`)
            return null;
        }

    }

    recorrer():Nodo{
        
        let padre= new Nodo("Asignacion","");
        padre.AddHijo(new Nodo(this.id,""));
        padre.AddHijo(new Nodo("=",""));
        padre.AddHijo(this.valor.recorrer());
        padre.AddHijo(new Nodo(";",""));
        return padre;


    }


}