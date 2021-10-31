

import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";


import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../../TablaSimbolos/Tipo";



export default class Nativas implements Expresion{

    public func_nativa:string;
    public exp: Expresion;
    public linea:number;
    public columna:number;

    constructor(func:string,expre:Expresion,linea:number,columna:number){

        this.func_nativa=func;
        this.exp=expre;
        this.linea=linea;
        this.columna=columna;
    }

    getTipo(controlador:Controlador, ts: TablaSimbolos):tipo{

        
       let nativa=this.func_nativa.toLowerCase();

       if(this.exp != null){


        let tipo_exp=this.exp.getTipo(controlador,ts);
        

        if(nativa =="tolower"){

            if(tipo_exp == tipo.CADENA){

                

                return tipo.CADENA;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }

            
        }

        else if(nativa == "toupper"){

            if(tipo_exp == tipo.CADENA){

                return tipo.CADENA;
            }
        }

        else if(nativa == "length"){

            if(tipo_exp == tipo.CADENA || tipo_exp == tipo.VECTOR || tipo_exp== tipo.LISTA){

                return tipo.ENTERO;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }

           
        }

        else if (nativa == "truncate"){

            if(tipo_exp == tipo.ENTERO ){

                return tipo.ENTERO;
            }
            else if(tipo_exp== tipo.DOBLE){

                return tipo.DOBLE;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }
        }

        else if(nativa == "round"){

            if(tipo_exp == tipo.ENTERO ){

                return tipo.ENTERO;
            }

            else if(tipo_exp == tipo.DOBLE){

                return tipo.DOBLE;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }
        }

        else if(nativa== "typeof"){

             if(tipo_exp== tipo.BOOLEANO || tipo_exp== tipo.CADENA || tipo_exp== tipo.CARACTER || tipo_exp== tipo.DOBLE || tipo_exp== tipo.ENTERO ){ // falta poner tipo lista,vector

                return tipo.CADENA;
             }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }
            
        }

        else if (nativa == "tostring"){

            if(tipo_exp == tipo.ENTERO || tipo_exp == tipo.DOBLE){

                return tipo.CADENA;
            }

            else if(tipo_exp== tipo.BOOLEANO){

                return tipo.CADENA;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }
        }

        else if ( nativa == "tochararray"){

            if(tipo_exp == tipo.CADENA){

                console.log("aqui se debe retornar el tipo array");
                return tipo.VECTOR;
            }else{

                let error= new Errores("Semantico",`el tipo de la expresion no es admitida por la funcion ${nativa}`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico,en la linea ${this.linea} y columna ${this.columna}, el tipo de la expresion no es admitida por la funcion ${nativa}`)
                return tipo.ERROR;
            }
            

        }



       }

       return tipo.ERROR;
    }

    getValor(controlador:Controlador,ts:TablaSimbolos){

        let nativa=this.func_nativa.toLowerCase();

        if(this.exp != null){
 
         let tipo_exp=this.exp.getTipo(controlador,ts);
         let val_exp= this.exp.getValor(controlador,ts);
 
         if(nativa =="tolower"){
 
             if(tipo_exp == tipo.CADENA){

                let minuscula=val_exp.toLowerCase();
                
                 return minuscula;
             }else{

                let error = new Errores("Semantico","no se puede aplicar la funcion tolower porque el tipo de la expresion no es de tipo Cadena",this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico, en la linea: ${this.linea} y columna: ${this.columna},no se puede aplicar la funcion tolower porque el tipo de la expresion no es de tipo Cadena `);
             }
         }
 
         else if(nativa == "toupper"){
 
             if(tipo_exp == tipo.CADENA){
 
                 return val_exp.toUpperCase();
             }
         }
 
         else if(nativa == "length"){
 
             if(tipo_exp == tipo.CADENA ){
 
                 return val_exp.length;
             }

             else if (tipo_exp == tipo.VECTOR || tipo_exp == tipo.LISTA){

            
                
                return this.exp.getSize(controlador,ts);
                
            }

          
         }
 
         else if (nativa == "truncate"){
 
             if(tipo_exp == tipo.ENTERO || tipo_exp == tipo.DOBLE){
 
                 return Math.trunc(val_exp);
             }
         }
 
         else if(nativa == "round"){
 
             if(tipo_exp == tipo.ENTERO || tipo_exp == tipo.DOBLE){
 
                 return Math.round(val_exp);
             }
         }
 
         else if(nativa== "typeof"){

            let type="";
 
             if(tipo_exp== tipo.ENTERO){

               type ="INT";

                return type ;

             }
             else if (tipo_exp == tipo.BOOLEANO){

                type= "BOOLEAN";
                return type;

             }

             else if(tipo_exp == tipo.CADENA){

                type="STRING";
                return type;
             }

             else if(tipo_exp== tipo.CARACTER){

                type="CHAR";
                return type;
             }

             else if(tipo_exp== tipo.DOBLE){

                type="DOUBLE";
                return type;
             }
              // falta devolver tipo lista o tipo vector
         }
 
         else if (nativa == "tostring"){
 
             if(tipo_exp == tipo.ENTERO || tipo_exp == tipo.DOBLE){
 
                 return val_exp.toString();
             }
 
             else if(tipo_exp== tipo.BOOLEANO){
 
                 return val_exp.toString();
             }
         }
 
         else if ( nativa == "tochararray"){
 
             if(tipo_exp == tipo.CADENA){

                return Array.from(val_exp);
             }
             
 
         }
 
 
 
        }


    }

    recorrer():Nodo{

        let padre= new Nodo("Func_nativa","");
        padre.AddHijo(new Nodo(this.func_nativa,""));
        padre.AddHijo(new Nodo("(",""));
        padre.AddHijo(this.exp.recorrer());
        padre.AddHijo(new Nodo(")",""));

        return padre;
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }
}