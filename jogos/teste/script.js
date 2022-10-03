var canvas = document.getElementById("canvas").getContext("2d");
canvas.imageSmoothingEnabled = false; //Tira a "suavização" dos pixels renderizados

var currentScene = {};

var player = new Player(0, 600 - (141), 153.5, 141, "assets/FlatBoy/Forward/Idle1.png");

var menu = {
    button_start: new Obj(250 - (110 / 2), 300 - (116 / 2), 110, 116, "assets/buttons/start.png"),
    keypress(key){

    },
    click(x, y){
        if(this.button_start.collideClick(x, y)){
            changeScene(game);
        }
    },
    draw(){
        this.button_start.draw();
    },
    update(){

    }
}

var game = {
    button_exit: new Obj(0, 0, 50, 52.72, "assets/buttons/exit.png"),
    status_changed: false,
    keypress(key){
        switch(key){
            case 'a':
                player.direction = -1;
                player.walking = true;
                player.change_direction("Backward");
                if(!this.status_changed){
                    if(!player.is_jumping) player.change_status(PLAYERSTATUS.WALKING);
                    this.status_changed = true;
                    player.current_walking = PLAYERSTATUS.WALKING;
                }
                break;
            
            case 's':
                
                break;
    
            case 'd':
                player.direction = 1;
                player.walking = true;
                player.change_direction("Forward");
                if(!this.status_changed){
                    if(!player.is_jumping) player.change_status(PLAYERSTATUS.WALKING);
                    this.status_changed = true;
                }
                break;
    
            case 'w':
                if(!player.is_jumping){
                    player.frame = 1;
                    player.is_jumping = true;
                    player.change_status(PLAYERSTATUS.JUMPING);
                    this.status_changed = true;
                }
                break;
        }
    },
    keyup(key){
        switch(key){
            case 'a':
                player.direction = 0;
                player.walking = false;
                if(this.status_changed){
                    if(!player.is_jumping) player.change_status(PLAYERSTATUS.STOPPED);
                    this.status_changed = false;
                }
                break;
            
            case 's':
                
                break;
    
            case 'd':
                player.direction = 0;
                player.walking = false;
                if(this.status_changed){
                    if(!player.is_jumping) player.change_status(PLAYERSTATUS.STOPPED);
                    this.status_changed = false;
                }
                break;
    
            case 'w':
                
                break;
        }
    },
    click(x, y){
        if(this.button_exit.collideClick(x, y)){
            changeScene(menu);
            stopGame();
        }
    },
    draw(){
        player.draw_player();
        this.button_exit.draw();
    },
    update(){
        player.animate_player();
        player.move(this);
    }
}

document.addEventListener("keypress", (event) => {
    if(currentScene.keypress){
        currentScene.keypress(event.key);
    }
});

document.addEventListener("keyup", (event) => {
    if(currentScene.keyup){
        currentScene.keyup(event.key);
    }
});

addEventListener("click", (event) => {
    if(currentScene.click){
        currentScene.click(event.offsetX, event.offsetY);
    }
});

function stopGame(){
    player.x = 0;
    player.y = 600 - (141)
    player.life = 100;
    player.direction = 0;
    player.status = PLAYERSTATUS.STOPPED;
    player.timer_animation = 10;
    player.current_frame = "Idle";
    player.current_direction = "Forward";
    player.is_jumping = false;
    player.current_status = PLAYERSTATUS.STOPPED;
    player.walking = false;
    player.frame = 1;
    game.status_changed = false;
}

function changeScene(scene){
    currentScene = scene;
}

function main(){
    canvas.clearRect(0, 0, 500, 600);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main);
}

changeScene(menu);
main();