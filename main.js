function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function clearCanvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('doodleNet');
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }

    console.log(results);
    document.getElementById('label').innerHTML = 'etiqueta: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'confianza: ' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}