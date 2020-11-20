var PLAY = 1;

var END = 0;

var gameState = PLAY;

var sword, swordImage;

var score = 0;
    
var fruitGroup, fruitImage1, fruitImage2, fruitImage3, fruitImage4;

var enemyGroup, enemyImage;

var gameOver, gameOverImage;

var loseSound, sliceSound;

function preload(){
  
  swordImage = loadImage("sword.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");
  loseSound = loadSound("gameover.mp3");
  sliceSound = loadSound("knifeSwooshSound.mp3");
  
}

function setup() {
  createCanvas(400, 400);

  sword = createSprite(200, 200, 20, 20);
  sword.addImage("slice", swordImage);
  sword.scale = 0.37;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw(){
  background(52, 174, 235);
  
  fill("black");
  text("Fruits Sliced: " + score, 156, 30);
      
      sword.y = World.mouseY;
      sword.x = World.mouseX;
  
  if (gameState === END){
    
      gameOver = createSprite(200,200,20,20)
      gameOver.addImage("over", gameOverImage);
    
      fruitGroup.destroyEach();
      
      }
  
  fruits();
  enemies();
  drawSprites();
}

function fruits(){
  
  if (World.frameCount%30 === 0 && gameState === PLAY ){
    
    var fruit = createSprite(200, 200, 20, 20)
    
    r = Math.round(random(1, 2));
    if(r===1){
      fruit.addImage(fruitImage1);
      fruit.scale = 0.16;
       } else if (r===2){
       fruit.addImage(fruitImage2);
       fruit.scale = 0.16;
       }
    
    fruit.y = Math.round(random(50, 340));
    
    
    v = Math.round(random(1, 2));
    if(v===1 && score < 5){
    fruit.velocityX = Math.round(random(-6, -3));
  } else if(v===2 && score < 5){
    fruit.velocityX = Math.round(random(3, 6));
  }
    
    l = Math.round(random(1, 2));
    if(l===1 && score > 4){
    fruit.velocityX = Math.round(random(-8, -6));
  } else if(l===2 && score > 4){
    fruit.velocityX = Math.round(random(6, 8));
  }
    
    
    fruit.setLifetime = 100;
    
    fruit.setCollider("circle",0,0,100);

    //fruit.debug = true;
    //sword.debug = true;
    
    fruitGroup.add(fruit);
    
    if (fruitGroup.isTouching(sword)){
    
        fruitGroup.destroyEach();
        score = score+1;
        sliceSound.play();
        
        }
      
      }
  
  
  
}

function enemies(){
  
  if(World.frameCount%100 === 0 && gameState === PLAY){
    
     enemy = createSprite(200,200,20,20);
    
     enemy.addAnimation("moving", enemyImage);
    
     enemy.y = Math.round(random(50, 340));
    
    e = Math.round(random(1, 2));
    if(e===1 && score < 10){
    enemy.velocityX = Math.round(random(-8, -4));
  } else if(e===2 && score < 10){
    enemy.velocityX = Math.round(random(4, 8));
  }
    
        a = Math.round(random(1, 2));
    if(a===1 && score > 9){
    enemy.velocityX = Math.round(random(-10, -8));
  } else if(a===2 && score > 9){
    enemy.velocityX = Math.round(random(8, 10));
  }
    
    enemy.setLifetime = 100;
    
    enemyGroup.add(enemy);
        
        }
  
  if (enemyGroup.isTouching(sword)){
    
        enemyGroup.destroyEach();
        gameState = END;
        loseSound.play();
  
     }
}