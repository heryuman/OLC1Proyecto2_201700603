import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Declaracion from "./Declaracion";
import parametro from "./parametro";
import Sent_return from "./sent_transfer/Sent_return";


export default class Funciones implements Instruccion{

    public type:Tipo;
    public id_func:string;
    public listaParametros: Array<parametro>;
    public ListaInstrucciones:Array<Instruccion>;
    public linea:number;
    public columna:number;

    constructor(type:Tipo,id_funcion:string,lparams:Array<parametro>,Linstruc:Array<Instruccion>,linea:number,columna:number){

        this.type=type;
        this.id_func=id_funcion;
        this.listaParametros=lparams;
        this.ListaInstrucciones=Linstruc;
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(controlador:Controlador,ts:TablaSimbolos){
        let ts_local= new TablaSimbolos(ts);

        if(ts.existeEnActual(this.id_func)){
            let error= new Errores("Semantico",`el id  ${this.id_func} ya existe en el entorno actual, por lo que no se puede declarar`,this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semantico, el id  ${this.id_func} ya existe en el entorno actual, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`)
            return tipo.ERROR;

        }else{  
                var Lista_simbolos:Array<Simbolo>=[];
                for (let parametro of this.listaParametros){

                  let nuevoParametro= new Simbolo(6,parametro.tipo,parametro.id,null);
                  Lista_simbolos.push(nuevoParametro);
                }

                let nuevo_simbolo_func= new Simbolo(2,this.type,this.id_func,this.ListaInstrucciones,Lista_simbolos,false);
                ts.agregar(this.id_func,nuevo_simbolo_func);

                
        }
       
  
       



    }

    recorrer():Nodo{

        throw new Error("Method not implemented.");
    }
}