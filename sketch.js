let capture;
let bodypose;
let poses=[]
let connections;
let transformer_img;

function preload() {
    
    bodypose = ml5.bodyPose(modelLoaded);
  }

function setup(){
    
    createCanvas(800,500);
    capture=createCapture(VIDEO);
    capture.hide()
    
    bodypose.detectStart(capture,gotPoses)
    connections=bodypose.getSkeleton()
    console.log(connections)
    transformer_img=loadImage('optimus1.png');

}

function gotPoses(result){
    poses=result
    console.log(poses)
    
    
    
}
function modelLoaded(){
    console.log('Model loaded successfully')


}
function draw(){
    image(capture,0,0,800,500);
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < connections.length; j++) {
          let pointAIndex = connections[j][0];
          let pointBIndex = connections[j][1];
          let pointA = pose.keypoints[pointAIndex];
          let pointB = pose.keypoints[pointBIndex];
          
          if (pointA.score > 0.1 && pointB.score > 0.1) {
            stroke(0, 255, 0);
            strokeWeight(2);
            line(pointA.x+85, pointA.y, pointB.x+85, pointB.y);
          }
        }
      }
    
   
      
      for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < pose.keypoints.length; j++) {
          let keypoint = pose.keypoints[j];
          
    
            if (keypoint.score > 0.1){

                fill(255, 0, 0);
            
                ellipse(keypoint.x+90, keypoint.y, 10);
                image(transformer_img,poses[0].nose.x-20,poses[0].nose.y-90,200,200)
            }
            
          
        }
      }
      
}