import Controlador from "../../Controlador";
import Nodo from "../../Ast/Nodo";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
export enum Operador{

    SUMA,
    RESTA,
    MULTI,
    DIV,
    POT,
    MOD,
    UNARIO,
    DOBLEIGUAL,
    DIFERENCIA,
    MENQUE,
    MAYQUE,
    MENIGUAL,
    MAYIGUAL,
    OR,
    AND,
    NOT,
    X

}
export default class Operacion implements Expresion {

    public exp1:Expresion;
    public exp2:Expresion;
    public expU:Boolean;
    public linea: number;
    public col: number;
    public sign_operador:string;
    public operador:Operador;

    constructor(exp1: Expresion, sign_operador: string, exp2: Expresion,linea:number,col:number,unarioflag:boolean ){

        this.exp1=exp1;
        this.exp2=exp2;
        this.col=col;
        this.linea=linea;
        this.sign_operador=sign_operador;
        this.expU=unarioflag;
        this.operador=this.getOperador(sign_operador);
    }


    getOperador(signo_operador:string):Operador{


        if(signo_operador== '+'){

            return Operador.SUMA;

        }else if(signo_operador == '-'){

            return Operador.RESTA;

        }else if(signo_operador=='*'){

            return Operador.MULTI;

        }else if(signo_operador== '/'){

            return Operador.DIV;

        }else if(signo_operador=='^'){

            return Operador.POT;

        }else if(signo_operador=='%'){

            return Operador.MOD;

        }else if(signo_operador=='=='){

            return Operador.DOBLEIGUAL;  

        }else if( signo_operador=='!='){

            return Operador.DIFERENCIA;

        }else if(signo_operador=='<'){

            return Operador.MENQUE;

        }else if(signo_operador=='>'){

            return Operador.MAYQUE;

        }else if(signo_operador=='<='){

            return Operador.MENIGUAL;

        }else if(signo_operador=='>='){

            return Operador.MAYIGUAL;
            
        }else if(signo_operador=='||'){

            return Operador.OR;

        }else if(signo_operador=='&&'){

            return Operador.AND;

        }else if(signo_operador=='!'){

            return Operador.NOT;

        }else if (signo_operador=='UNARIO'){

            return Operador.UNARIO;

        }else {

            return Operador.X;
        }


        
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }





}