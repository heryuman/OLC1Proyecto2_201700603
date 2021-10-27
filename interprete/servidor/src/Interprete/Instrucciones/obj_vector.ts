import Tipo from "../TablaSimbolos/Tipo";


export default class Obj_vector{


    public lista:Array<any>;
    public tipo_lista:Tipo;
    public size:number;

    constructor(lista:Array<any>,tipoLista:Tipo,size:number){

        this.lista=lista;
        this.tipo_lista=tipoLista;
        this.size=size;
    }
}