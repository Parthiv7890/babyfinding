let objects = []
let status = ""
let label = ""
let confidence = 0
function setup(){
    canvas = createCanvas(600,420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(600,420)
    video.hide()
    objDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status") = "Status : Detecting Objects"
}
function preload(){

}
function draw(){
    image(video,0,0,600,420)
    if(status != ""){
        objDetector.detect(video,gotResults)
        for(i=0;i<objects.length;i++){
            document.getElementById("status") = "Status : Objects Detected"
            label = objects[i].label
            confidence = floor(objects[i].confidence * 100)
            if(label == 'person'){
                document.getElementById("baby").innerHTML = "Baby Found"
            }else{
                document.getElementById("baby").innerHTML = "Baby not Found"
            }
            fill(255,0,0)
            text(label + " "+confidencePercent+"% ",objects[i].x+5,objects[i].y+15)
            noFill()
            stroke(255,0,0)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function modelLoaded(){
    status ="true"
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }
    objects=results
}