import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo,{tipo} from "../TablaSimbolos/Tipo";



export default class Declaracion implements Instruccion{

        public type: Tipo;
        public lista_ids: Array<string>;
        public expresion: Expresion;

        public linea:number;
        public columna:number;

        constructor(type:Tipo,lisata_ids:Array<string>,exp:any,linea:number,columna:number){

            this.type=type;
            this.lista_ids=lisata_ids;
            this.expresion=exp;
            this.linea=linea;
            this.columna=columna;
        }

        ejecutar(controlador:Controlador,ts:TablaSimbolos){

            //verificamos si existe en la tabla de simbolos actual
            for (let id of this.lista_ids){

            if(ts.existeEnActual(id)){

                let error= new Errores("Semantico",`la variables ${id} ya existe en el entorno actual, por lo que no se puede declarar`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(` *** ERROR: Semantico, La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`)
                continue;

            }

                
            if (this.expresion != null){

                let tipo_valor= this.expresion.getTipo(controlador,ts);//indica si es entero, bool, doble,etc
                let valor= this.expresion.getValor(controlador,ts);//0 o true, 1.4
                
                if(tipo_valor==this.type.enum_tipo){
                    let nuev_simbolo=new Simbolo(1,this.type,id,valor);
                    ts.agregar(id,nuev_simbolo);
                }else{
                    let error = new Errores("Semantico", `El valor de ${id}, no corresponde al tipo declarado.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, el valor de ${id},no corresponde al tipo declarado, en la fila ${this.linea} y columna ${this.columna}`);
                    

                }
            }else{
                //en esta seccion se agregan valores por defecto a las declaraciones
                let nuevo_simbolo = new Simbolo(1, this.type, id, null);
                ts.agregar(id, nuevo_simbolo);
                 
                if(this.type.enum_tipo == tipo.ENTERO){
                    nuevo_simbolo.setValor(0);
                }else if(this.type.enum_tipo == tipo.DOBLE){
                    nuevo_simbolo.setValor(0.0);
                }else if(this.type.enum_tipo == tipo.BOOLEANO){
                    nuevo_simbolo.setValor(true);
                }else if(this.type.enum_tipo == tipo.CADENA){
                    nuevo_simbolo.setValor("");
                }else if(this.type.enum_tipo == tipo.CARACTER){
                    nuevo_simbolo.setValor('0');
                }
            }

        }
        return null;
    }
    recorrer():Nodo{

        throw new Error("Metodo no implementado");
    }

}