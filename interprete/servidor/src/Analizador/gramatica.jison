
/* Ejemplo para la gramatica del interprete */

/* Definicion lexica */
%lex
%options case-insensitive 

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
.                     return 'ERROR'

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


%}

/* PRECEDENCIA */
%left 'OR'
%left 'AND'
%right 'NOT'
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
            | ID INCRE  PYC                 { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.first_column),'+',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
            | ID DECRE  PYC                 { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.first_column),'-',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
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
            ;

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


vectores : declavector
    | accesvector
    | modvector
    ;
    
declavector :tipo ID CORCHA CORCHC IGUAL RNEW tipo CORCHA exp CORCHC PYC
    |tipo ID CORCHA CORCHC IGUAL LLAVEA lista_valores LLAVEC PYC
    ;

accesvector : ID CORCHA exp CORCHC
    ;

modvector : ID CORCHA exp CORCHC IGUAL exp PYC
    ;

listas  : declalista
    | insertar_lista
    | obtener_lista
    | modlista
    ;

declalista : RDYNAMICLIST MENQUE tipo MAYQUE ID IGUAL RNEW RDYNAMICLIST MENQUE tipo MAYQUE PYC
        | RDYNAMICLIST MENQUE tipo MAYQUE ID IGUAL tochararray
    ;

insertar_lista : RAPPEND PARA ID COMA exp PARC PYC
    ;

obtener_lista : RGETVALUE PARA ID COMA exp PARC // posiblemente se agrega a las expresiones 
    ;

modlista : RSETVALUE PARA ID COMA exp COMA exp PARC PYC
    ;

sentenciaif : RIF PARA exp  PARC LLAVEA instrucciones LLAVEC  { $$ = new sentenciaIf.default($3, $6, [], @3.first_line, @3.last_column); } 
    | RIF PARA exp  PARC LLAVEA instrucciones LLAVEC RELSE LLAVEA instrucciones LLAVEC { $$ = new sentenciaIf.default($3, $6, $10, @3.first_line, @3.last_column); }
    | RIF PARA exp  PARC LLAVEA instrucciones LLAVEC RELSE sentenciaif { $$ = new sentenciaIf.default($3, $6, [$9], @3.first_line, @3.last_column); }
    ;

sentenciaswitch : RSWITCH PARA exp PARC LLAVEA casos LLAVEC { $$ = new sentswitch.default($3,$6,@3.first_line,@3.first_column); }
    ;

casos : casos  caso { $$ = $1; $$.push($2); }
    | caso  { $$ = new Array(); $$.push($1); }
    ;

caso : RCASE exp RDOSPTS  instrucciones {$$ = new casos.default($2,$4,false,(((@2.first_line)-1)/2)+1,@2.first_column);}
    | RDEFAULT RDOSPTS  instrucciones   {$$ = new casos.default($1,$3,true,(((@2.first_line)-1)/2)+1,@2.first_column);}
    ;

sentenciawhile : RWHILE PARA exp PARC  LLAVEA instrucciones LLAVEC {$$ = new sentwhile.default($3,$6,@3.first_line,@3.first_column);}
    ;
//SENTENCIAS RETURN Y CONTINUE BREAK
sentbreak: RBREAK PYC {$$ = new detener.default();}
    ;
sentcontinue: RCONTINUE PYC { $$ = new continuar.default();}
    ;

sentreturn: RRETURN exp PYC {$$= new sreturn.default($2); }
    | RRETURN PYC   {$$= new sreturn.default(null); }
    ;


writeline : WRITELINE PARA exp PARC PYC { $$ = new writeline.default($3,((@3.first_line-1)/2)+1,@3.first_column);  console.log("AAAAAAAAAAA writeline en linea: "+((@3.first_line)/2)+" y columna: "+@3.first_column);}
        ;

sentenciafor : RFOR PARA declaracion_for PYC exp PYC contador_for PARC LLAVEA instrucciones LLAVEC { $$ = new sentfor.default($3, $5, $7, $10, @1.first_line, @1.last_column); }
        ;

declaracion_for: tipo ID IGUAL exp     { $$ = new declaracion.default($1, $2, $4,(((@2.first_line)-1)/2)+1,@2.first_column); }
        | ID IGUAL exp                 { $$ = new asignacion.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}
        ;

contador_for: ID INCRE          {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'+',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
        | ID DECRE              {$$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,((@1.first_line-1)/2)+1,@1.first_column),'-',new primitivo.default(1, 'ENTERO', @1.first_line, @1.first_column),@1.first_line,@1.first_column,false));}
        | ID IGUAL exp          {$$ = new asignacion.default($1,$3,((@1.first_line-1)/2)+1,@1.first_column);}
        ;
sentenciadowhile  : RDO LLAVEA instrucciones LLAVEC RWHILE PARA exp PARC PYC  {$$ = new sentwhile.default($7,$3,@3.first_line,@3.first_column);}
    ;

//FUNCIONES METODOS Y LLAMADAS

funciones : tipo ID PARA lista_params PARC LLAVEA instrucciones LLAVEC { $$ = new func.default(2, $1, $2,$4,false, $7,  @1.first_line, @1.last_column); }
        | tipo ID PARA  PARC LLAVEA instrucciones LLAVEC               { $$ = new func.default(2, $1, $2,[],false, $6,  @1.first_line, @1.last_column); }
        | RVOID ID PARA lista_params PARC LLAVEA instrucciones LLAVEC   {$$ = new func.default(3, $1, $2,$4,true, $7,  @1.first_line, @1.last_column); }
        | RVOID ID PARA  PARC LLAVEA instrucciones LLAVEC               {$$ = new func.default(3, $1, $2,[],true, $6,  @1.first_line, @1.last_column); }
        ;

lista_params : lista_params COMA tipo ID          { $$ = $1; $$.push(new simbolo.default(6, $3, $4, null)); }
             | tipo ID                           { $$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null)); }
             ;


llamadas : ID PARA lista_exp PARC {$$ = new llamads.default($1, $3,@1.first_line, @1.last_column ); }
        | ID PARA  PARC           {$$ = new llamads.default($1, [] ,@1.first_line, @1.last_column ); }
        ; 

lista_exp: lista_exp COMA exp { $$ = $1; $$.push($3); }
    | exp { $$ = new Array(); $$.push($1); }
    ;

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
    ;

