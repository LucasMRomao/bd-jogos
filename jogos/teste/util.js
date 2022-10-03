const PLAYERSTATUS = {
    STOPPED: 0,
    WALKING: 1,
    RUNNING: 2,
    JUMPING: 3,
    DEAD: 4
}

const FRAMES = ['Idle', 'Walk', 'Run', 'Jump', 'Dead'];

class Obj{
    frame = 1;
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

class Player extends Obj{
    life = 100;
    direction = 0;
    status = PLAYERSTATUS.STOPPED;
    timer_animation = 10;
    current_frame = "Idle";
    current_direction = "Forward";
    is_jumping = false;
    current_status = PLAYERSTATUS.STOPPED;
    walking = false;

    move(game){
        this.x += this.direction;

        if(this.x < 0){
            this.x = 0;
        }else if(this.x > 500 - this.width){
            this.x = 500 - this.width;
        }

        if(this.y > 600 - this.height){
            this.y = 600 - this.height;
        }
        
        if(this.is_jumping){
            if(this.frame < 8){
                this.y--;
            }else if(this.frame < 15){
                this.y++;
            }else{
                this.is_jumping = false;
                game.status_changed = false;
                this.change_status(this.current_status);
            }
        }else{
            this.current_status = this.walking ? this.status : PLAYERSTATUS.STOPPED;
            this.change_status(this.current_status);
        }
    }

    change_direction(direction){
        this.current_direction = direction;
    }

    change_status(status){
        this.status = status;
        this.current_frame = FRAMES[status];
    }

    draw_player(){
        this.draw();
    }

    animate_player(){
        this.timer_animation--;

        if(this.timer_animation <= 0){
            this.timer_animation = 5;
            this.frame++
            if(this.frame > 15){
                this.frame = 1;
            }
        }

        this.image = "assets/FlatBoy/" + this.current_direction + "/" + this.current_frame + this.frame + ".png";
    }
}