const DEFAULT = {
    TIROS: 3
}

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

    collideClick(x, y){
        if(this.x <= x &&
            this.x + this.width >= x &&
            this.y <= y &&
            this.y + this.height >= y)
        {
            return true;
        }else{
            return false;
        }
    }
}

class Text{
    text = "";

    constructor(text){
        this.text = text;
    }

    draw_text(size, font, x, y, color, stroke = false){
        canvas.font = size + "px " + font;
        canvas.fillStyle = color;
        canvas.lineWidth = 3; //Define a espessura do contorno do texto
        canvas.strokeStyle = 'black';
        if(stroke) canvas.strokeText(this.text, x, y);
        canvas.fillText(this.text, x, y);
    }

    update_text(text){
        this.text = text;
    }
}

class Shoot extends Obj{
    move(){
        this.y -= 10;
    }
}

class Meteor extends Obj{
    speed = Math.random() * (10 - 2) + 2;
    move(){
        this.y += this.speed;
    }
}