import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Funciones from "./funciones";

import Sent_return from "./sent_transfer/Sent_return";



export default class Llamada implements Instruccion, Expresion{

    public identificador : string;
    public parametros : Array<Expresion>;
    public linea : number;
    public columna : number;

    constructor(identificador : string,  parametros : Array<Expresion>, linea :number, columna:number) {
        this.identificador = identificador;
        this.parametros = parametros;
        this.columna = columna;
        this.linea = linea;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let simbolo_funcion = ts.getSimbolo(this.identificador) as Funciones ;

        return simbolo_funcion.tipo.enum_tipo; 
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        //1. Verificar si el método existe en la tabla de símbolos.
        if(ts.existe(this.identificador)){
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos(ts);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador)  as Funciones;


            //4. verificar si los parametros estan correctos
            if(this.validar_parametros(this.parametros, simbolo_funcion.lista_params!, controlador, ts, ts_local)){
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);

                if(retorno != null){
                    return retorno; 
                }
            }
        }else{
            // error semantico no existe el metodo a llamar
        }
    }

    // string s = holamundo();
    // string holamundo(){  writeline("hola mundo"); return "holamundo "; }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
        //1. Verificar si el método existe en la tabla de símbolos.
        if(ts.existe(this.identificador)){
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos(ts);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador)  as Funciones;
            let esmetodo=simbolo_funcion.metodo;
            let numSimbolo=simbolo_funcion.simbolo;
            console.log("#simbolo="+numSimbolo);

            //4. verificar si los parametros estan correctos
            if(this.validar_parametros(this.parametros, simbolo_funcion.lista_params!, controlador, ts, ts_local)){
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);

                if(retorno != null   ){
 
                    if(numSimbolo == 2){
                        
                    console.log("entro al retorno wacho, el # simbolo: "+numSimbolo);
                    return retorno;

                    }
                }

                if(esmetodo== false){

                    let error = new Errores("Semantico","Se necesita retornar un valor de la funcion",this.linea,this.columna);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico en la linea ${this.linea} y columna: ${this.columna} se necista retornar un valor de la funcion`);

                }

                if(numSimbolo==3 && retorno instanceof Sent_return){
                    console.log("el no del simbolo en el else: "+numSimbolo);
                    let error = new Errores("Semantico","Se trata de devolver un valor en un metodo",this.linea,this.columna);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico en el metodo de  la linea ${this.linea} y columna: ${this.columna} se trata de devolver un valor en un metodo`);


                    }


            }
        }else{
            // error semantico no existe el metodo a llamar

            let error = new Errores("Semantico","el metodo que se invoca no existe en el entorno actual",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, el metodo que se invoca no existe en el entorno actual, en la lina ${this.linea} y columna: ${this.columna}`);

        }
        
    }

    validar_parametros(parametros_llamada : Array<Expresion>, parametros_funcion: Array<Simbolo>, controlador : Controlador, ts: TablaSimbolos, ts_local: TablaSimbolos){
        /* 4. Verificar si la cantidad de parámetros en la llamada 
            es igual a la cantidad de parámetros que posee el método. */
        if(parametros_llamada.length == parametros_funcion.length){
            //--> parametros desde funcion/metodo
            console.log("los la cant de params son iguales")
            let aux : Simbolo; // -> parametro
            let aux_id : string; // -> id parametro 
            let aux_tipo; //-> tipo parametro 
            let simbolo_func_lista;

            //--> valores de la llamada
            let aux_exp : Expresion; //-> expresion que se le va a asignar al parametro 
            let aux_exp_tipo; //-> tipo de la expresio 
            let aux_exp_valor;  //-> valor de la expresion 
            let simbolo_llam_lista;
            // 5. Verificar que cada valor a asignar sea del mismo tipo de los parametros del metodo.
            for(let i = 0; i < parametros_llamada.length ; i++){
                // void suma( int n1 , int n2){... }
                // suma(3,4); 
                // int n1 = 3; int n2 = 4; 
                //--> vamos a guardar la informacion del parametro de la funcion
                aux = parametros_funcion[i] as Simbolo;
                aux_id = aux.identificador;
                aux_tipo = aux.tipo.enum_tipo; // ENTERO, DOBLE
                simbolo_func_lista= aux.simbolo;
               // console.log("id del param de la funcion"+aux_id)
               // console.log("tipo del param de la func"+aux_tipo)
               // console.log("#de simbolo"+simbolo_func_lista)

                //--> Vamos a guardar la informacion del parametro de la llamada
                aux_exp = parametros_llamada[i] as Expresion;
                aux_exp_tipo = aux_exp.getTipo(controlador, ts);
                aux_exp_valor = aux_exp.getValor(controlador,ts);
                //console.log("valor del param de la llamda "+aux_exp_valor)
                //console.log("tipo del param de la llamada "+aux_exp_tipo)

                // validar si el valor del parametro de llamada es igual al valor del parametro de la funcion
                if(aux_tipo == aux_exp_tipo){
                      // 5. a) Si son del mismo tipo se debe de guardar cada parámetro con su valor en la tabla de símbolos local. 
                      console.log("aqui si no es lista")
                    
                      let simbolo = new Simbolo(aux.simbolo, aux.tipo, aux_id, aux_exp_valor);
                      ts_local.agregar(aux_id, simbolo);
                }
                else if(simbolo_func_lista == 5 && aux_exp_tipo == 7){
                    //console.log("aqui porque es lista")
                    //console.log("tamalo lista"+aux_exp_valor.lista.length)
                    if(aux_tipo == tipo.CARACTER){

                    let nLista= new Tipo("LISTA");
                    
                    let simbolo = new Simbolo(aux.simbolo,nLista, aux_id, aux_exp_valor);
                      ts_local.agregar(aux_id, simbolo);
                    }

                }
            }
            return true;
        }else {
            //reportamos error semantico

            let error = new Errores("Semantico","La cantidad de parmetros de la llamada es incorrecta",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea: ${this.linea} y columna: ${this.columna}- la cantidad de parametros de la llamada es incorrecta`);

        }
        return false;
         
    }


    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    } 
    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }

}