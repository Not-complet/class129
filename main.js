song = "";
leftWristY = "";
leftWristX = "";
rightWristY = "";
rightWristX = "";
scoreLeftWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function preload(){
    song = loadSound("music.mp3");
}
function draw(){
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2){
    fill("#FF0000");
    stroke("FF0000");
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(0.7);
    song.rate(1);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score: "+scoreLeftWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X: "+leftWristX+" Left Wrist Y: "+leftWristY);
        console.log("Rigt Wrist X: "+rightWristX+" Right Wrist Y:"+rightWristY);
    }
}