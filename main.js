function setup(){
    canvas = createCanvas(400,400);
    canvas.position(400,300);
}
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function draw(){
    image(video,0,0,400,400);
    if(status !=""){
        ObjectDetector.detect(video, gotresults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected: " + objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent +"%" , objects[i].x + 10 , objects[i].y + 10);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    
    }

    function gotresults(error,results){
        if (error){
            console.log(error);
        }
        else{
            console.log(results);
            objects=results;
        }
    }
function start(){
    ObjectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
status="";
video="";
objects=[];
function modelloaded(){
    console.log("modelloaded");
    status="true";
    video.loop();
    video.speed(1);
    video.volume(0);
}