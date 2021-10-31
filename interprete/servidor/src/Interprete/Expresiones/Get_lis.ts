import Errores from "../Ast/Errores";
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

                    let error = new Errores("Semantico","el tipo al que se le quiere aplicar el metodo no es una lista",this.linea,this.columna);
                    controlador.errores.push(error);
                    controlador.append(`**Errore:Semantico, en la linea ${this.linea} y columna ${this.columna}, el tipo al que se le quiere aplicar el metodo no es una lista`);
                    return tipo.ERROR;
                }
    
    
            }else{
    
                //reportamos que el id no existe
                let error = new Errores("Semantico",` la lista${this.id_lista} no existe`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico, en la lienea ${this.linea} y columna: ${this.columna},la lista${this.id_lista} no existe `)
                return tipo.ERROR;
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
                    /// getValue(this.id_lista,thi.index)
                  //    getvalue(id,val_index)
                        let val_acceso=lalista[val_index];
                       // console.log("el valor retornado lista "+val_acceso)
                        return val_acceso;
                    }else{

                        //retornamos que el index esta fuera de rango 
                        let error = new Errores("semantico","El indice se encuentra fuera del rango",this.linea,this.columna);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la liena ${this.linea} y columna ${this.columna}, el indice esta fuera de rango`);
                        return null;

                    }

                }else{  

                    //retornamos que no es lista
                }

            }else{

                //retornar que no existe
            }

        }else{

            //retornar que el index no es int
            let error = new Errores("Semantico","El indice no es de tipo Entero",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y colummna ${this.columna}.El indice no es de tipo entero`);
            return null;
        }

    }

    recorrer():Nodo{

        let padre= new Nodo("Get_list","");
        padre.AddHijo(new Nodo("GetValue",""));
        padre.AddHijo(new Nodo("(",""));
        let hijo= new Nodo("id_lista","");
        hijo.AddHijo(new Nodo(this.id_lista,""));
        padre.AddHijo(hijo);
        padre.AddHijo(new Nodo(",",""));
        let hijo2= new Nodo("posicion","");
        hijo2.AddHijo(this.index.recorrer());
        padre.AddHijo(hijo2);
        padre.AddHijo(new Nodo(")",""));
        
        return padre;


    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }
}