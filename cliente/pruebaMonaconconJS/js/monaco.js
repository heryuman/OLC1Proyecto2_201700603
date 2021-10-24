let editor
require.config({ paths: { 'vs': 'package/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor  = monaco.editor.create(document.getElementById('container'), {
        value: [
            
        ].join('\n'),
        language: 'python',
        theme: "vs-dark"
    });

   /*function saveI() 
    {
        getVal = editor.getValue()
        // get the value of the data
        console.log(getVal)
        sendData(getVal)
    }
    document.getElementById('container').onclick = saveI;*/

});

function sendData(){

    
    var getVal = editor.getValue()
    const nuevaCompilacion={

        input: getVal
    }
    console.log(JSON.stringify(nuevaCompilacion))

    fetch('http://localhost:3000/api/ejecutar',{
        method: 'POST',
        body:JSON.stringify(nuevaCompilacion),
        headers:{
        'Content-Type':'application/json'
        }

    }).then(res=>res.json()).then(data=>{console.log(data.consola)
    
        document.getElementById('consolas').value=data.consola;
    
    })

}

// Themes: vs-dark , hc-black
// language: text/html , javascript