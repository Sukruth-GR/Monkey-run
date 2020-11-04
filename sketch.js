var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup //restarImage,groundImage,ground
var survival_Time;
var bananaCount;





function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_Stoped=loadImage("sprite_0.png")
 // groundImage= loadImage("ground-png-1.jpg")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 
}



function setup() {
  //createCanvas(windowWidth,windowHeight)
   createCanvas(500,400)
   monkey = createSprite(50,315,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stoped", monkey_Stoped)
   monkey.scale=0.1;
  
   ground = createSprite(400,350,900,10);
   //ground.addImage(groundImage);
   //ground.scale=0.2;
   ground.velocityX=-4;
   ground.x=ground.width/2;
  
   bananaGroup = new Group();
   obstacleGroup = new Group();
  
  
 survival_Time=0;
 bananaCount=0;
}


function draw() {
  background("255");
  
  stroke("yellow");
  textSize(20);
  fill("black");

  text("Survival Time : " + survival_Time,250,50 )
  
  

    
  
     if(gameState === PLAY){
      
 //jump when the space key is pressed
   // gameState===PLAY 
       if(keyDown("space")&&  monkey.y >= 300) {
        monkey.velocityY = -17;
    }
    

       
    ground.velocityX = -(6 + survival_Time/100);
    //scoring
    survival_Time = survival_Time +                               Math.round(getFrameRate()/60);
    
       
  
      
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.6            
  
   
    if(bananaGroup.isTouching(monkey)){
       bananaCount=bananaCount+1;
      bananaGroup.destroyEach()
    } 
        
      
      if(obstacleGroup.isTouching(monkey)){
     
        gameState=END;
        
  }

     } 
    
  
  
  if(gameState===END){
    
    
     ground.velocityX = 0;
      monkey.changeAnimation("stoped",monkey_Stoped);
        monkey.velocityY=0;
     stroke("red");
       textSize(20);
       fill("black");
     text("PRESS 'R' TO RESTART",120,200);   
     
     
      //set lifetime of the game objects so that they are never       destroyed
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0); 
     
    
    if(keyDown("r")){
      
      reset();
      
    }
    
    
    
    
 
    
  }
  
  
    
    
  
  
   
  if (ground.x < 100){
       ground.x = ground.width/2;
    }

  monkey.collide(ground);
    
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
}

function spawnObstacle(){
   
   if(frameCount%250===0){
     obstacle= createSprite(550,330,100,100);
     obstacle.addImage(obstaceImage);
     obstacle.scale=0.14;
     obstacle.velocityX=-4;
     obstacle.lifetime=200;
     obstacleGroup.add(obstacle);
    
   }
  
}
function spawnBanana() {
  //write code here to spawn the banana's
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(190,300));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth =banana.depth + 1;
    
    //add each banana to the group
        bananaGroup.add(banana);
  }
}


function reset(){
 
  obstacleGroup.destroyEach();
   bananaGroup.destroyEach();
   monkey.changeAnimation("moving",monkey_running);
  survival_Time=0;
  bananaCount=0;
  
   gameState=PLAY;
}



