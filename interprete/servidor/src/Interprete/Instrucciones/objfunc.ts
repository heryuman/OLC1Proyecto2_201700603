import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";


export default class objfunc {

    public ts:TablaSimbolos;
    public L_inst : Array<Instruccion>

    constructor(ts:TablaSimbolos,Linst:Array<Instruccion>){

        this.ts=ts;
        this.L_inst=Linst;
        
    }
}