var canvas = document.getElementById("canvas").getContext("2d");

var bg = new Background(0, 0, 500, 600, "assets/images/sky.png");
var bg2 = new Background(500, 0, 500, 600, "assets/images/sky.png");
var ground = new Ground(0, (600 - 160), 500, 600, "assets/images/ground.png");
var ground2 = new Ground(500, (600 - 160), 500, 600, "assets/images/ground.png");
var bird = new Bird(50, 400, 63, 51, "assets/images/bird0.png");
var pipe1 = new Pipe(300, 350, 96, 358, "assets/images/pipe1.png");
var pipe2 = new Pipe(300, -150, 96, 358, "assets/images/pipe2.png");
var coin = new Coin(50, 50, 45, 65, "assets/images/3.png");

var score = 0;
var score_text = new Text();
var game_over_text = new Text();
var playing = true;

var audioFly = new Audio("assets/sounds/wing.ogg");
var audioCoinPick = new Audio("assets/sounds/point.ogg");
var audioPipeCollide = new Audio("assets/sounds/hit.ogg");

document.addEventListener("click", (event) => {
    bird.velocity -= 15;
    audioFly.play();
});

function collisions(){
    if(bird.collide(coin)){
        if(coin.visible){
            coin.visible = false;
            score += 10;
            audioCoinPick.play();
        }
    }

    if(bird.collide(pipe1) || bird.collide(pipe2)){
        playing = false;
        audioPipeCollide.play();
    }
}

function draw(){
    canvas.clearRect(0, 0, 500, 600);
    bg.draw();
    bg2.draw();
    
    if(playing){
        pipe1.draw();
        pipe2.draw();
        ground.draw();
        ground2.draw();
        bird.draw();
        coin.draw();
        score_text.draw_text(60, "Arial", 225, 100, "white");
    }else{
        game_over_text.text = "Game Over";
        game_over_text.draw_text(60, "Arial", 100, 300, "red");
    }
}

function update(){
    if(playing){
        bg.move(1, -500, 0);
        bg2.move(1, 0, 500);
        ground.move(2, -500, 0);
        ground2.move(2, 0, 500);
        bird.move();
        bird.limits();
        bird.animation("bird", 5, 3);
        pipe1.move(2, -100, 500, pipe2);
        coin.move(pipe1);
        coin.animation("", 5, 5);
        score_text.text = score;
        collisions();
    }
}

function main(){
    draw();
    update();
    requestAnimationFrame(main);
}

main();