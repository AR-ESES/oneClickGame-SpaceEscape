var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg;
var bgImage;

var player, player_running,player_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  player_running = loadAnimation("boneco_baixo.png","boneco_baixo.png","boneco_baixo.png","boneco_baixo.png","boneco_baixo.png","boneco_baixo.png","boneco_baixo.png", "boneco_baixo.png");
  playercollided = loadImage("boneco_baixo.png");
  bgImage = loadImage("fundo.png")
  groundImage = loadImage("chao.png");
  
  cloudImage = loadImage("drone.png");
  
  obstacle1 = loadImage("espinho_baixo.png");
  obstacle2 = loadImage("espinho_baixo.png");
  obstacle3 = loadImage("espinho_baixo.png");
  obstacle4 = loadImage("espinho_baixo.png");
  obstacle5 = loadImage("espinho_baixo.png");
  obstacle6 = loadImage("espinho_baixo.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("game_over.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1350, 720);

  var message = "This is a message";
 console.log(message)
   bg = createSprite(700,130,600,200);
  player = createSprite(50,160,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("collided", player_collided);
  bg.addImage("bg",bgImage)
  bg.scale = 1.2

  player.scale = 0.9;
  
  ground = createSprite(700,300);
  ground.addImage("chao", groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(530,180);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(530,200);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1.0;
  restart.scale = 1.0;
  
  invisibleGround = createSprite(200,550,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  player.setCollider("rectangle",0,0,20,100);
  
  score = 0;
  
}

function draw() {
  
  background("white");
  fill("red")
  text("Score: "+ score, 500,10);

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -8 ;
    score = score + Math.round(frameRate()/30);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    player.depth = ground.depth+1
    
    if(keyDown("space")&& player.y >= 130) {
        player.velocityY = -8;
        jumpSound.play();
    }
    
    player.velocityY =player.velocityY + 0.8
  
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(player)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      player.changeAnimation("collided", playercollided);
    
     player.x = player.x+5;
     player.y = player.y + 5
  
     
      ground.velocityX = 0;
      player.velocityY = 0
      
     
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  player.collide(invisibleGround);
  
  if(mousePressedOver(restart)&&gameState === END) {
      gameState = PLAY
     obstaclesGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);
    score = 0;
    player.x = 50;
    player.y = 160;
     player.changeAnimation("running", player_running);

    }


  drawSprites();
}

function reset(){
  

}


function spawnObstacles(){
 if (frameCount % 50 === 0){
   var obstacle = createSprite(1350,550,10,40);
   obstacle.velocityX = -8;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 1.0;
    obstacle.lifetime = 300;
   obstacle.setCollider("rectangle",0,0,20,30)
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1350,120,40,10);
    cloud.y = Math.round(random(100,170));
    cloud.addImage(cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

