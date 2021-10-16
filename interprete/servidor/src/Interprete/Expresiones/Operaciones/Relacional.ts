import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion,{Operador} from "./Operacion";



export default class Relacionales extends Operacion implements Expresion{

    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
    }

    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{

        let tipo_exp1:tipo;
        let tipo_exp2:tipo;

        if(this.expU==false){

            tipo_exp1 =this.exp1.getTipo(controlador,ts);
            tipo_exp2 =this.exp2.getTipo(controlador,ts);
            if(tipo_exp1==tipo.ERROR || tipo_exp2 ==tipo.ERROR){

                return tipo.ERROR;
            }

        }else{

            tipo_exp1= this.exp1.getTipo(controlador,ts);
            if(tipo_exp1 == tipo.ERROR){

                return tipo.ERROR;
            }
            tipo_exp2=tipo.ERROR;
        }

        switch (this.operador) {
            case Operador.DOBLEIGUAL:

                if(tipo_exp1==tipo.ENTERO){

                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){

                        return tipo.BOOLEANO;

                    }else{

                         let error= new Errores("Semantico","la comparacion realizada no se realiza entre tipos permitidos ",this.linea,this.col);
                         controlador.errores.push(error);
                         controlador.append(`**Error:Semantico,la comparacion realizada no se produce entre tipos permitidos, en la linea ${this.linea} y columna: ${this.col}`);
                         return tipo.ERROR;
                         
                        }
                }else if(tipo_exp1 ==tipo.DOBLE){

                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){

                        return tipo.BOOLEANO;
                    }else{ return tipo.ERROR;}
                }else if (tipo_exp1 == tipo.CARACTER){

                    if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){

                        return tipo.BOOLEANO;
                    }else{ return tipo.ERROR;}
                }else if(tipo_exp1== tipo.CADENA){

                    if(tipo_exp2 == tipo.CADENA){
                        return tipo.BOOLEANO;
                    }
 
                }

                break;

            case Operador.DIFERENCIA:

                    if(tipo_exp1==tipo.ENTERO){
    
                        if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }else if(tipo_exp1 ==tipo.DOBLE){
    
                        if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }else if (tipo_exp1 == tipo.CARACTER){
    
                        if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }

                    else if(tipo_exp1 == tipo.CADENA){

                        if(tipo_exp2 == tipo.CADENA){

                            return tipo.BOOLEANO;
                        }
                    }
    
                    break;

            case Operador.MENQUE:

                if(tipo_exp1==tipo.ENTERO){

                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){

                        return tipo.BOOLEANO;
                    }else{ return tipo.ERROR;}
                }else if(tipo_exp1 ==tipo.DOBLE){

                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){

                        return tipo.BOOLEANO;
                    }else{ return tipo.ERROR;}
                }else if (tipo_exp1 == tipo.CARACTER){

                    if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){

                        return tipo.BOOLEANO;
                    }else{ return tipo.ERROR;}
                }

                break;

            case Operador.MENIGUAL:

                    if(tipo_exp1==tipo.ENTERO){
    
                        if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }else if(tipo_exp1 ==tipo.DOBLE){
    
                        if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }else if (tipo_exp1 == tipo.CARACTER){
    
                        if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
    
                            return tipo.BOOLEANO;
                        }else{ return tipo.ERROR;}
                    }
    
                    break;

            case Operador.MAYQUE:

                        if(tipo_exp1==tipo.ENTERO){
        
                            if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
        
                                return tipo.BOOLEANO;
                            }else{ return tipo.ERROR;}
                        }else if(tipo_exp1 ==tipo.DOBLE){
        
                            if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
        
                                return tipo.BOOLEANO;
                            }else{ return tipo.ERROR;}
                        }else if (tipo_exp1 == tipo.CARACTER){
        
                            if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
        
                                return tipo.BOOLEANO;
                            }else{ return tipo.ERROR;}
                        }
        
                        break;

            case Operador.MAYIGUAL:

                            if(tipo_exp1==tipo.ENTERO){
            
                                if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
            
                                    return tipo.BOOLEANO;
                                }else{ return tipo.ERROR;}
                            }else if(tipo_exp1 ==tipo.DOBLE){
            
                                if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
            
                                    return tipo.BOOLEANO;
                                }else{ return tipo.ERROR;}
                            }else if (tipo_exp1 == tipo.CARACTER){
            
                                if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
            
                                    return tipo.BOOLEANO;
                                }else{ return tipo.ERROR;}
                            }
            
                            break;
        
            default:
                break;
        }

        return tipo.ERROR;

    }


    getValor(controlador:Controlador,ts:TablaSimbolos){
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo;
        let tipo_expU : tipo;

        if(this.expU == false){

            tipo_exp1= this.exp1.getTipo(controlador,ts);
            tipo_exp2= this.exp2.getTipo(controlador,ts);
            tipo_expU = tipo.ERROR;

            valor_exp1=this.exp1.getValor(controlador,ts);
            valor_exp2=this.exp2.getValor(controlador,ts);

        }else{

           /* tipo_expU = this.exp1.getTipo(controlador,ts);
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;

            valor_expU = this.exp1.getValor(controlador,ts);*/

            return tipo.ERROR;
        }

        switch (this.operador) {
            case Operador.DOBLEIGUAL:

                if(tipo_exp1==tipo.ENTERO){

                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){

                        return valor_exp1==valor_exp2;

                    }else{ return tipo.ERROR;}
                }else if(tipo_exp1 ==tipo.DOBLE){

                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){

                         return valor_exp1==valor_exp2;

                    }else{ return tipo.ERROR;}
                }else if (tipo_exp1 == tipo.CARACTER){

                    if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){

                         return valor_exp1==valor_exp2;

                    }else{ return tipo.ERROR;}
                }else if(tipo_exp1 == tipo.CADENA){

                    if(tipo_exp2 == tipo.CADENA){

                        return valor_exp1 == valor_exp2;
                    }
                }

                break;

            case Operador.DIFERENCIA:

                    if(tipo_exp1==tipo.ENTERO){
    
                        if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
    
                            return valor_exp1!=valor_exp2;
    
                        }else{ return tipo.ERROR;}
                    }else if(tipo_exp1 ==tipo.DOBLE){
    
                        if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
    
                             return valor_exp1!=valor_exp2;
    
                        }else{ return tipo.ERROR;}
                    }else if (tipo_exp1 == tipo.CARACTER){
    
                        if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
    
                             return valor_exp1!=valor_exp2;
    
                        }else{ return tipo.ERROR;}
                    }else if(tipo_exp1 == tipo.CADENA){

                        if(tipo_exp2 == tipo.CADENA){
    
                            return valor_exp1 != this.exp2;
                        }
                    }
    
                    break;

            case Operador.MENQUE:

                        if(tipo_exp1==tipo.ENTERO){
        
                            if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
        
                                return valor_exp1<valor_exp2;
        
                            }else{ return tipo.ERROR;}
                        }else if(tipo_exp1 ==tipo.DOBLE){
        
                            if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
        
                                 return valor_exp1<valor_exp2;
        
                            }else{ return tipo.ERROR;}
                        }else if (tipo_exp1 == tipo.CARACTER){
        
                            if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
        
                                 return valor_exp1<valor_exp2;
        
                            }else{ return tipo.ERROR;}
                        }
        
                        break;
           case Operador.MENIGUAL:

                            if(tipo_exp1==tipo.ENTERO){
            
                                if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
            
                                    return valor_exp1<=valor_exp2;
            
                                }else{ return tipo.ERROR;}
                            }else if(tipo_exp1 ==tipo.DOBLE){
            
                                if(tipo_exp2 <= tipo.ENTERO || tipo_exp2==tipo.CARACTER){
            
                                     return valor_exp1<=valor_exp2;
            
                                }else{ return tipo.ERROR;}
                            }else if (tipo_exp1 == tipo.CARACTER){
            
                                if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
            
                                     return valor_exp1<=valor_exp2;
            
                                }else{ return tipo.ERROR;}
                            }
            
                            break;

            case Operador.MAYQUE:

                                if(tipo_exp1==tipo.ENTERO){
                
                                    if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
                
                                        return valor_exp1>valor_exp2;
                
                                    }else{ return tipo.ERROR;}
                                }else if(tipo_exp1 ==tipo.DOBLE){
                
                                    if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
                
                                         return valor_exp1>valor_exp2;
                
                                    }else{ return tipo.ERROR;}
                                }else if (tipo_exp1 == tipo.CARACTER){
                
                                    if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                
                                         return valor_exp1>valor_exp2;
                
                                    }else{ return tipo.ERROR;}
                                }
                
                                break;
            case Operador.MAYIGUAL:

                                    if(tipo_exp1==tipo.ENTERO){
                    
                                        if(tipo_exp2 ==tipo.ENTERO || tipo_exp2 ==tipo.DOBLE || tipo_exp2== tipo.CARACTER){
                    
                                            return valor_exp1>=valor_exp2;
                    
                                        }else{ return tipo.ERROR;}
                                    }else if(tipo_exp1 ==tipo.DOBLE){
                    
                                        if(tipo_exp2 == tipo.ENTERO || tipo_exp2==tipo.CARACTER){
                    
                                             return valor_exp1>=valor_exp2;
                    
                                        }else{ return tipo.ERROR;}
                                    }else if (tipo_exp1 == tipo.CARACTER){
                    
                                        if(tipo_exp2== tipo.ENTERO || tipo_exp2 == tipo.DOBLE || tipo_exp2 == tipo.CARACTER){
                    
                                             return valor_exp1>=valor_exp2;
                    
                                        }else{ return tipo.ERROR;}
                                    }
                    
                                    break;
        
        
            default:
                break;
        }


    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }



}