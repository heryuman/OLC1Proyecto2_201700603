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
import Start_with from "../Instrucciones/Start_with";
import { tipo } from "../TablaSimbolos/Tipo";
import Llamada from "../Instrucciones/Llamadas";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
      if(this.lista_instrucciones.length>0){
          
        
/*** Vamos a recorrer las instrucciones que vengan desde la gramatica 
**1 era pasada. ejecutar las declaraciones de variables
***/
let startwith=false;
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

            else if( instruccion instanceof Errores){

                controlador.append(`**Se produjo un error: `+instruccion.tipo +" en la linea"+instruccion.linea +" y columna:  "+instruccion.columna+" Desc: "+instruccion.descripcion);
            }

           
        }

        //2da pada. ejecutamos todas declaraciones
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Declaracion){
                instruccion.ejecutar(controlador,ts);
            }

           
        }

        //3ra. pasada ejecutamos todas las demas instruccs

        for (let instruccion of this.lista_instrucciones){

            if(instruccion instanceof Start_with){
                instruccion.ejecutar(controlador,ts);
                startwith=true;
            }
            else if(startwith){

                if(instruccion instanceof Start_with){

                let error = new Errores("Semantico","No se puede ejecutar una seguna instancia de Start With",instruccion.linea,instruccion.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico, en la linea ${instruccion.linea} y columna ${instruccion.columna},No se puede ejecutar una segunda instancia de la sentencia Start_`);
                return tipo.ERROR;

                }
            }

            if(!(instruccion instanceof Declaracion) && !(instruccion instanceof Funciones) && !(instruccion instanceof Decla_vector)&& !(instruccion instanceof Decla_lista)&& !(instruccion instanceof Append_list)&& !(instruccion instanceof Start_with)){

                instruccion.ejecutar(controlador,ts);
            }
        }
        
      }else{

        console.log("lista de instrucciones vacia");
      }
        


    }

    recorrer(): Nodo {
        let raiz = new Nodo("inicio","");

        for (let inst of this.lista_instrucciones){

            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }
}