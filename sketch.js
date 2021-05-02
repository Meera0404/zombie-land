var redhat, enemy;
var redhatimg ,enemyimg;
var background, backgroundimg;
var invisibleg;
var arrow,shovel,sword,axe,obstacle,obstacleGroup;
var score = 0;
var gameState = "play";
var fallimg;
var dead;


function preload(){
backgroundimg = loadImage("images/backg.jpeg");
redhatimg     = loadAnimation("images/run1.png","images/run2.png");
enemyimg      = loadAnimation("images/attack(1).png","images/attack(2).png","images/attack(3).png");
arrow         = loadImage("images/arrow.png");
shovel        = loadImage("images/shovel.png");
axe           = loadImage("images/axe.png");
sword         = loadImage("images/sword.png");
fallimg       = loadAnimation("images/slide.png");
dead          = loadAnimation("images/dead.png");


}


function setup() {
  createCanvas(windowWidth,windowHeight);

  background=createSprite(0,0,800,400);
  background.addImage(backgroundimg);
  background.scale=2.5;

  redhat = createSprite(20,150,10,10);
  redhat.addAnimation("jump",redhatimg);
  redhat.addAnimation("fall",fallimg);
  redhat.scale = 0.4;
  redhat.velocityX=1;

  enemy  = createSprite(width-120,height-120,20,20);
  enemy.addAnimation("attack",enemyimg);
  enemy.addAnimation("dead",dead);
  enemy.scale = 0.4;
  

  invisibleg = createSprite(20,height,width,10);
  invisibleg.visible = false;

  obstacleGroup = new Group();

  //redhat.debug = true;
  //obstacleGroup.debug = true;
  
  enemy.collide(invisibleg);

 // enemy.debug = true;
  enemy.setCollider("circle",0,0,40);
  
}

function draw() {

  console.log(enemy.y);
  
  

 // background.velocityX = -3;
 if(gameState === "play"){
  score = score+Math.round(frameCount/150);
  if (background.x < 0){
    background.x = background.width/2;
  }


  if(keyDown("space")){
    redhat.velocityY = -6;
  }
  redhat.velocityY += 1;
  redhat.collide(invisibleg);
  if(frameCount%150 === 0){
  obstacles();
}
//createEdgeSprites();
//redhat.bounceOff(rightEdge)
if(obstacleGroup.isTouching(redhat)){
  gameState = "end";
  
}
 }

 

  drawSprites();
  if(gameState === "end"){
    stroke("red");
    textSize(40);
    text("UFF!!,YOU FAILED", width/3,height/2);
     obstacleGroup.setLifetimeEach(-1);
     redhat.changeAnimation("fall",fallimg);
     obstacleGroup.setVelocityXEach(0); 
     redhat.y = height-100;  
     redhat.velocityY= 0;
     redhat.velocityX=0;

     enemy.changeAnimation("dead",dead);
     enemy.y = height-100;

     obstacleGroup.destroyEach();
     
   // score=0;
   }

  stroke("yellow");

  textSize(30);
  text("Survival Time:"+score,width-350,40);

  
}

function obstacles(){
  obstacle = createSprite(700,150,20,20);
 // obstacle.velocityX = -2;
 var rand = Math.round(random(1,4));

 switch(rand){
   case 1 : obstacle.addImage(arrow);
   obstacle.y = height-105;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -3;
   obstacle.lifetime = 350;
   break;

   case 2 : obstacle.addImage(axe);
   obstacle.y = height-103;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -4;
   obstacle.lifetime = 175;

   break;

   case 3 : obstacle.addImage(sword);
   obstacle.y = height-100;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -3;
   obstacle.lifetime  = 234 ;

   break;

   case 4 : obstacle.addImage(shovel);
   obstacle.y = height-108;
   enemy.y    = obstacle.y;
   obstacle.velocityX = -3;
   obstacle.lifetime = 350;

   break;
   default:break;
 }

  obstacle.scale = 0.8;

  obstacleGroup.add(obstacle);

  obstacle.setCollider("circle",0,0,40);
  //obstacle.debug = true;     





}