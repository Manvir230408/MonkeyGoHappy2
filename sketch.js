var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;

var score = 0;
var life = 3;

var ground, fakeGround;
var jungleBackgroundImage;

var play = 1,
    end = 0;
var gameState = 1;

function preload() {
  jungleBackgroundImage = loadImage("jungle.png");
  monkey_running = 
    loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png" ,"Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
    
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  monkey = createSprite(100,500);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.14;
  
  ground = createSprite(windowWidth / 2, monkey.y, windowWidth, 5);
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  if (gameState === play){
  background(jungleBackgroundImage);
    
    monkey.collide(ground);
    
    
    if (keyDown("space") && monkey.y > windowWidth - 400) {
      monkey.velocityY = -25;
    } else {
      monkey.velocityY++;
      
      makingOfFood();
      obstacles();
      
      
    if (monkey.isTouching(foodGroup)) {
      score = score + 2;
      foodGroup.destroyEach();
    }

    if (monkey.isTouching(obstacleGroup)) {
      life = life - 1;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      monkey.scale = 0.15;
    }
      
      if (life === 0) {
      gameState = end;
    }

    fill("white");
    textSize(30);
    text("score = " + score + "     " + "life = " + life, monkey.x + 100, monkey.x);

    score.depth = life.depth = monkey.depth + 1;

    increasingOff_Size();

    drawSprites();
  
    fill("white");
    textSize(30);
    text("score = " + score + "     " + "life = " + life, monkey.x + 100, monkey.x);
      
        text("GAME OVER", windowWidth / 3, windowHeight / 2);
  }
}

function makingOffood() {
  rand = Math.round(random(monkey.y - 100, monkey.y - 150));
  banana = createSprite(400, rand);
  banana.visible = false;

  if (frameCount % 80 === 0) {
    banana = createSprite(400, rand);
    banana.visible = true;
    banana.addImage("fruit", bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -5;
    banana.lifetime = 80;
  }

  foodGroup.add(banana);
}
  
  function obstacles() {
  obstacle = createSprite(300, ground.y - 40);
  obstacle.visible = false;

  if (frameCount % 300 === 0) {
    obstacle = createSprite(300, ground.y - 40);
    obstacle.visible = true;
    obstacle.addImage("rock", obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 80;
  }

  obstacleGroup.add(obstacle);
}

function increasingOff_Size() {
  switch (score) {
    case 10:
      monkey.scale = 0.17;
      break;

    case 20:
      monkey.scale = 0.19;
      break;

    case 30:
      monkey.scale = 0.21;
      break;

    case 40:
      monkey.scale = 0.23;
      break;

    case 50:
      monkey.scale = 0.25;
      break;

    default:
      break;
  }
 }
}