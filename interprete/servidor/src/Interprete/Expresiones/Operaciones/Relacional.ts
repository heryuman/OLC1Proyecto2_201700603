import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion,{Operador} from "./Operacion";



export default class Relacionales extends Operacion implements Expresion{

    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, col : number, ExpresionUnaria: boolean) {
        super(exp1, signo_operador, exp2, linea, col, ExpresionUnaria);
    }
    //geTipo retorna el TIPO de la expresion relacional 
    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo;

        tipo_exp1 = this.exp1.getTipo(controlador, ts);
        tipo_exp2 = this.exp2.getTipo(controlador,ts);
        if(tipo_exp1 == tipo.ERROR || tipo_exp2 == tipo.ERROR){
            return tipo.ERROR;
        }

        //comienzan las reglas
        if(tipo_exp1 == tipo.ENTERO){
            if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                return tipo.BOOLEANO;
            }else{
                let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
                return tipo.ERROR;
            }
        }else if(tipo_exp1==tipo.DOBLE){
            if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                return tipo.BOOLEANO;
            }else{
                let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
                return tipo.ERROR;
            }
        }else if(tipo_exp1 == tipo.CARACTER){
            if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                return tipo.BOOLEANO;
            }else{
                let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
                return tipo.ERROR;
            }
        }else if(tipo_exp1 == tipo.BOOLEANO){
            if(tipo_exp2 == tipo.BOOLEANO){
                return tipo.BOOLEANO;
            }else{
                let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
                return tipo.ERROR;
            }
        }else if(tipo_exp1 == tipo.CADENA){
            if(tipo_exp2 == tipo.CADENA){
                 return tipo.BOOLEANO;
            }else{
                let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
                return tipo.ERROR;
            }
        }
        let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
        controlador.errores.push(error);
        controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y col: ${this.col}`);
        return tipo.ERROR;
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let tipo_exp1 :tipo;
        let tipo_exp2 : tipo;

        tipo_exp1 = this.exp1.getTipo(controlador,ts); // ENTERO
        tipo_exp2 = this.exp2.getTipo(controlador,ts); // DOBLE 
        valor_exp1 = this.exp1.getValor(controlador,ts); // 1 
        valor_exp2 = this.exp2.getValor(controlador,ts); // 2.5

        switch(this.operador){
            case Operador.DOBLEIGUAL:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 == valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 == num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 == valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 == num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        return num_ascci1 == valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 == num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 == num_bool_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 == valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }/*else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }*/
                break;
            case Operador.DIFERENCIA:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        return valor_exp1 != valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 != num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        return valor_exp1 != valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 != num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci != valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 != num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 != num_bool_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 != valor_exp2
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }/*else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }*/
                break;
            case Operador.MENQUE:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 < valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operarporque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 < valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operarporque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        return num_ascci1 < valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 < num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operarporque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 < num_bool_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operarporque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 < valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operarporque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return null;
                    }
                }
                break;
            case Operador.MENIGUAL:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 <= valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 <= num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 <= valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 <= num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci != valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 <= num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 <= num_bool_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 <= valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }/*else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }*/
                break;
            case Operador.MAYQUE:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        return valor_exp1 > valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 > num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 > valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 > num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci > valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 > num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 > num_bool_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 > valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }
                break;
            case Operador.MAYIGUAL:
                if(tipo_exp1 == tipo.ENTERO){
                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        return valor_exp1 >= valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 >= num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.DOBLE){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE){
                        return valor_exp1 >= valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 >= num_ascci;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.CARACTER){
                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2 == tipo.DOBLE ){
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci != valor_exp2; 
                    }else if(tipo_exp2 == tipo.CARACTER){
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 >= num_ascci2;
                    }else{
                        //reportar error semantico
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }else if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO){
                        let num_bool_exp1 = 1;
                        if(valor_exp1 == false){
                            num_bool_exp1= 0;
                        }
                        let num_bool_exp2 = 1;
                        if(valor_exp2 == false){
                            num_bool_exp2= 0;
                        }
                        return num_bool_exp1 >= num_bool_exp2;
                    }
                }else if(tipo_exp1 == tipo.CADENA){
                    if(tipo_exp2 == tipo.CADENA){
                        return valor_exp1 >= valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                        return  null;
                    }
                }/*else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
                    return null;
                }*/
                break;
            default:
                break;
        }
        /*let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede operar  porque se produjo un error.`, this.linea, this.col);
        controlador.errores.push(error);
        controlador.append(` *** ERROR: Semántico, Incompatibilidad de tipos, no se puede operar porque se produjo un error. En la línea ${this.linea} y col ${this.col}`);
        return  null;*/
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }

}