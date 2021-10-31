import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Nodo from "../Ast/Nodo";



export default class Primitivo implements Expresion{

    public valor_primitivo:any;
    public linea: number;
    public columna: number;
    public tipo: Tipo;

    constructor(valor_primitivo:any,tipo :string,linea:number,colum:number){

        this.valor_primitivo=valor_primitivo;
        this.linea=linea;
        this.columna= colum;
        this.tipo=new Tipo(tipo);
    }


    getTipo(controlador:Controlador,ts:TablaSimbolos):tipo{

        return this.tipo.enum_tipo;

    }
    
    getValor(controlador:Controlador,ts:TablaSimbolos):tipo{

        return this.valor_primitivo;

    }

    recorrer():Nodo{

        let padre = new Nodo("Primitivo",""); //Primitivo -> "hola mundo"
        padre.AddHijo(new Nodo(this.valor_primitivo.toString(),""));
       return padre;
    }

    getSize(controlador:Controlador,ts:TablaSimbolos):number{

        return 0;
    }




}