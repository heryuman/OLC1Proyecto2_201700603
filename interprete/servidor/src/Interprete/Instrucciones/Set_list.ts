import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Set_lista implements Instruccion{


    public id_list:string;
    public index:Expresion;
    public nVal:Expresion;
    public linea:number;
    public columna:number;

    constructor(id:string,index:Expresion,nval:Expresion,linea:number,col:number){

        this.id_list=id;
        this.index=index;
        this.nVal=nval;
        this.linea=linea;
        this.columna=col;
    }


ejecutar(controlador:Controlador,ts:TablaSimbolos){

if(ts.existe(this.id_list)){

    let simbolo= ts.getSimbolo(this.id_list);

    if(simbolo?.tipo.enum_tipo== tipo.LISTA){

        let valor_index=this.index.getValor(controlador,ts);
        let tipo_index=this.index.getTipo(controlador,ts);

        if(tipo_index == tipo.ENTERO){

            let nuevo_item_val=this.nVal.getValor(controlador,ts);
            let nuevo_item_tip=this.nVal.getTipo(controlador,ts);
            let tipo_lista= simbolo.valor.tipo_lista.enum_tipo;
            let la_lista=simbolo.valor.lista;

            if(valor_index <la_lista.length){

                if(tipo_lista == nuevo_item_tip){

                    la_lista[valor_index]= nuevo_item_val;


                }else{
                    //retornar que el nuevo item no tiene el tipo del vector

                }
            }else{

                //retornar que esta fuera del rango
            }

        }else{

            //retorna que no es entero
        }

    }else{

        //retornar que no es lista
    }

}else{

    //retornar que no existe


}

}

recorrer():Nodo{

    throw new Error("")
}

}