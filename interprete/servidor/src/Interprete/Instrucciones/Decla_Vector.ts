import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolos";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo,{ tipo } from "../TablaSimbolos/Tipo";
import Obj_vector from "./obj_vector";


export default class Vector implements Instruccion{

    
//new vector.default(4,tipo,ID
/*               int vec  [      ]     =     new int  [       4    ]     ;                    
**decla_vector: tipo ID CORCHA CORCHC IGUAL RNEW tipo CORCHA exp CORCHC PYC
**      | tipo num CORCHA CORCHC IGUAL LLAVEA lista_exp LLAVEC PYC
**        string ids [        ]     =      {3,4}
*/

public tipo_declaracion:number;
public tipo_vector:Tipo;
public id_vector:string;
public linea:number;
public columna:number;
public exp:any;
public tamanio:number=0;


constructor(tipo_declaracion:number,tipo_vector:Tipo,id_vector:string,exp:any,liena:number,columna:number){

    this.tipo_declaracion=tipo_declaracion;
    this.tipo_vector=tipo_vector;
    this.id_vector=id_vector;
    this.linea=liena;
    this.columna=columna;
    this.exp=exp;
   
}

 ejecutar(controlador:Controlador, ts:TablaSimbolos){

         if (ts.existeEnActual(this.id_vector)){

            let error =new Errores("Semantico","El id del vector ya existe en el entorno actual",this.linea,this.columna);
            controlador.errores.push(error);
            controlador.append(`**Error:Semantico, en la linea ${this.linea} y columna: ${this.columna}, el Id, del vector ya se encuentra declarado`);
    
         }

         if ( this.tipo_declaracion==1){
            console.log("tamanio del vector tipo 1"+this.tamanio);

            let valores=[];
            if(this.tipo_vector.enum_tipo== tipo.ENTERO){

                let tamanio =this.exp.getValor(controlador,ts);
                this.tamanio=tamanio;
                for (let i=0; i< tamanio; i++ ){

                    valores.push(0);
                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);
            }

            else if(this.tipo_vector.enum_tipo== tipo.DOBLE){

                let tamanio =this.exp.getValor(controlador,ts);
                for (let i=0; i< tamanio; i++ ){

                    valores.push(0.0);
                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);
            }

            else if(this.tipo_vector.enum_tipo== tipo.BOOLEANO){

                let tamanio =this.exp.getValor(controlador,ts);
                for (let i=0; i< tamanio; i++ ){

                    valores.push(true);
                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);
            }

            else if(this.tipo_vector.enum_tipo== tipo.CARACTER){

                let tamanio =this.exp.getValor(controlador,ts);
                for (let i=0; i< tamanio; i++ ){

                    valores.push('0');
                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);



            }

            else if(this.tipo_vector.enum_tipo== tipo.CADENA){

                let tamanio =this.exp.getValor(controlador,ts);
                for (let i=0; i< tamanio; i++ ){

                    valores.push("");
                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);
            }


         }
         else if( this.tipo_declaracion ==2){

                let lista_exps= this.exp
                let valores=[];
                this.tamanio=lista_exps.length;
                console.log("tamanio del vector tipo 2"+this.tamanio);
                for (let exp of lista_exps){

                    let valor= exp.getValor(controlador,ts);
                    let tipo_valor=exp.getTipo(controlador,ts);
                    if(tipo_valor ==this.tipo_vector.enum_tipo){

                        valores.push(valor);
                    }else{

                        let error = new Errores("Semantico","El valor a almacenar no corresponde al tipo de vector declarado",this.linea,this.columna);
                        controlador.errores.push(error);
                        controlador.append(`**Error:Semantico, en la linea: ${this.linea} y columna: ${this.columna}, el tipo de dato a almacenar no corresponde al tipo declarado`);
                        return tipo.ERROR;

                    }

                }
                let nVector= new Tipo("VECTOR");
                let nObjv=new Obj_vector(valores,this.tipo_vector,this.tamanio);
                //let nSimbolo= new Simbolo(4,this.tipo_vector,this.id_vector,valores);
                let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                ts.agregar(this.id_vector,nSimbolo);
            
         }

         else if(this.tipo_declaracion == 3){
            //para el tocharArray()
            console.log("hay un vector tipo 3")
            console.log("el tipo del vector es= "+this.tipo_vector.enum_tipo)
            if(this.tipo_vector.enum_tipo == tipo.CARACTER){
                let nVector= new Tipo("VECTOR");
                let tipo_exp= this.exp.getTipo(controlador,ts);
                let valor_exp= this.exp.getValor(controlador,ts);

                if(tipo_exp == tipo.CADENA){

                   let lista_char= Array.from(valor_exp);
                   let nObjv= new Obj_vector(lista_char,this.tipo_vector,lista_char.length);
                   console.log("listachar "+lista_char.length)
                   let nSimbolo= new Simbolo(4,nVector,this.id_vector,nObjv);
                   ts.agregar(this.id_vector,nSimbolo);
                }

                
   

            }
          

         }


 }

 recorrer():Nodo{

    throw new Error("error en decla_vec")

 }




    
}