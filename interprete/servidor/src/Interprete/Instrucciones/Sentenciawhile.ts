  
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Detener from "../Instrucciones/SentBreak";
import Errores from "../Ast/Errores";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;
    public do_flag:boolean| undefined;

    constructor(condicion:Expresion, lista_instrucciones:Array<Instruccion>, linea:number, columna:number,do_flag?:boolean) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
        this.do_flag=do_flag;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        let tmp= controlador.sent_ciclica;
        controlador.sent_ciclica=true;

        if(this.do_flag== undefined){
            console.log("while")
            if(typeof valor_condicion == 'boolean'){

                while(this.condicion.getValor(controlador,ts)){
    
                    let ts_local = new TablaSimbolos(ts);
                    controlador.lista_ts.push(ts_local);
                    for(let ins of this.lista_instrucciones){
                        let res = ins.ejecutar(controlador,ts_local);
                         //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                         if(ins instanceof Detener || res instanceof Detener ){
                             return res;
                         }
    
                    }
                }
            }else{
    
                let error= new Errores("Semantico","la condicion del While no es de tipo booleano",this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error semantico, la condicion no es de tipo boolenao, en la linea: ${this.linea} y columna: ${this.columna}`);
            }

        }
        else if(this.do_flag==true){
            console.log("es do-while")
            if(typeof valor_condicion == 'boolean'){

                do{
                    console.log("en el doowhile")
                    let ts_local = new TablaSimbolos(ts);
                    controlador.lista_ts.push(ts_local);
                        for(let ins of this.lista_instrucciones){
                            let res = ins.ejecutar(controlador,ts_local);
                             //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                             if(ins instanceof Detener || res instanceof Detener ){
                                 return res;
                             }
        
                        }
    
    
                }while(this.condicion.getValor(controlador,ts));
    
            }else{
    
                let error= new Errores("Semantico","la condicion del While no es de tipo booleano",this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`**Error semantico, la condicion no es de tipo boolenao, en la linea: ${this.linea} y columna: ${this.columna}`);
            }


        }

        controlador.sent_ciclica=tmp;
        return null;
    }
    
    recorrer(): Nodo {

        let padre;

        if(this.do_flag==undefined){

            padre = new Nodo("Ciclo","");
            padre.AddHijo(new Nodo("While",""));
            padre.AddHijo(new Nodo("(",""));
            padre.AddHijo(this.condicion.recorrer());
            padre.AddHijo(new Nodo(")",""));
            padre.AddHijo(new Nodo("{",""));
            let hijo= new Nodo("Instrucciones","");
            for(let ins of this.lista_instrucciones){
                hijo.AddHijo(ins.recorrer());
    
            }
    
            padre.AddHijo(hijo);
            padre.AddHijo(new Nodo("}",""));
            return padre;
        }else{

            padre= new Nodo("Ciclo","");
            padre.AddHijo(new Nodo("do",""));
            padre.AddHijo(new Nodo("{",""));
            let hijo= new Nodo("Instrucciones","");
            for (let ins of this.lista_instrucciones){

                hijo.AddHijo(ins.recorrer());
            }
            padre.AddHijo(hijo);
            padre.AddHijo(new Nodo("}",""));

            padre.AddHijo(new Nodo("While",""));
            padre.AddHijo(new Nodo("(",""));
            let hijo2= new Nodo("Condicion","");
            hijo2.AddHijo(this.condicion.recorrer());
            padre.AddHijo(hijo2);
            padre.AddHijo(new Nodo(")",""));
            padre.AddHijo(new Nodo(";",""));
            
            return padre;

        }
        
    }

}