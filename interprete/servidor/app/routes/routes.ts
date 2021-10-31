import express = require('express');
import Controlador from '../../src/Interprete/Controlador';
import TablaSimbolos from '../../src/Interprete/TablaSimbolos/TablaSimbolos';
import Ast from '../../src/Interprete/Ast/Ast';
import Nodo from '../../src/Interprete/Ast/Nodo';
var interprete =require('../../src/Analizador/gramatica').parser;
//var interprete=require('../../src/Analizador/interprete').parser;


const router =express.Router();
router.get('/',function(req,res){

    res.send("HOLA DESDE EL SERVER");

})

router.post('/ejecutar',function(req,res){

try {

    const {input}=req.body;
 
    let ast:Ast=interprete.parse(input);
    let controlador=new Controlador();
    let ts_global=new TablaSimbolos(null);
    
    ast.ejecutar(controlador,ts_global);
    let ts_html = controlador.graficar_ts(controlador,ts_global);
    
    res.status(200).json({consola:controlador.consola,ts:ts_html});
    
} catch (error) {
    console.log(error);
    res.status(500).json({resultado : "Se ha producido un error"});
    
}


})

router.post('/recorrer', function(req, res) {
    try {
        const { input } = req.body;
        console.log(input);
        console.log("luego del input")
        let ast : Ast = interprete.parse(input);
        let nodo_ast : Nodo = ast.recorrer();
        let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
        
        res.status(200).json({ast : grafo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ast : "Se ha producido un error"});
    }
})

router.post('/errores',function(req,res){

    try {
    
        const {input}=req.body;
     
        let ast:Ast=interprete.parse(input);
        let controlador=new Controlador();
        let ts_global=new TablaSimbolos(null);
        
        ast.ejecutar(controlador,ts_global);
       
        let errores_html=controlador.graficar_errores(controlador,ts_global);
        res.status(200).json({consola:controlador.consola,te:errores_html});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado : "Se ha producido un error"});
        
    }
    
    
    })




module.exports=router;