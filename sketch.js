//creating PC and NPC's.
//assigning behaviour to the PC and NPC.
//loading images. 
//defining the play state and the end state.
//writing winning and the losing rule.
var PLAY = 0;
var END = 1;
var gameState = PLAY;

var player, player_img, bullet_img;
var redbuilder, bluebuilder, greenbuilder, yellowbuilder;
var backGround, ground_img; 
var bulletGroup, builderGroup1, builderGroup2, builderGroup3, builderGroup4;

var score = 0;

function preload() {
    player_img = loadImage("player.png");
    redbuilder = loadImage("red builder.png");
    bluebuilder = loadImage("blue builder.png");
    greenbuilder = loadImage("green builder.png");
    yellowbuilder = loadImage("yellow builder.png");
    bullet_img = loadImage("power.png");
}

function setup() {
    createCanvas(600, 700);

    
    //backGround = createSprite(200, 0, 600, 800);
    // backGround.y = backGround.height/2;
    // backGround.velocityY = 6;
    // backGround.shapeColor = "white";


    player = createSprite(300, 660, 40, 40);
    player.addImage("player", player_img);
    player.scale = 0.16;
    //player.debug = true;

    builderGroup1 = new Group();
    builderGroup2 = new Group();
    builderGroup3 = new Group();
    builderGroup4 = new Group();
    bulletGroup = new Group();

}

function draw() {
    background("lightgreen");
    if (gameState === PLAY) {
        if(keyDown(LEFT_ARROW)){
            player.x = player.x - 5;
        }
        if(keyDown(RIGHT_ARROW)){
            player.x = player.x + 5;
        }
    
        // if (backGround.y > 400){
        //     backGround.y = 0;
        // }
    
        if (keyDown(UP_ARROW)) {
            spawnBullets();
        }
    
        if (bulletGroup.isTouching(builderGroup1)) {
            builderGroup1.destroyEach();
            bulletGroup.destroyEach();
            score = score+5;
        }
        if (bulletGroup.isTouching(builderGroup2)) {
            builderGroup2.destroyEach();
            bulletGroup.destroyEach();
            score = score+5;
        }
        if (bulletGroup.isTouching(builderGroup3)) {
            builderGroup3.destroyEach();
            bulletGroup.destroyEach();
            score = score+5;
        }
        if (bulletGroup.isTouching(builderGroup4)) {
            builderGroup4.destroyEach();
            bulletGroup.destroyEach();
            score = score+5;
        }
    
        var number  = Math.round(random(1,4));
    
        if(frameCount % 50 === 0) {
            if (number === 1) {
                yellowBuilders();
            }else if (number === 2) {
                redBuilders();
            }else if (number === 3) {
                greenBuilders();
            }else {
                blueBuilders();
            }
        }   
        
        if (score === 1500 || builderGroup1.isTouching(player) || builderGroup2.isTouching(player) || builderGroup3.isTouching(player) || builderGroup4.isTouching(player)) {
            gameState = END;
        }
    }
    drawSprites();
    textSize(18);
    text("SCORE: "+score, 10, 30); 

    if (gameState === END) {
        fill("black")
        textSize(40);
        text("gameover", 220, 350);
        text("press r to restart", 150, 400);
        builderGroup1.setVelocityYEach(0);
        builderGroup2.setVelocityYEach(0);
        builderGroup3.setVelocityYEach(0);
        builderGroup4.setVelocityYEach(0);

        builderGroup1.setLifetimeEach(-1);
        builderGroup2.setLifetimeEach(-1);
        builderGroup3.setLifetimeEach(-1);
        builderGroup4.setLifetimeEach(-1);

        if (keyDown("r")) {
            gameState = PLAY;
            builderGroup1.destroyEach();
            builderGroup2.destroyEach();
            builderGroup3.destroyEach();
            builderGroup4.destroyEach();

            score = 0;
        }
    }
}

function yellowBuilders() {
    var builder = createSprite(200, 0, 20, 20);
    builder.velocityY = 2;
    builder.shapeColor = "yellow";
    builder.addImage("yellow builder", yellowbuilder);
    builder.scale = 0.2;
    //builder.debug = true;
    builder.x = Math.round(random(80,520));
    builder.lifetime = 320;
    builderGroup1.add(builder);
}
function redBuilders() {
    var builder = createSprite(200, 0, 20, 20);
    builder.velocityY = 2;
    builder.shapeColor = "red";
    builder.addImage("red builder", redbuilder);
    builder.scale = 0.15;
    //builder.debug = true;
    builder.x = Math.round(random(80,520));
    builder.lifetime = 320;
    builderGroup2.add(builder);
}
function greenBuilders() {
    var builder = createSprite(200, 0, 20, 20);
    builder.velocityY = 2;
    builder.shapeColor = "green";
    builder.addImage("green builder", greenbuilder);
    builder.scale = 0.2;
    //builder.debug = true;
    builder.x = Math.round(random(80,520));
    builder.lifetime = 320;
    builderGroup3.add(builder);
}
function blueBuilders() {
    var builder = createSprite(200, 0, 20, 20);
    builder.velocityY = 2;
    builder.shapeColor = "blue";
    builder.addImage("blue builder", bluebuilder);
    builder.scale = 0.1;
    //builder.debug = true;
    builder.x = Math.round(random(80,520));
    builder.lifetime = 320;
    builderGroup4.add(builder);
}
function spawnBullets() {
    if (frameCount % 7 === 0) {
        var bullet = createSprite(200, 640, 5, 10);
        bullet.x = player.x;
        bullet.shapeColor = "black";
        bullet.addImage("bullet", bullet_img);
        bullet.scale = 0.05;
        bullet.velocityY = -2;    
        bulletGroup.add(bullet);   
    }
}