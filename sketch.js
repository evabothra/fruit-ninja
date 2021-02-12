var PLAY=1;
var END=0;
var gameState=1;

var sword;
var score=0;
var fruit;
var r;
var monster;
var fruitGroup;
var enemyGroup;

function preload()
{
 swordImage=loadImage("sword.png") ;
 fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monsterImage=loadImage("alien1.png");
  monsterImage2=loadImage("alien2.png");
  gameOverImage=loadImage("gameover.png");
  goSound=loadSound("gameover.mp3");
  knifesound=loadSound("j.mp3");
  
}

function setup()
{
  createCanvas(700,700);
  //creating sword
  sword=createSprite(40,200,0,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  
  
  
}

function draw(){
  background("grey");
   text("Score: "+ score, 500,50);
   if(gameState===PLAY){
     fruit();
     enemy();

   }
  
  if(gameState === END){
  sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  
  if (sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score=score+2;
    knifesound.play();
  }
  if (sword.isTouching(enemyGroup)){
    goSound.play();
    gameState=END;
  }
  
  
  drawSprites();
  
  
}



function fruit(){
  if(World.frameCount%80===0){
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    } else if(r==3){
      fruit.addImage(fruit3);
    } else if(r==4){
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-(10+(score/8));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
  }
    position=Math.round(random(1,2));
  
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    enemyGroup.add(monster);
    
  }
}









