import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Funciones from "../Instrucciones/funciones";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";
import Decla_vector from "../Instrucciones/Decla_Vector";
import Decla_lista from "../Instrucciones/Decla_lista";
import Append_list from "../Instrucciones/Append_list";
import Errores from "./Errores";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
      if(this.lista_instrucciones.length>0){

          // Vamos a recorrer las instrucciones que vengan desde la gramatica 
        // writeline(x);
        // int x = 9;
        //1 era pasada. ejecutar las declaraciones de variables
        for(let instruccion of this.lista_instrucciones){
           
            if(instruccion instanceof Funciones){

                let funcion= instruccion as Funciones;
                funcion.agregarFuncionTS(controlador,ts);

            }

            else if(instruccion instanceof Decla_vector){

                instruccion.ejecutar(controlador,ts);

            }else if ( instruccion instanceof Decla_lista || instruccion instanceof Append_list){

                instruccion.ejecutar(controlador,ts);
            }

           
        }

        //2da pada. ejecutamos todas las demas instrucciones
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Declaracion){
                instruccion.ejecutar(controlador,ts);
            }

           
        }

        //3ra. pasada ejecutamos todas las demas instruccs

        for (let instruccion of this.lista_instrucciones){

            if(!(instruccion instanceof Declaracion) && !(instruccion instanceof Funciones) && !(instruccion instanceof Decla_vector)&& !(instruccion instanceof Decla_lista)&& !(instruccion instanceof Append_list)){

                instruccion.ejecutar(controlador,ts);
            }
        }
        
      }else{

        console.log("lista de instrucciones vacia");
      }
        


    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
}