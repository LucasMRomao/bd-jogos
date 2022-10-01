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

class Card extends Obj{
    card_selection;
    revealed = false;
}