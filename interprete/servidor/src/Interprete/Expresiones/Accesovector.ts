import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import Decla_Vector from "../Instrucciones/Decla_Vector";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Accesovector implements Expresion{

    public id_vector:string;
    public index:Expresion;
    public linea:number;
    public columna:number;
    

    constructor(id:string, index:Expresion,linea:number,columna:number){

        this.id_vector=id;
        this.index=index;
        this.linea=linea;
        this.columna=columna;

    }


    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{

        let valor_index= this.index.getValor(controlador,ts);
        let tipo_index=this.index.getTipo(controlador,ts);
        console.log("buscamos el vector");
        if(tipo_index == tipo.ENTERO){

            

            if(ts.existe(this.id_vector)){
                console.log("existe el simbolo_ ");
                let simbolo=ts.getSimbolo(this.id_vector) ;
                
              
                if(simbolo?.simbolo == 4){
                    console.log("es vector")
                   let tipo_simbolo= simbolo.valor.tipo_lista.enum_tipo;

                   if(tipo_simbolo == tipo.ENTERO){
                    console.log("es tipo entero")
                    return tipo.ENTERO;
                   }

                   else if(tipo_simbolo == tipo.DOBLE){
                    console.log("es doble")
                    return tipo.DOBLE;
                   }

                   else if(tipo_simbolo == tipo.CADENA){
                    
                    return tipo.CADENA;
                   }

                   else if(tipo_simbolo == tipo.CARACTER){
                    
                    return tipo.CARACTER;
                   }
                   else if(tipo_simbolo == tipo.BOOLEANO){
                    
                    return tipo.BOOLEANO;
                   }
                   
        
                }else{

                    let error= new Errores("Semantico", "el simbolo no es de tipo vector",this.linea,this.columna);
                    controlador.errores.push(error)
                    controlador.append(`**Error:Semantico, en la linea ${this.linea}, y columan ${this.columna}, el simbolo no es de tipo vector`);
                    return tipo.ERROR;
                }
            }else{

                let error = new Errores("semantico","El vector solicitado no existe", this.linea,this.columna);
                controlador.errores.push(error)
                controlador.append(`Error: Semantico, en la linea ${this.linea} y columna ${this.columna}. el vector solicitado no existe`);
                return tipo.ERROR;
            }

        }else{

            let error= new Errores("Semantico","El indice del vector no es de tipo entero",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna: ${this.columna}, el indice del vector no es de tipo entero`);
            return tipo.ERROR;
        }




        return tipo.ERROR;
    }

    getValor(controlador:Controlador,ts:TablaSimbolos){

        let valor_index= this.index.getValor(controlador,ts);
        let tipo_index=this.index.getTipo(controlador,ts);

        if(tipo_index == tipo.ENTERO){

            if(ts.existe(this.id_vector)){

                let simbolo=ts.getSimbolo(this.id_vector) ;
                console.log("existe el vector");
                if(simbolo?.simbolo == 4){

                    let items_vector= simbolo.valor.lista;
                    
                    if(valor_index< items_vector.length){

                    let val_acceso=items_vector[valor_index];
                    console.log("se devuelve"+val_acceso);
                    return val_acceso;
                    }else{

                        let error= new Errores("Semantico","El indice está fuera de rango",this.linea,this.columna);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea ${this.linea} y columan ${this.columna}, el indice está fuera de rango`);
                    }
                    
                }
            }else{

                console.log("no existe el vecotr");
            }

        }


    }

    recorrer():Nodo{

        throw new Error("Error en AxesoVector")
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{
        let tam;

        if(ts.existe(this.id_vector)){

            let vector=ts.getSimbolo(this.id_vector)
            tam= vector?.valor.size
        }
        return tam;
    }
}