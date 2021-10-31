
/* Ejemplo para la gramatica del interprete */

/* Definicion lexica */
%lex
%options case-insensitive 
%option yylineno
//Expresiones regulares
num [0-9]+
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*

//--> Cadena
escapechar      [\'\"\\ntr]
escape          \\{escapechar}
aceptacion      [^\"\\] 
cadena          (\"({escape} | {aceptacion})*\")

//--> Caracter 
escapechar2      [\'\"\\ntr]
escape2          \\{escapechar2}
aceptacion2      [^\'\\] 
caracter         (\'({escape2} | {aceptacion2})\')

%%

/* Comentarios */
"//".*              {/*Ignoramos los comentarios simples*/}   id++
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/} 


/* Simbolos del programa */

"++"                 { console.log("Reconocio : " + yytext);  return 'INCRE' }
"--"                 { console.log("Reconocio : " + yytext);  return 'DECRE' }   
"=="                 { console.log("Reconocio : " + yytext);  return 'IGUALIGUAL' } 
"\"\""               {console.log("Reconocio : " + yytext); return 'DOBLECOMILLAS'}
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' } 
"("                  { console.log("Reconocio : " + yytext);  return 'PARA' } 
")"                  { console.log("Reconocio : " + yytext);  return 'PARC' } 
"["                  { console.log("Reconocio : " + yytext);  return 'CORA' } 
"]"                  { console.log("Reconocio : " + yytext);  return 'CORC' } 
";"                  { console.log("Reconocio : " + yytext);  return 'PYC' } 
"="                  { console.log("Reconocio : " + yytext);  return 'IGUAL' } 
","                  { console.log("Reconocio : " + yytext);  return 'COMA' } 
":"                  {console.log("Reconocio : " + yytext); return 'RDOSPTS'}
"{"					 {console.log("Reconocio : " + yytext); return 'LLAVEA'}
"}"					 {console.log("Reconocio : " + yytext); return 'LLAVEC'}

/* OPERADORES ARITMETICOS */
"+"                  { console.log("Reconocio : " + yytext);  return 'MAS' } 
"*"                  { console.log("Reconocio : " + yytext);  return 'MULTI' } 
"/"                  { console.log("Reconocio : " + yytext);  return 'DIV' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'MENOS' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' }
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 

/* OPERADORES RELACIONALES */
">="                  { console.log("Reconocio : " + yytext);  return 'MAYORIGUAL' } 
">"                  { console.log("Reconocio : " + yytext);  return 'MAYORQUE' }
"<="                  { console.log("Reconocio : " + yytext);  return 'MENORIGUAL' } 
"<"                  { console.log("Reconocio : " + yytext);  return 'MENORQUE' } 
"!="                  { console.log("Reconocio : " + yytext);  return 'DIFERENTE' }

/* OPERADORES LOGICOS */
"&&"                  { console.log("Reconocio : " + yytext);  return 'AND' } 
"||"                  { console.log("Reconocio : " + yytext);  return 'OR' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' }
"?"                  {console.log("Reconocio : " + yytext); return 'TERNARIO'}

/*Palabras reservadas*/

"true"                  { console.log("Reconocio : " + yytext);  return 'TRUE' } 
"false"                  { console.log("Reconocio : " + yytext);  return 'FALSE' } 

"int"                  { console.log("Reconocio : " + yytext);  return 'INT' } 
"double"                  { console.log("Reconocio : " + yytext);  return 'DOUBLE' } 
"string"                  { console.log("Reconocio : " + yytext);  return 'STRING' } 
"char"                  { console.log("Reconocio : " + yytext);  return 'CHAR' } 
"boolean"                  { console.log("Reconocio : " + yytext);  return 'BOOLEAN' }




"writeline"         { console.log("Reconocio : " + yytext);  return 'WRITELINE' }
"new"               {console.log("Reconocio : " + yytext); return 'RNEW'}
"while"		     	{console.log("Reconocio : " + yytext); return 'RWHILE'}
"if"				{console.log("Reconocio : " + yytext); return 'RIF'}
"else"				{console.log("Reconocio : " + yytext); return 'RELSE'}
"start"				{console.log("Reconocio : " + yytext); return 'RSTART'}
"with"              {console.log("Reconocio : " + yytext); return 'RWITH'}
"switch"			{console.log("Reconocio : " + yytext); return 'RSWITCH'}
"case"				{console.log("Reconocio : " + yytext); return 'RCASE'}
"default"			{console.log("Reconocio : " + yytext); return 'RDEFAULT'}
"for"               {console.log("Reconocio : " + yytext); return 'RFOR'}
"do"                {console.log("Reconocio : " + yytext); return 'RDO'}
"continue"          {console.log("Reconocio : " + yytext); return 'RCONTINUE'}
"getValue"          {console.log("Reconocio : " + yytext); return 'RGETVALUE'}
"setValue"          {console.log("Reconocio : " + yytext); return 'RSETVALUE'}
"return"            {console.log("Reconocio : " + yytext); return 'RRETURN'}
"tolower"           {console.log("Reconocio : " + yytext); return 'RTOLOWER'}
"toupper"           {console.log("Reconocio : " + yytext); return 'RTOUPPER'}
"truncate"          {console.log("Reconocio : " + yytext); return 'RTRUNCATE'}
"round"             {console.log("Reconocio : " + yytext); return 'RROUND'}
"typeof"            {console.log("Reconocio : " + yytext); return 'RTYPEOF'}
"tostring"          {console.log("Reconocio : " + yytext); return 'RTOSTRING'}
"tocharArray"       {console.log("Reconocio : " + yytext); return 'RTOCHARARRAY'}
"false"             {console.log("Reconocio : " + yytext); return 'RFALSE'}
"true"              {console.log("Reconocio : " + yytext); return 'RTRUE'}
"break"				{console.log("Reconocio : " + yytext); return 'RBREAK'}
"dynamiclist"       {console.log("Reconocio : " + yytext); return 'RDYNAMICLIST'}
"append"            {console.log("Reconocio : " + yytext); return 'RAPPEND'}
"void"              {console.log("Reconocio : " + yytext); return 'RVOID'}
"length"            {console.log("Reconocio : " + yytext); return 'RLENGTH'}


//SIMBOLOS ER

[0-9]+("."[0-9]+)\b  { console.log("Reconocio : " + yytext);  return 'DECIMAL' } 
{num}                 { console.log("Reconocio : " + yytext);  return 'ENTERO' } 
{id}                 { console.log("Reconocio : " + yytext);  return 'ID' } 
{cadena}                 { console.log("Reconocio : " + yytext);  return 'CADENA' } 
{caracter}                 { console.log("Reconocio : " + yytext);  return 'CARACTER' } 


/*Espacios*/
[\s\r\n\t]             {/* Espacios se ignoran */}


<<EOF>>               return 'EOF'
.                    {  console.log("Error Lexico: "+yytext +" linea: "+yylineno +" Columna: "+(yylloc.last_column));
                        new errores.default('Lexico','El Caracter'+yytext+' no forma parte del lenguaje',yylineno,yylloc.last_column);


                        }

/lex

// area de imports
%{
    
    const aritmetica = require('../Interprete/Expresiones/Operaciones/Aritmetica');
    const primitivo = require('../Interprete/Expresiones/Primitivo');

    const writeline = require('../Interprete/Instrucciones/WriteLine')
    const declaracion = require('../Interprete/Instrucciones/Declaracion')
    const ast = require('../Interprete/Ast/Ast')
    const tipo = require('../Interprete/TablaSimbolos/Tipo')
    const identificador = require('../Interprete/Expresiones/Identificador')
    const logica = require('../Interprete/Expresiones/Operaciones/Logica')
    const relacional=require('../Interprete/Expresiones/Operaciones/Relacional')
    const sentenciaIf= require('../Interprete/Instrucciones/Sentenciaif')
    const sentswitch= require('../Interprete/Instrucciones/Sentenciaswitch/Sentenciaswitch')
    const casos=require('../Interprete/Instrucciones/Sentenciaswitch/Casos')
    const detener= require('../Interprete/Instrucciones/SentBreak')
    const sentwhile=require('../Interprete/Instrucciones/Sentenciawhile')
    const incre_decre= require('../Interprete/Expresiones/Operaciones/incre_decremento')
    const asignacion= require('../Interprete/Instrucciones/Asignacion')
    const sentfor = require('../Interprete/Instrucciones/Sentenciafor')
    const llamads=require('../Interprete/Instrucciones/Llamadas')
    const param= require('../Interprete/Instrucciones/parametro')
    const func= require('../Interprete/Instrucciones/funciones')
    const sreturn= require('../Interprete/Instrucciones/sent_transfer/Sent_return')
    const simbolo = require('../Interprete/TablaSimbolos/Simbolos')
    const continuar=require('../Interprete/Instrucciones/sent_transfer/Sentcontinue')
    const casteo=require('../Interprete/Expresiones/Casteo')
    const nativas=require('../Interprete/Expresiones/Nativas/Nativas')
    const ternario=require('../Interprete/Expresiones/Ternario')
    const vector= require('../Interprete/Instrucciones/Decla_Vector')
    const access_vector=require('../Interprete/Expresiones/Accesovector')
    const get_lista= require('../Interprete/Expresiones/Get_lis')
    const set_vector = require('../Interprete/Instrucciones/Set_vector')
    const declalista = require('../Interprete/Instrucciones/Decla_lista')
    const apendlist =  require('../Interprete/Instrucciones/Append_list')
    const set_lista = require('../Interprete/Instrucciones/Set_list')
    const errores = require('../Interprete/Ast/Errores')
    const startwith= require('../Interprete/Instrucciones/Start_with')

%}

/* PRECEDENCIA */
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'TERNARIO' 
%left 'IGUALIGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%left 'POT' 
%right 'MOD'
%right UMINUS
%right CAST

%start inicio

%% /* language grammar */

inicio : instrucciones EOF  { $$ = new ast.default($1); return $$ }
       ;

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$ = new Array(); $$.push($1); }
            ;

instruccion : declaracion                   { $$ = $1; }
            | ID INCRE  PYC                 { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'+',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
            | ID DECRE  PYC                 { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'-',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
            | asignaciones PYC              { $$ = $1; }
            | vectores                      { $$ = $1; }
            | listas                        { $$ = $1; }
            | sentenciaif                   { $$ = $1; }
            | sentenciaswitch               { $$ = $1; }
            | sentenciawhile                { $$ = $1; }
            | sentenciadowhile              { $$ = $1; }
            | sentenciafor                  { $$ = $1; }
            | sentbreak                     { $$ = $1; }
            | sentcontinue                  { $$ = $1; }
            | sentreturn                    { $$ = $1; }
            | funciones                     { $$ = $1; }
            | metodos                       { $$ = $1; }
            | llamadas PYC                  { $$ = $1; }
            | startwith                     { $$ = $1; }
            | writeline                     { $$ = $1; }
            | declalista                    { $$ = $1; }
            | lista_append                  { $$ = $1; }
            | set_lista                     { $$ = $1; }
            | decla_vector                  { $$ = $1; }
            | set_vector                    { $$ = $1; }
            | error {console.log("Error Sintactico: "+ yytext+" linea: "+this._$.first_line + " Columna: "+this._$.first_column);
                   $$= new errores.default("sintactico","No se esperaba el caracter: "+yytext,this._$.first_line,this._$.first_column);
                    }
            ;


//INICIAN LAS INSTRUCCIONES
/* DECLARACIONES Y ASIGNACIONES*/
declaracion : tipo lista_ids IGUAL exp PYC  { $$ = new declaracion.default($1, $2, $4,(((@2.first_line)-1)/2)+1,@2.first_column); console.log("se leyo en la linea"); console.log((((@2.first_line)-1)/2)+1);}  
            | tipo lista_ids PYC         { $$ = new declaracion.default($1, $2, null,(((@2.first_line)-1)/2)+1,@2.first_column);}
            ;

tipo : INT     {$$ = new tipo.default("ENTERO"); }
    | DOUBLE    {$$ = new tipo.default("DOBLE"); }
    | STRING    {$$ = new tipo.default("CADENA"); }
    | CHAR      {$$ = new tipo.default("CARACTER"); }
    | BOOLEAN   {$$ = new tipo.default("BOOLEANO"); }
    ;


lista_ids : lista_ids COMA ID   { $$ = $1; $$.push($3); }
        | ID                    { $$ = new Array(); $$.push($1); }
        ;

asignaciones : ID IGUAL exp  { $$ = new asignacion.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}
    ;

// INSTRUCIONES DE LISTAS
declalista : RDYNAMICLIST MENORQUE tipo MAYORQUE ID IGUAL RNEW RDYNAMICLIST MENORQUE tipo MAYORQUE PYC { $$= new declalista.default($3,$5,((@1.first_line-1)/2)+1,@1.first_column);}
        | RDYNAMICLIST MENORQUE tipo MAYORQUE ID IGUAL RTOCHARARRAY PARA exp PARC PYC  { $$= new declalista.default($3,$5,((@1.first_line-1)/2)+1,@1.first_column,$9);}
    ;

lista_append: RAPPEND PARA ID COMA exp PARC PYC {$$ = new  apendlist.default($3,$5,((@1.first_line-1)/2)+1,@1.first_column);}
    ;

get_lista : RGETVALUE PARA ID COMA exp PARC  {$$= new  get_lista.default($3,$5,((@1.first_line-1)/2)+1,@1.first_column);}
    ;

set_lista : RSETVALUE PARA ID COMA exp COMA exp PARC PYC {$$ = new set_lista.default($3,$5,$7,((@1.first_line-1)/2)+1,@1.first_column)}
    ;

// INSTRUCCIONES DE VECTORES
decla_vector: tipo ID CORA CORC IGUAL RNEW tipo CORA exp CORC PYC  {$$= new vector.default(1,$1,$2,$9,((@1.first_line-1)/2)+1,@1.first_column);}
            | tipo ID CORA CORC IGUAL LLAVEA lista_exp LLAVEC PYC   {$$= new vector.default(2,$1,$2,$7,((@1.first_line-1)/2)+1,@1.first_column);}
            ;
get_vector: ID CORA exp CORC {$$ = new access_vector.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}  // este va a exp
         ;

set_vector: ID CORA exp CORC IGUAL exp PYC {$$ = new set_vector.default($1,$3,$6,((@1.first_line-1)/2)+1,@1.first_column);}
         ;

//INSTRUCCIONES SENTENCIA IF
sentenciaif : RIF PARA exp  PARC LLAVEA instrucciones LLAVEC  { $$ = new sentenciaIf.default($3, $6, [], ((@1.first_line-1)/2)+1, @3.last_column); } 
    | RIF PARA exp  PARC LLAVEA instrucciones LLAVEC RELSE LLAVEA instrucciones LLAVEC { $$ = new sentenciaIf.default($3, $6, $10, ((@1.first_line-1)/2)+1, @3.last_column); }
    | RIF PARA exp  PARC LLAVEA instrucciones LLAVEC RELSE sentenciaif { $$ = new sentenciaIf.default($3, $6, [$9], ((@1.first_line-1)/2)+1, @3.last_column); }
    ;
// SENTENCIA SWITCH-CASE
sentenciaswitch : RSWITCH PARA exp PARC LLAVEA casos LLAVEC { $$ = new sentswitch.default($3,$6,((@1.first_line-1)/2)+1,@3.first_column); }
    ;

casos : casos  caso { $$ = $1; $$.push($2); }
    | caso  { $$ = new Array(); $$.push($1); }
    ;

caso : RCASE exp RDOSPTS  instrucciones {$$ = new casos.default($2,$4,false,(((@2.first_line)-1)/2)+1,@2.first_column);}
    | RDEFAULT RDOSPTS  instrucciones   {$$ = new casos.default($1,$3,true,(((@2.first_line)-1)/2)+1,@2.first_column);}
    ;

//SENTENCIA WHILE 

sentenciawhile : RWHILE PARA exp PARC  LLAVEA instrucciones LLAVEC {$$ = new sentwhile.default($3,$6,((@1.first_line-1)/2)+1,@3.first_column);}

    ;
//SENTENCIAS RETURN Y CONTINUE BREAK
sentbreak: RBREAK PYC {$$ = new detener.default();}
    ;
sentcontinue: RCONTINUE PYC { $$ = new continuar.default();}
    ;

sentreturn: RRETURN exp PYC {$$= new sreturn.default($2); }
    | RRETURN PYC   {$$= new sreturn.default(null); }
    ;
// INSTRUCCION WRITELINE

writeline : WRITELINE PARA exp PARC PYC { $$ = new writeline.default($3,@1.first_line,@3.first_column);  console.log("AAAAAAAAAAA writeline en linea: "+((((@1.first_line-1)/2)+1)/2)+" y columna: "+@3.first_column);}
        ;
//SENTENCIA FOR
sentenciafor : RFOR PARA declaracion_for PYC exp PYC contador_for PARC LLAVEA instrucciones LLAVEC { $$ = new sentfor.default($3, $5, $7, $10,((@1.first_line-1)/2)+1, @1.last_column); }
        ;

declaracion_for: tipo ID IGUAL exp     { $$ = new declaracion.default($1, $2, $4,(((@2.first_line)-1)/2)+1,@2.first_column); }
        | ID IGUAL exp                 { $$ = new asignacion.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}
        ;

contador_for: ID INCRE          {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'+',new primitivo.default(1, 'ENTERO',((@1.first_line-1)/2)+1, @1.first_column),((@1.first_line-1)/2)+1,@1.first_column,false));}
        | ID DECRE              {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'-',new primitivo.default(1, 'ENTERO', ((@1.first_line-1)/2)+1, @1.first_column),((@1.first_line-1)/2)+1,@1.first_column,false));}
        | ID IGUAL exp          {$$ = new asignacion.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}
        ;

        //SENTENCIA DO WHILE
sentenciadowhile  : RDO LLAVEA instrucciones LLAVEC RWHILE PARA exp PARC PYC  {$$ = new sentwhile.default($7,$3,((@1.first_line-1)/2)+1,@3.first_column,true);}
    ;

//FUNCIONES METODOS Y LLAMADAS

funciones : tipo ID PARA lista_params PARC LLAVEA instrucciones LLAVEC { $$ = new func.default(2, $1, $2,$4,false, $7,  ((@1.first_line-1)/2)+1, @1.last_column); }
        | tipo ID PARA  PARC LLAVEA instrucciones LLAVEC               { $$ = new func.default(2, $1, $2,[],false, $6,  ((@1.first_line-1)/2)+1, @1.last_column); }
        | RVOID ID PARA lista_params PARC LLAVEA instrucciones LLAVEC   {$$ = new func.default(3, $1, $2,$4,true, $7,  ((@1.first_line-1)/2)+1, @1.last_column); }
        | RVOID ID PARA  PARC LLAVEA instrucciones LLAVEC               {$$ = new func.default(3, $1, $2,[],true, $6,  ((@1.first_line-1)/2)+1, @1.last_column); }
        ;

lista_params : lista_params COMA tipo ID                { $$ = $1; $$.push(new simbolo.default(6, $3, $4, null)); }
             | tipo ID                                  { $$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null)); }
             | lista_params COMA RDYNAMICLIST MENORQUE tipo MAYORQUE ID { $$ = $1; $$.push(new simbolo.default(5, $5, $7, null)); }
             | RDYNAMICLIST MENORQUE tipo MAYORQUE ID                   { $$ = new Array(); $$.push(new simbolo.default(5, $3, $5, null)); }
             ;


llamadas : ID PARA lista_exp PARC {$$ = new llamads.default($1, $3,((@1.first_line-1)/2)+1, @1.last_column ); }
        | ID PARA  PARC           {$$ = new llamads.default($1, [] ,((@1.first_line-1)/2)+1, @1.last_column ); }
        ; 

lista_exp: lista_exp COMA exp { $$ = $1; $$.push($3); }
    | exp { $$ = new Array(); $$.push($1); }
    ;

// EXPRESIONES 
exp : exp MAS exp        { $$ = new aritmetica.default($1, '+',$3,((@1.first_line-1)/2)+1,@1.first_column,false); console.log("expresion E+E en la linea: "+ @1.first_line+" y lascolumn: "+@1.last_column);}
    | exp MENOS exp      { $$ = new aritmetica.default($1, '-',$3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MULTI exp      { $$ = new aritmetica.default($1, '*', $3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp DIV exp        { $$ = new aritmetica.default($1, '/', $3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp POT exp        { $$ = new aritmetica.default($1, '^', $3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MOD exp        { $$ = new aritmetica.default($1, '%', $3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MAYORIGUAL exp { $$ = new relacional.default($1, '>=',$3,((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MAYORQUE exp   { $$ = new relacional.default($1, '>',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MENORIGUAL exp { $$ = new relacional.default($1, '<=',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp MENORQUE exp   { $$ = new relacional.default($1, '<',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp IGUALIGUAL exp { $$ = new relacional.default($1, '==',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp DIFERENTE exp  { $$ = new relacional.default($1, '!=',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp AND exp        { $$ = new logica.default($1, '&&',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | exp OR exp         { $$ = new logica.default($1, '||',$3, ((@1.first_line-1)/2)+1, @1.first_column,false); }
    | NOT exp          { $$ = new logica.default($2, '!',null, ((@1.first_line-1)/2)+1,$1.first_column,true); }
    | MENOS exp %prec UMINUS    { $$ = new aritmetica.default($2, 'UNARIO', null, ((@1.first_line-1)/2)+1, @1.first_column,true); }
    | PARA exp PARC       { $$ = $2; }
    | DECIMAL           { $$ = new primitivo.default(Number($1), 'DOBLE', ((@1.first_line-1)/2)+1, @1.first_column); }
    | ENTERO            { $$ = new primitivo.default(Number($1), 'ENTERO', ((@1.first_line-1)/2)+1, @1.first_column); }
    | ID                { $$ = new identificador.default($1, ((@1.first_line-1)/2)+1, @1.first_column); }
    | CADENA            { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CADENA', ((@1.first_line-1)/2)+1, @1.first_column); }
    | CARACTER          { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CARACTER', @1.first_line, @1.first_column); }
    | TRUE              { $$ = new primitivo.default(true, 'BOOLEANO', ((@1.first_line-1)/2)+1, @1.first_column); }
    | FALSE             { $$ = new primitivo.default(false, 'BOOLEANO', ((@1.first_line-1)/2)+1, @1.first_column); }
    | DOBLECOMILLAS     { $1 = ""; $$ = new primitivo.default($1, 'CADENA', ((@1.first_line-1)/2)+1, @1.first_column); }
    | PARA tipo PARC exp %prec CAST {$$ = new casteo.default($2,$4,@4.first_line,@4.first_column);}   
    | ID INCRE          {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'+',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}  //{$$ = new incre_decre.default('++',$1,@1.first_line,@1.first_column);}
    | ID DECRE          {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'-',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}//{$$ = new incre_decre.default('--',$1,@1.first_line,@1.first_column);}
    | llamadas          {$$=$1;}
    | RTOLOWER PARA exp PARC {$$ = new nativas.default("tolower",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RTOUPPER PARA exp PARC {$$ = new nativas.default("toupper",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RLENGTH PARA exp PARC  {$$ = new nativas.default("length",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RTRUNCATE PARA exp PARC{$$ = new nativas.default("truncate",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RROUND PARA exp PARC   {$$ = new nativas.default("round",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RTYPEOF PARA exp PARC  {$$ = new nativas.default("typeof",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RTOSTRING PARA exp PARC{$$ = new nativas.default("tostring",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | RTOCHARARRAY PARA exp PARC{$$ = new nativas.default("tochararray",$3,((@1.first_line-1)/2)+1,@3.first_column);}
    | get_lista              { $$= $1; }
    | get_vector             { $$=$1;   }
    | exp TERNARIO exp RDOSPTS exp {$$= new ternario.default($1,$3,$5,((@1.first_line-1)/2)+1,@1.first_column);}
    ;

startwith: RSTART RWITH llamadas PYC {$$= new startwith.default($3,@1.first_line,@1.first_column);}
        ;
