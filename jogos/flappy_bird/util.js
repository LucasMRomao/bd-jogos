class Obj{
    frame = 0;
    timer = 0;
    visible = true;

    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(){
        if(this.visible){
            var img = new Image();
            img.src = this.image;
            canvas.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }

    animation(name, velocity, limit){
        this.timer++;

        if(this.timer >= velocity){
            this.timer = 0;
            this.frame++;
        }

        if(this.frame > limit){
            this.frame = 0;
        }

        this.image = "assets/images/" + name + this.frame + ".png";
    }

    collide(obj){
        if(this.x < obj.x + obj.width && 
          this.x + this.width > obj.x &&
          this.y < obj.y + obj.height && 
          this.y + this.height > obj.y){
            return true;
        }else{
          return false;
        }
    }
}

class Text{
    text = "";
    
    draw_text(size, font, x, y, color){
        canvas.font = size + "px " + font;
        canvas.fillStyle = color;
        canvas.fillText(this.text, x, y);

    }
}

class Background extends Obj{
    move(speed, limit, position){
        this.x -= speed;
        if(this.x <= limit){
            this.x = position;
        }
    }
}

class Ground extends Background{

}

class Bird extends Obj{

    velocity = 2;
    gravity = 0.5;

    move(){
        if(this.velocity < 10){
            this.velocity += this.gravity;
        }

        this.y += this.velocity;
    }

    limits(){
        if(this.y >= 600 - 160 - 51){
            this.y = 600 - 160 - 51;
        }else if(this.y <= 0){
            this.y = 0;
        }
    }
}

class Pipe extends Obj{
    move(velocity, limit, newPos, pipe2){
        this.x -= velocity;
        
        if(this.x <= limit){
            this.x = newPos;
            this.y = Math.random() * (500 - 300) + 300;
        }

        pipe2.x = this.x;
        pipe2.y = this.y - 500;
    }
}

class Coin extends Obj{
    move(pipe){
        this.x = pipe.x + (pipe.width / 2) - (this.width / 2);
        this.y = pipe.y - 100;

        if(this.x <= -50){
            this.visible = true;
        }
    }
}