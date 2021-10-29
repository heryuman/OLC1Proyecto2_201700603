import Controlador from "../../Controlador";
import Nodo from "../../Ast/Nodo";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operacion";
import Errores from "../../Ast/Errores";

export default class Aritmetica extends Operacion implements Expresion{

    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, col : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, col, expU);
        
    }
    
    //geTipo retorna el tipo de la expresion aritmetica 
    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo; 

        if(this.expU == false){
            /** Ejemplo 1
             *  10 + 30.5 -> exp1 + exp2 -> exp1 = 10, exp2 = 30.5 
             *  exp1.getTipo = ENTERO 
             *  exp2.getTipo = DOBLE
             * 
             *  Ejemplo 2
             *  13.4 + 9 - 8 -> exp1 + exp2 -> exp1 = (13.4 + 9), exp2 = 8 
             *  exp1.getTipo = DOBLE 
             *  exp2.getTipo = ENTERO
             * 
             */
            tipo_exp1 = this.exp1.getTipo(controlador, ts);
            tipo_exp2 = this.exp2.getTipo(controlador,ts);

            if(tipo_exp1 == tipo.ERROR || tipo_exp2 == tipo.ERROR){
                return tipo.ERROR;
            }
        }else{
           /* Ejemplo de como trabajamos una expresion Unaria con el booleano expU
            * 1 + 1 -> expU -> falso
            * -1 -> expU -> verdadero 
            * 
            * Ejemplo:
            * -1 -> -exp1 -> exp1 = -1
            * exp1.getTipo = ENTERO
            */ 
           
            tipo_exp1 = this.exp1.getTipo(controlador,ts);
            if(tipo_exp1 == tipo.ERROR ){
                return tipo.ERROR;
            }
            tipo_exp2 = tipo.ERROR;
        }

        /**
         * Para las siguientes validaciones nos basamos en la tabla de 
         * de las operaciones aritmeticas permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {
            case Operador.SUMA:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }else if(tipo_exp2 == tipo.CADENA){
                        return tipo.CADENA;
                    }
                    else{

                        let error= new Errores("Semantico",`La Suma no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Suma no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE|| tipo_exp2 == tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER){
                        return tipo.DOBLE;
                    }else if(tipo_exp2 == tipo.CADENA){
                        return tipo.CADENA; // 1.2 + "hola" -> "1.2hola"
                    }
                    else{

                        let error= new Errores("Semantico",`La Suma no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Suma no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }

                    
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE; 
                    }else if(tipo_exp2 == tipo.CADENA){
                        return tipo.CADENA; // true + "hola" -> "truehola"
                    }  else{

                        let error= new Errores("Semantico",`La Suma no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Suma no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE; 
                    }else if(tipo_exp2 == tipo.CADENA || tipo_exp2 == tipo.CARACTER){
                        return tipo.CADENA; 
                    } 
                    
                    else{

                        let error= new Errores("Semantico",`La Suma no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Suma no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER || tipo_exp2 == tipo.CADENA){
                        return tipo.CADENA;
                    }

                    else{

                        let error= new Errores("Semantico",`La Suma no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Suma no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }

                else{

                    let error= new Errores("Semantico","La suma no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La suma no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            case Operador.RESTA:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }  else{

                        let error= new Errores("Semantico",`La Resta no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Resta no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2== tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Resta no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Resta no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if (tipo_exp1==tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Resta no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Resta no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO){
                        return tipo.ENTERO
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }else{

                        let error= new Errores("Semantico",`La Resta no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Resta no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else{
                    

                        let error= new Errores("Semantico","La Resta no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La resta no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    
                    
                }
                break;
            case Operador.MULTI:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.CARACTER){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Multiplicacion no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Multiplicaicon no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2==tipo.CARACTER){
                        return tipo.DOBLE;
                    }
                    
                    else{

                        let error= new Errores("Semantico",`La Multiplicacion no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Multiplicaicon no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }
                else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Multiplicacion no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Multiplicaicon no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }
                else{

                    let error= new Errores("Semantico","La Multiplicacion no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Multiplicacion no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            case Operador.DIV:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                        return tipo.DOBLE;
                    }
                    
                    else{

                        let error= new Errores("Semantico",`La Division no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Division no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                        return tipo.DOBLE;
                    } else{

                        let error= new Errores("Semantico",`La Division no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Division no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }
                else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Division no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Division no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else{

                    let error= new Errores("Semantico","La Division no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Duivision no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            case Operador.MOD:
                if(tipo_exp1 == tipo.ENTERO || tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    } else{

                        let error= new Errores("Semantico",`El Modulo no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, El Modulo no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else{

                    let error= new Errores("Semantico","El Modulo no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, El modulo no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            case Operador.POT:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO ){
                        return tipo.ENTERO;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }
                    else{

                        let error= new Errores("Semantico",`La Potencia no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Potencia no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }

                }else if(tipo_exp1 == tipo.DOBLE){
                    if (tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return tipo.DOBLE;
                    }else{

                        let error= new Errores("Semantico",`La Potencia no se efectuó, El tipo de la expresion de la derecha no concuerda con los tipos admitidos del lenguajes`,this.linea,this.col);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Potencia no se efectuó, el tipo de la expresion derecha no pertenece a los tipos admitidos`);
                        return tipo.ERROR;
                    }
                }else{

                    let error= new Errores("Semantico","La Potencia no se efectuó, El tipo de la expresion de la izquiera no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La Potencia no se efectuó, el tipo de la expresion Izquierda no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            case Operador.UNARIO:
                if(tipo_exp1 == tipo.ENTERO){
                    return tipo.ENTERO;
                }else if(tipo_exp1 == tipo.DOBLE){
                    return tipo.DOBLE;
                }else{

                    let error= new Errores("Semantico","La operacion unaria no se efectuó, El tipo de la expresion  no concuerda con los tipos admitidos del lenguajes",this.linea,this.col);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.col}, La operacion unaria  no se efectuó, el tipo de la expresion no pertenece a los tipos admitidos`);
                    return tipo.ERROR;
                }
                break;
            default:
                break;
        }

        return tipo.ERROR;
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        let tipo_exp1 :tipo;
        let tipo_exp2 : tipo;
        let tipo_expU : tipo;

       
        if(this.expU == false){
            //Ejemplo si fuera  1 + 2.5 -> exp1 = 1, exp2 = 2.5
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // ENTERO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // DOBLE 
            
            tipo_expU = tipo.ERROR;

            valor_exp1 = this.exp1.getValor(controlador,ts); // 1 
            valor_exp2 = this.exp2.getValor(controlador,ts); // 2.5

        }else{
            tipo_expU = this.exp1.getTipo(controlador,ts);
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;

            valor_expU = this.exp1.getValor(controlador,ts);

        }

        switch (this.operador) {
            case Operador.SUMA:
                if(tipo_exp1 === tipo.ENTERO){
                    if(tipo_exp2 === tipo.ENTERO){
                        return valor_exp1 + valor_exp2; // 1+2.5 = 3.5
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 + valor_exp2;
                    }else if(tipo_exp2 == tipo.BOOLEANO){ 
                        // Ejemplo: 1 + true -> 1 + 1 = 2 
                        let num_del_booleano = 1;

                        if(valor_exp2 == false){
                            num_del_booleano = 0;
                        }
                        return valor_exp1 + num_del_booleano;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        // 1 + 'A' -> 1 + 65 = 66
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 + num_ascci;
                    }else if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 + valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 + valor_exp2; // 1.1 +2.5 = 3.6
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 + valor_exp2;
                    }else if(tipo_exp2 == tipo.BOOLEANO){ 
                        // 1 + true -> 1 + 1 = 2 
                        let num_del_booleano = 1;
                        if(valor_exp2 == false){
                            num_del_booleano = 0;
                        }
                        return valor_exp1 + num_del_booleano;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        // 1.1 + 'A' -> 1.1 + 65 = 66.1
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 + num_ascci;
                    }else if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 + valor_exp2;
                    }else{
                        //TODO: reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    // valor_exp1 = true | false
                    let num_bool_exp1 = 1;
                    if(valor_exp1 == false){
                        num_bool_exp1 = 0;
                    }
                    if(tipo_exp2 == tipo.ENTERO){
                        return num_bool_exp1 + valor_exp2; 
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return num_bool_exp1 + valor_exp2;
                    }else if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 + valor_exp2; //true + "hola" -> "truehola"
                    }else{
                        //TODO: reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){ 
                    // 'A' + 1 -> 65 + 1 -> 66
                    let num_ascci = valor_exp1.charCodeAt(0);
                    if(tipo_exp2 == tipo.ENTERO){
                        return num_ascci + valor_exp2; 
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return num_ascci + valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        return valor_exp1 + valor_exp2; //'A' + 'A' -> AA
                    }else if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 + valor_exp2; //'A' + "hola" -> "Ahola"
                    }else{
                        //TODO: reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.BOOLEANO || tipo_exp2 == tipo.CARACTER || tipo_exp2 == tipo.CADENA){
                        return valor_exp1 + valor_exp2;
                    }else{
                        //TODO: reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la suma porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }
                break;
            case Operador.RESTA:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 - valor_exp2; //retorna entero
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 - valor_exp2;//retorna doble
                    }else if(tipo_exp2 == tipo.BOOLEANO){
                        let num_del_booleano = 1;
                        if(valor_exp2 == false){
                            num_del_booleano = 0;
                        }
                        return valor_exp1 - num_del_booleano; //retorna entero
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 - num_ascci; //retorna entero
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 - valor_exp2; //retorna doble
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 - valor_exp2; //retorna doble
                    }else if(tipo_exp2 == tipo.BOOLEANO){
                        let num_del_booleano =1;
                        if(valor_exp2 == false){
                            num_del_booleano =0;
                        }
                        return valor_exp1 - num_del_booleano; //retorna doble
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 - num_ascci; //retorna doble
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 - valor_exp2; //retorna entero
                    }else if (tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 - valor_exp2; //retorna doble
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    let num_ascci = valor_exp1.charCodeAt(0);
                    if(tipo_exp2 == tipo.ENTERO){
                        return num_ascci - valor_exp2; //retorna entero
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return num_ascci - valor_exp2; //retorna entero
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la resta porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                }
                break;
            case Operador.MULTI:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 * valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 * valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 * num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 * valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 * valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 * num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    let num_ascci = valor_exp1.charCodeAt(0);
                    if(tipo_exp2 == tipo.ENTERO){
                        return num_ascci * valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return num_ascci * valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la multiplicacion porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    
                    return null;
                    /*aca se encuentra el booleano y la cadena */
                }
                break;
            case Operador.DIV:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 / valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 / valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 / num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la division porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la division porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 / valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 / valor_exp2;
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 / num_ascci;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la division porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la division porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    let num_ascci = valor_exp1.charCodeAt(0);
                    if(tipo_exp2 == tipo.ENTERO){
                        return num_ascci / valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return num_ascci / valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la division porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la division porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la division porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la division porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }
                break;
            case Operador.MOD:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 % valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 % valor_exp2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 % valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 % valor_exp2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else{
                    //reportar error semantico
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar el modulo porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }
                break;
            case Operador.POT:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 ** valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 ** valor_exp2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO){
                        return valor_exp1 ** valor_exp2;
                    }else if(tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 ** valor_exp2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else{
                    //reportar error semantico
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar la potencia porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }
                break;
            case Operador.UNARIO:
                if(tipo_expU == tipo.ENTERO || tipo_expU == tipo.DOBLE){
                    return -valor_expU;
                }else{
                    //TODO: reportar error semantico
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar el unario porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar el unario porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }
                break;
            default:
                break;
        }
        return null;
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 1;
    }

}