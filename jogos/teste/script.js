var canvas = document.getElementById("canvas").getContext("2d");
canvas.imageSmoothingEnabled = false; //Tira a "suavização" dos pixels renderizados

var currentScene = {};

var player = new Player(0, 600 - (141), 153.5, 141, "assets/FlatBoy/Forward/Idle1.png");

var game = {
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
                player.frame = 1;
                player.is_jumping = true;
                player.change_status(PLAYERSTATUS.JUMPING);
                this.status_changed = true;
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
    click(){
        
    },
    draw(){
        player.draw_player();
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

function changeScene(scene){
    currentScene = scene;
}

function main(){
    canvas.clearRect(0, 0, 500, 600);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main);
    //console.log(player.walking);
}

changeScene(game);
main();