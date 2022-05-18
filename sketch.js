var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var BONECO_BAIXO;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
     // preload() runs once
    
  ground_image=loadImage("contents/fundo.png");
  BONECO_BAIXO    girl_running=loadAnimation("contents/boneco_baixo.png");
  obstacle1=loadImage("contents/espinho_baixo.png");
  jumpSound = loadSound("contents/jump.mp3")
  dieSound = loadSound("contents/die.mp3")
  checkPointSound = loadSound("contents/checkPoint.mp3")
  gameOverImage=loadImage("contents/gameOver1.png");
  restartImage=loadImage("contents/restart1.png");
  girl_collided=loadImage("contents/Dead (30).png");
  BONECO_BAIXO girlImage=loadImage("contents/boneco_baixo.png");
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   girl=createSprite(300,420,600,10);
  BONECO_BAIXO.addAnimation("boneco_baixo",BONECO_BAIXO);
  BONECO_BAIXO.addImage("boneco_baixo",BONECO_BAIXO);
  BONECO_BAIXO.scale=0.2;
 // girl.velocityX=2;
  BONECO_BAIXO.debug=false;
  BONECO_BAIXO.setCollider("rectangle",0,0,BONECO_BAIXO.width,BONECO_BAIXO.height)
  
  
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    //  zombie.y=girl.y;
   score = score + Math.round(getFrameRate()/60);
 

 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& girl.y >= 220)) {
   girl.velocityY = -12;
    jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     BONECO_BAIXO.velocityY = 0
    BONECO_BAIXO.changeImage("boneco_baixo",BONECO_BAIXO);
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
BONECO_BAIXO.changeAnimation("boneco_baixo",BONECO_BAIXO);
  obstaclesGroup.destroyEach();
  score=0;
  
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

