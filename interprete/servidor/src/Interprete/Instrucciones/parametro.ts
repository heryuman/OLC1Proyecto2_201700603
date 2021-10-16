import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class parametro{


    public tipo:Tipo;
    public id:string;

    constructor (tipo:Tipo,id:string){

        this.tipo=tipo;
        this.id=id;
    }
}