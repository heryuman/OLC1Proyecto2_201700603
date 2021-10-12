import express = require('express');
import Controlador from '../../src/Interprete/Controlador';
import TablaSimbolos from '../../src/Interprete/TablaSimbolos/TablaSimbolos';
import Ast from '../../src/Interprete/Ast/Ast';
var interprete =require('../../src/Analizador/gramatica').parser;
//var interprete=require('../../src/Analizador/interprete').parser;


const router =express.Router();
router.get('/',function(req,res){

    res.send("HOLA DESDE EL SERVER");

})

router.post('/ejecutar',function(req,res){

try {

    const {input}=req.body;
    //let arreglo=interprete.parse(input);
    let ast:Ast=interprete.parse(input);
    let respuesta="";
    let controlador=new Controlador();
    let ts_global=new TablaSimbolos(null);

    ast.ejecutar(controlador,ts_global);
   // ast.ejecutar(controlador,ts_global);
   //for (let evaluar of arreglo){}

    res.status(200).json({consola:controlador.consola});
    
} catch (error) {
    console.log(error);
    res.status(500).json({resultado : "Se ha producido un error"});
    
}


})

module.exports=router;