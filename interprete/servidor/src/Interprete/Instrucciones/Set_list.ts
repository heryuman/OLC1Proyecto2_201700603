import Errores from "../Ast/Errores";
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
                    //retornar que el nuevo item no tiene el tipo de la lista
                    let error = new Errores("Semantico", `El tipo de dato del nuevo item no corresponde al tipo de la lista ${this.id_list}`,this.linea,this.columna);
                    controlador.errores.push(error);
                    controlador.append(`**Error:Semantico en la linea ${this.linea} y columna ${this.columna},El tipo de dato del nuevo item no corresponde al tipo de la lista ${this.id_list} `)
                    return tipo.ERROR;

                }
            }else{

                //retornar que esta fuera del rango
                let error = new Errores("Semantico",`el indice de la lista ${this.id_list}, se encuentra fuera de rango`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columna},el indice de la lista ${this.id_list}, se encuentra fuera de rango`);
                return tipo.ERROR;
            }

        }else{

            //retorna que no es entero
            let error = new Errores("Semantico",`el indice de la lista ${this.id_list}, no es entero`,this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna ${this.columna},el indice de la lista ${this.id_list}, no es entero`);
            return tipo.ERROR;
        }

    }else{

        //retornar que no es lista
        let error = new Errores("Semantico",`el id: ${this.id_list}, no es una lista`,this.linea,this.columna);
        controlador.errores.push(error);
        controlador.append(`**Error:Semantic, en la linea ${this.linea} y columna ${this.columna},el id: ${this.id_list}, no es una lista`);
        return tipo.ERROR;
    }

}else{

    //retornar que no existe
    let error = new Errores("Semantico",`el simbolo: ${this.id_list}, no  se encuentra en la tabla de simbolso`,this.linea,this.columna);
    controlador.errores.push(error);
    controlador.append(`**Error:Semantic, en la linea ${this.linea} y columna ${this.columna},el simbolo: ${this.id_list}, no  se encuentra en la tabla de simbolso`);
    return tipo.ERROR;


}

}

recorrer():Nodo{

    throw new Error("")
}

}