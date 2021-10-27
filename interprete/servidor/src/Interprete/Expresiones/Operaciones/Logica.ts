import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion,{Operador} from "./Operacion";


export default class Logica extends Operacion implements Expresion{

    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
    
    }

    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{

        let tipo_exp1:tipo;
        let tipo_exp2:tipo;
       

        if(this.expU==false){

            tipo_exp1=this.exp1.getTipo(controlador,ts);
            tipo_exp2=this.exp2.getTipo(controlador,ts);

            if(tipo_exp1==tipo.ERROR || tipo_exp2 == tipo.ERROR){

                return tipo.ERROR;
            }

        }else{

            tipo_exp1 = this.exp1.getTipo(controlador,ts);
            if(tipo_exp1== tipo.ERROR){

                return tipo.ERROR;
            }
            tipo_exp2=tipo.ERROR;
        }

        switch (this.operador) {
            case Operador.AND:
                if (tipo_exp1 == tipo.BOOLEANO){

                    if (tipo_exp2== tipo.BOOLEANO){

                        return tipo.BOOLEANO;
                    }
                }
            case Operador.OR:
                    if (tipo_exp1 == tipo.BOOLEANO){
    
                        if (tipo_exp2== tipo.BOOLEANO){
    
                            return tipo.BOOLEANO;
                        }
                    }
            case Operador.NOT:
                if(tipo_exp1 == tipo.BOOLEANO){

                    return tipo.BOOLEANO;
                }else{

                    return tipo.ERROR;
                }
                
                break;
        
            default:
                break;
        }

       return tipo.ERROR;

    }

    getValor(controlador:Controlador, ts:TablaSimbolos){
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        let tipo_exp1: tipo;
        let tipo_exp2: tipo;
        let tipo_expU: tipo;

        if(this.expU == false){

            tipo_exp1= this.exp1.getTipo(controlador,ts);
            tipo_exp2= this.exp2.getTipo(controlador,ts);
            tipo_expU = tipo.ERROR;

            valor_exp1=this.exp1.getValor(controlador,ts);
            valor_exp2=this.exp2.getValor(controlador,ts);

        }else{

            tipo_expU = this.exp1.getTipo(controlador,ts);
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;

            valor_expU = this.exp1.getValor(controlador,ts);

          
        }

        switch (this.operador) {
            case Operador.AND:
                if (tipo_exp1 == tipo.BOOLEANO){

                    if (tipo_exp2== tipo.BOOLEANO){

                        return valor_exp1 && valor_exp2;
                    }
                }
                
                break;
        
            case Operador.OR:
                    if (tipo_exp1 == tipo.BOOLEANO){
    
                        if (tipo_exp2== tipo.BOOLEANO){
    
                            return valor_exp1 || valor_exp2;
                        }
                    }
                break;
            
            case Operador.NOT:
                if (tipo_expU == tipo.BOOLEANO){

                    return !valor_expU;

                }
            default:
                break;
        }

    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }


}