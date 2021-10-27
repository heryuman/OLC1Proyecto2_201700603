import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Get_list implements Expresion{

    public id_lista:string;
    public index:Expresion;
    public linea:number;
    public columna:number;

    constructor(id:string, exp:Expresion,linea:number,col:number){

        this.id_lista=id;
        this.index=exp;
        this.linea=linea;
        this.columna=col;
    }




    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{

        console.log("en el tipod de getlist")
        let tipo_index= this.index.getTipo(controlador,ts);
        console.log("el id de la lista: "+this.id_lista)
        if(tipo_index == tipo.ENTERO){
            console.log("el index es entero")

            if(ts.existe(this.id_lista)){
                console.log("existe la lista");
                let simbolo= ts.getSimbolo(this.id_lista);
                if(simbolo?.simbolo==5){

                    console.log("es tipo lista")
                    let tipo_simbolo= simbolo.valor.tipo_lista.enum_tipo;
                    if(tipo_simbolo ==tipo.ENTERO){
    
                        return tipo.ENTERO;
                    }
    
                    else if(tipo_simbolo ==tipo.DOBLE){
    
                        return tipo.DOBLE;
                    }
    
                    else if(tipo_simbolo ==tipo.CADENA){
                        console.log("es tipo string")
                        return tipo.CADENA;
                    }
    
                    else if(tipo_simbolo ==tipo.CARACTER){
    
                        return tipo.CARACTER;
                    }
    
                    else if(tipo_simbolo ==tipo.BOOLEANO){
    
                        return tipo.BOOLEANO;
                    }
    
                }else{
    
                    //re´portamos que no es tipo lista
                }
    
    
            }else{
    
                //reportamos que el id no existe
            }
        }
        


        return tipo.ERROR;
    }

    getValor(controlador:Controlador,ts:TablaSimbolos){

        let tipo_index= this.index.getTipo(controlador,ts);
        let val_index= this.index.getValor(controlador,ts);

        if(tipo_index == tipo.ENTERO){

            if(ts.existe(this.id_lista)){

                let simbolo= ts.getSimbolo(this.id_lista);
                if(simbolo?.simbolo==5){

                    let lalista=simbolo.valor.lista;

                    if(val_index < lalista.length){

                        let val_acceso=lalista[val_index];
                        console.log("el valor retornado lista "+val_acceso)
                        return val_acceso;
                    }else{

                        //retornamos que el index esta fuera de rango 
                    }

                }else{  

                    //retornamos que no es vector
                }

            }else{

                //retornar que no existe
            }

        }else{

            //retornar que el index no es int
        }

    }

    recorrer():Nodo{

        throw new Error("")
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }
}