var canvas = document.getElementById('canvas').getContext("2d");

var bg = new Bg(0,0,500,900, "assets/bg.png")
var bg2 = new Bg(0,-900,500,900, "assets/bg.png")
var bee = new Bee(200,500,100,80, "assets/bee1.png");
var spider = new Spider(100,100,100,100, "assets/spider1.png");

document.addEventListener("keydown", function(event){
  if (event.key === "a"){
    bee.dir = -1;
  }
  if (event.key === "d"){
    bee.dir = 1;
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

function draw() {
  bg.draw();
  bg2.draw();
  bee.draw();
  spider.draw();
}

function update() {
  bg.move(3, 900, 0);
  bg2.move(3, 0, -900);
  bee.move();
  spider.move();
}

function main() {
  canvas.clearRect(0,0,500,900);
  update();
  draw();
}

setInterval(main, 10);
