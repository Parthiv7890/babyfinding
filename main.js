let objects = []
let status1 = ""
let label = ""
let confidence = 0
let sound
function setup(){
    canvas = createCanvas(600,420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(600,420)
    video.hide()
    objDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}
function preload(){
    song = loadSound('./christmas_bells.mp3')
}
function draw(){
    image(video,0,0,600,420)
    if(status1 != ""){
        objDetector.detect(video,gotResults)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected"
            label = objects[i].label
            confidence = floor(objects[i].confidence * 100)
            if(label == 'person'){
                document.getElementById("baby").innerHTML = "Baby Found"
                song.stop()
            }else{
                document.getElementById("baby").innerHTML = "Baby not Found"
                song.play()
            }
            fill(255,0,0)
            text(label + " "+confidence+"% ",objects[i].x+5,objects[i].y+15)
            noFill()
            stroke(255,0,0)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function modelLoaded(){
    status1 ="true"
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }
    objects=results
}