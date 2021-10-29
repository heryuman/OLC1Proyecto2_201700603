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

function readSingleFile(e) {



    console.log("en ReadSinglefile");
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      console.log(contents);
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    //editor.setValue(contents);
    
  }
  
  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);
