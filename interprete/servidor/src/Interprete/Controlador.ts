import Errores from "./Ast/Errores";
import Simbolo from "./TablaSimbolos/Simbolos";
import TablaSimbolos from "./TablaSimbolos/TablaSimbolos";
import { lista_errores } from "./Ast/Lista_Errores";
export default class Controlador{

    public errores: Array<Errores>;
    public consola:string;
    public sent_ciclica:boolean;
    public lista_ts:Array<TablaSimbolos>

    constructor(){
        this.errores=new Array<Errores>();
        this.consola="";
        this.sent_ciclica=false;
        this.lista_ts = new Array<TablaSimbolos>();
    }

    append(cadena:string){

        this.consola=this.consola+cadena+"\n";
    }

    graficar_ts(controlador:Controlador, ts:TablaSimbolos):string{
        var cuerpohtml = "<thead  class=\"thead-dark\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";
      
        while(ts != null){

      
            ts.tabla.forEach((sim: Simbolo, key : string) =>{
                cuerpohtml += "<tr ><th scope=\"row\">" +  this.getRol(sim) + "</th><td>" + sim.identificador + 
                "</td><td>" + this.getTipo(sim) +"</td>"  + 
                "</td><td>" + this.getAmbito() + 
                "</td><td>" + this.getValor(sim) + 
                "</td><td>" + this.parametros(sim) +"</td>" +  "</tr>";
            })
            
            
            ts = ts.ant;
        }

        for( let ts_local of this.lista_ts){

          //  while(ts_local != null){

                ts_local.tabla.forEach((sim: Simbolo, key : string) =>{
                    cuerpohtml += "<tr ><th scope=\"row\">" +  this.getRol(sim) + "</th><td>" + sim.identificador + "</td><td>" + this.getTipo(sim) +"</td>"  + "</td><td>" + this.getAmbitoLocal() + 
                    "</td><td>" + this.getValor(sim) + 
                    "</td><td>" + this.parametros(sim) +"</td>" +  "</tr>";
                })

                //ts_local= ts_local.ant;

           // }
        }
        
        
        return cuerpohtml;
    }

    /**
     * @function getValor obtiene el valor del simbolo de la tabla
     * @param sim simbolo de la tabla
     * @returns retorna el valor del simbolo
     */
    getValor(sim:Simbolo):string{
       
        if(sim.valor != null){
            return sim.valor.toString(); 
        }else{
            return '...';
        }
    }

    /**
     * @function getTipo obtiene el tipo del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el tipo del simbolo
     */
    getTipo(sim : Simbolo):string{

        if(sim.tipo.nombre_tipo== undefined){
            return "Void";
        }

        return sim.tipo.nombre_tipo;
       
    }

    /**
     * @function getTipo obtiene el rol del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el rol del simbolo
     */
    getRol(sim:Simbolo):string{
        let rol : string = '';
        switch(sim.simbolo){
            case 1:
                rol = "variable"
                break
            case 2:
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
             case 4:
                rol = "vector";
                break
             case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro"
                break;
            
        }
        return rol;
    }

     /**
     * @function getTipo Le indicamos el ambito del simbolo 
     * @returns retorna el ambito del simbolo
     */
    getAmbito():string{
        return 'global'
    }

    getAmbitoLocal():string{
        return 'Local'
    }

     /**
     * @function getTipo obtiene la cantidad de parametros del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna la cantidad de parametros del simbolo si es que tiene
     */
    parametros(sim : Simbolo){
        if(sim.lista_params != undefined){
            return sim.lista_params.length
        }else{
            return "...";
        }
    }

    graficar_errores(controlador:Controlador,ts:TablaSimbolos){

        var cuerpohtml = "<table class=\"table\">"
        +"<thead class=\"thead-dark\">"
        +"<tr>"
        +"<th scope=\"col\">TIPO</th>"
        +"<th scope=\"col\">DESCRIPCION</th>"
        +"<th scope=\"col\">FILA</th>"
        +"<th scope=\"col\">COLUMNA</th>"
        +"</tr>"
        +"</thead>"
        +"<tbody"

        for (let error of this.errores){//ERRORES SEMANTICOS
       
        cuerpohtml+="<tr>"
        +"<th scope=\"row\">"+error.tipo+"</th>"
        +"<td>"+error.descripcion+"</td>"
        +"<td>"+error.linea+"</td>"
        +"<td>"+error.columna+"</td>"
        +"</tr>"
        }
        for (let error of lista_errores.L_Errores){//ERRORES LEXICOS-SINTACTICOS
       
            cuerpohtml+="<tr>"
            +"<th scope=\"row\">"+error.tipo+"</th>"
            +"<td>"+error.descripcion+"</td>"
            +"<td>"+error.linea+"</td>"
            +"<td>"+error.columna+"</td>"
            +"</tr>"
            }

        +"</tbody>"
        +"</table>"
        
        
        this.errores=[];
        lista_errores.L_Errores=[];
      
        return cuerpohtml;
    }
    
}