import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

import Sent_return from "./sent_transfer/Sent_return";


export default class Funciones extends Simbolo implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    
    constructor(simbolo: number, tipo: Tipo, identificador: string, lista_params:Array<Simbolo>, metodo:boolean, lista_instrucciones : Array<Instruccion>, linea: number, columna: number ) {
        super(simbolo, tipo, identificador, null, lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    //-- agregamos un metodo para agregar el simbolo de la funcion a la tabla de simbolos
    agregarFuncionTS(controlador: Controlador,ts: TablaSimbolos){
         if(!(ts.existe(this.identificador))){
             ts.agregar(this.identificador, this);
         }else{
             // error semantico.
             let error = new Errores("Semantico",`La funcion ${this.identificador} no puede ser agregada porque ya existe en la tabla de simbolos`,this.linea,this.columna);
             controlador.errores.push(error);
             controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columna},La funcion ${this.identificador} no puede ser agregada porque ya existe en la tabla de simbolos`);
             return tipo.ERROR;
         }
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       // Aqui solo necesitamos mandar a ejecutar las instrucciones ya que las validaciones para llegar hasta aca se hacen en la clase llamada
       let ts_local = new TablaSimbolos(ts);
        controlador.lista_ts.push(ts_local);
       for(let inst of this.lista_instrucciones){
            let retorno = inst.ejecutar(controlador,ts_local);

            if(retorno != null){
                return retorno;
            }
       }

       return null;
    }

    recorrer(): Nodo {

        let padre;
        if(this.simbolo==2){

             padre = new Nodo("Funcion","");
             padre.AddHijo(new Nodo(this.tipo.nombre_tipo,""));
             padre.AddHijo(new Nodo(this.identificador,""));
             padre.AddHijo(new Nodo("(",""));
             if(this.lista_params != undefined){

                if(this.lista_params?.length>0){
                    let hijo_params= new Nodo("L_params","");
                    for (let parametro of this.lista_params){
                        let nieto= new Nodo("Declaracion","");
                        nieto.AddHijo(new Nodo(parametro.tipo.nombre_tipo,""));
                        nieto.AddHijo(new Nodo(parametro.identificador,""));
                        hijo_params.AddHijo(nieto);


                    }
                    padre.AddHijo(hijo_params);
                 
                }  
             }
             padre.AddHijo(new Nodo(")",""));
             padre.AddHijo(new Nodo("{",""));
             let hijo =new Nodo("L_instrucciones","");

             for( let ins of this.lista_instrucciones){
                hijo.AddHijo(ins.recorrer());

             }

             padre.AddHijo(hijo);
             padre.AddHijo(new Nodo("}",""));
             

             return padre;
        }
        else if(this.simbolo==3){

            padre = new Nodo("Metodo","");
            padre.AddHijo(new Nodo("Void",""));
            padre.AddHijo(new Nodo(this.identificador,""));
            padre.AddHijo(new Nodo("(",""));
            if(this.lista_params != undefined){

               if(this.lista_params?.length>0){
                   let hijo_params= new Nodo("L_params","");
                   for (let parametro of this.lista_params){
                       hijo_params.AddHijo(new Nodo(parametro.tipo.nombre_tipo,""));
                       hijo_params.AddHijo(new Nodo(parametro.identificador,""));
                      


                   }
                   padre.AddHijo(hijo_params);
                
               }  
            }
            padre.AddHijo(new Nodo(")",""));
            padre.AddHijo(new Nodo("{",""));
            let hijo =new Nodo("L_instrucciones","");

            for( let ins of this.lista_instrucciones){
               hijo.AddHijo(ins.recorrer());

            }

            padre.AddHijo(hijo);
            padre.AddHijo(new Nodo("}",""));

            return padre;
        }else{

            return new Nodo("Desconocido","");
        }

       
    }
}