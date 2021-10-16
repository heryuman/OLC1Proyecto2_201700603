
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import Operacion,{Operador} from "./Operacion";
import { tipo } from "../../TablaSimbolos/Tipo";
import Nodo from "../../Ast/Nodo";


export default class incre_decremento implements Expresion {

    public mas_o_menos:string;
    public identificador:string;
    public linea:number;
    public columna:number;

    constructor(masmenos:string, id:string,linea:number,columna:number){

        this.mas_o_menos=masmenos;
        this.identificador=id;
        this.linea=linea;
        this.columna=columna;
    }



    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{
        let existe_id= ts.getSimbolo(this.identificador);

        if(existe_id!=null){

            return existe_id.tipo.enum_tipo;
        }else{

            return tipo.ERROR;
        }
        
    }


    getValor(controlador:Controlador, ts:TablaSimbolos){
          
        let existe_id = ts.getSimbolo(this.identificador);

        if(existe_id != null){

            if(this.mas_o_menos== '++'){
                return existe_id.valor=existe_id.valor+1;
            }
            else if(this.mas_o_menos=='--'){

                return existe_id.valor=existe_id.valor-1;
            }
            
        }else{
            // reportar error semantico
            return null;
        }

    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    


}