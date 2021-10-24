import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class Casteo implements Expresion {

    public type:Tipo;
    public exp:Expresion;
    public linea:number;
    public columna:number;

    constructor(type:Tipo, exp:Expresion,linea:number,columna:number){

        this.type=type;
        this.exp=exp;
        this.linea=linea;
        this.columna=columna;
    }

    getTipo(contorlador:Controlador, ts:TablaSimbolos):tipo{

        if(this.exp !=null){

            let tipo_exp= this.exp.getTipo(contorlador,ts);
            if(tipo_exp == tipo.ENTERO){

                if(this.type.enum_tipo==tipo.DOBLE){

                    return tipo.DOBLE;
                }

                else if(this.type.enum_tipo == tipo.CADENA){

                    return tipo.CADENA;
                }

                else if(this.type.enum_tipo == tipo.CARACTER){

                    return tipo.CARACTER;
                }

            }

            else if(tipo_exp == tipo.DOBLE){

                if(this.type.enum_tipo== tipo.ENTERO){

                    return tipo.ENTERO;
                }

                if(this.type.enum_tipo== tipo.CADENA){

                    return tipo.CADENA;
                }
            }

            else if(tipo_exp == tipo.CARACTER){

                if(this.type.enum_tipo== tipo.ENTERO){

                    return tipo.ENTERO;
                }

                else if(this.type.enum_tipo == tipo.DOBLE){

                    return tipo.DOBLE;
                }
            }
          
        }else{

            let erro= new Errores("Semantico","no existe ninguna expresion a castear",this.linea,this.columna);
            contorlador.errores.push(erro);
            contorlador.append(`**Error semantico en la linea: ${this.linea} y columna: ${this.columna}, no existe ninguna expresion a castear `);

        }

        return  tipo.ERROR;
    }

    getValor(controlador:Controlador, ts:TablaSimbolos){

        if(this.exp !=null){

            let tipo_exp= this.exp.getTipo(controlador,ts);
            let valor_exp=this.exp.getValor(controlador,ts);
            if(tipo_exp == tipo.ENTERO){

                if(this.type.enum_tipo==tipo.DOBLE){

                    return valor_exp+0.0;
                }

                else if(this.type.enum_tipo == tipo.CADENA){

                    return valor_exp;
                }

                else if(this.type.enum_tipo == tipo.CARACTER){

                    return String.fromCharCode(valor_exp);
                }

            }

            else if(tipo_exp == tipo.DOBLE){

                if(this.type.enum_tipo== tipo.ENTERO){

                    return Math.trunc(valor_exp);
                }

                if(this.type.enum_tipo== tipo.CADENA){

                    return valor_exp;
                }
            }

            else if(tipo_exp == tipo.CARACTER){

                if(this.type.enum_tipo== tipo.ENTERO){

                    return valor_exp.charCodeAt(0);
                }

                else if(this.type.enum_tipo == tipo.DOBLE){

                    return valor_exp.charCodeAt(0);
                }
            }
          
        }

    }

    recorrer():Nodo{

         throw new Error("un error en casteo");
    }

}