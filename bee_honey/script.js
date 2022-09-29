var canvas = document.getElementById('canvas').getContext("2d");

var bg = new Bg(0,0,500,900, "assets/bg.png")
var flower = new Flower(0,0,50,50, "assets/flower1.png")
var bg2 = new Bg(0,-900,500,900, "assets/bg.png")
var bee = new Bee(200,500,100,80, "assets/bee1.png");
var spider = new Spider(100,100,100,100, "assets/spider1.png");

var text_points = new Text();
var text_lifes = new Text();
var text_gameover = new Text();

var playing = true;

document.addEventListener("keydown", function(event){
  if (event.key === "a"){
    bee.dir = -2;
  }
  if (event.key === "d"){
    bee.dir = 2;
  }
});

document.addEventListener("keyup", function(event){
  if (event.key === "a"){
    bee.dir = 0;
  }
  if (event.key === "d"){
    bee.dir = 0;
  }
});

function gameover(){
  if(bee.lifes <= 0){
    playing = false;
  }
}

function collides(){
  if(bee.collide(spider)){
    bee.lifes -= 1;
    spider.respawn();
  }

  if(bee.collide(flower)){
    bee.pts += 10;
    flower.respawn();
  }
}

function draw() {
  bg.draw();
  bg2.draw();

  if(playing){
    bee.draw();
    spider.draw();
    flower.draw();
    text_points.draw(bee.pts, 240, 100, "white");
    text_lifes.draw(bee.lifes, 40, 100, "red");
  }else{
    text_gameover.draw("Game Over", 150, 300, "red");
  }
}

function update() {
  bg.move(3, 900, 0);
  bg2.move(3, 0, -900);

  if(playing){
    bee.move();
    bee.animation("bee", 4);
    spider.move();
    spider.animation("spider", 4);
    flower.move();
    flower.animation("flower", 2);
    collides();
    gameover();
  }else{

  }

}

function main() {
  canvas.clearRect(0,0,500,900);
  update();
  draw();
}

setInterval(main, 10);
