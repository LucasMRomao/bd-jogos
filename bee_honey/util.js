class Obj{

  frame = 1;
  timer = 0;

  constructor(x, y, width, height, color){
    this.x  = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    var img = new Image();
    img.src = this.color;
    canvas.drawImage(img, this.x, this.y, this.width, this.height);
  }

  animation(nome, limit){
    this.timer += 1;
    if (this.timer > 10){
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame > limit){
      this.frame = 1;
    }
    this.color = "assets/" + nome + this.frame + ".png";
  }

}

class Bee extends Obj{
  dir = 0;
  move(){
    this.x += this.dir;

    if(this.x < 0){
      this.x = 0;
    }else if(this.x > 400){
      this.x = 400;
    }
  }
}

class Spider extends Obj{
  //spider
  move(){
    this.y += 4;
    if (this.y > 900){
      this.y = -50;
      this.x = Math.random() * (400 - 0);
    }
  }
}

class Bg extends Obj{

  move(speed, limit, pos){
    this.y += speed;

    if(this.y > limit){
      this.y = pos;
    }
  }

}

class Flower extends Spider{
  move(){
    this.y += 4;
    if (this.y > 900){
      this.y = -50;
      this.x = Math.random() * (400 - 0);
    }
  }
}

class Text{
  draw(text, x, y, color){
    canvas.font = "40px Arial";
    canvas.fillStyle = color;
    canvas.fillText(text, x, y);
  }
}
