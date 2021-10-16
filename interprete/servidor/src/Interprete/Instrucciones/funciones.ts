import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Declaracion from "./Declaracion";
import objfunc from "./objfunc";
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

        if(ts.existe(this.id_func)){//verifca que el id e la funcion no exista en los ts, si existe regresa un error semantico
            let error= new Errores("Semantico",`el id  ${this.id_func} ya ha sido usado, por lo que no se puede declarar`,this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semantico, el id  ${this.id_func} ya ha sido usado, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`)
            return tipo.ERROR;

        }else{  

                var Lista_simbolos:Array<Simbolo>=[];// lista donde se almasenaran los simbolos de la lista de parametros
                for (let parametro of this.listaParametros){

                  let nuevoParametro= new Simbolo(6,parametro.tipo,parametro.id,null);// se crea un nuevo simbolo de parametro y se almacena en la lista
                  ts_local.agregar(parametro.id,nuevoParametro);
                  Lista_simbolos.push(nuevoParametro);
                }

                let objfun=new objfunc(ts_local,this.ListaInstrucciones)

                let nuevo_simbolo_func= new Simbolo(2,this.type,this.id_func,objfun,Lista_simbolos,false); // se crea un nuevo simbolo de funcion 
                ts.agregar(this.id_func,nuevo_simbolo_func);// se agrega al 

               
        }
       
  
       



    }

    recorrer():Nodo{

        throw new Error("Method not implemented.");
    }

    
}