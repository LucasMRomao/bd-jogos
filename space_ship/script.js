var canvas = document.getElementById("canvas").getContext("2d");
canvas.imageSmoothingEnabled = false; //Tira a "suavização" dos pixels renderizados

document.addEventListener("click", (event) => {
    if(currentScene.click){
        currentScene.click();
    }
});

document.addEventListener("mousemove", (event) => {
    if(currentScene.moveShip){
        currentScene.moveShip(event);
    }
});

var currentScene = {}

var bullets = DEFAULT.TIROS;
var pts = 0;

var groupShoot = [];
var shoots = {
    draw(){
        groupShoot.forEach((shoot, index) => {
            shoot.draw();
        });
    },
    update(){
        groupShoot.forEach((shoot, index) => {
            shoot.move();

            if(shoot.y <= -100){
                groupShoot.splice(shoot[0], 1);
                bullets++;
            }
        });
    }
};

var groupMeteors = [];
var meteors = {
    time: 0,
    spawMeteors(){
        this.time++;
        
        if(this.time >= 60){
            let size = Math.random() * (80 - 50) + 50;
            let positionX = Math.random() * (450 - 10) + 10;
            var meteor = new Meteor(positionX, -100, size, size, "assets/meteoro.png");
            groupMeteors.push(meteor);
            this.time = 0;
        }
    },
    destroyMeteors(){
        groupShoot.forEach((shoot) => {
            groupMeteors.forEach((meteor) => {
                if(shoot.collide(meteor)){
                    groupShoot.splice(groupShoot.indexOf(shoot), 1);
                    groupMeteors.splice(groupMeteors.indexOf(meteor), 1);
                    bullets++;
                    pts += 10;
                }
            });
        });
    },
    draw(){
        groupMeteors.forEach((meteor, index) => {
            meteor.draw();
        })
    },
    update(){
        this.spawMeteors();
        this.destroyMeteors();
        groupMeteors.forEach((meteor, index) => {
            meteor.move();

            if(meteor.y >= 700){
                groupMeteors.splice(groupMeteors.indexOf(meteor), 1);
                changeScene(game_over);
            }
        });
    }
}

var infinityBackground = {
    bg: new Obj(0, 0, 500, 600, "assets/fundo.png"),
    bg2: new Obj(0, -600, 500, 600, "assets/fundo.png"),
    
    draw(){
        this.bg.draw();
        this.bg2.draw();
    },
    move_bg(){
        this.bg.y += 1;
        this.bg2.y += 1;

        if(this.bg.y >= 600){
            this.bg.y = 0;
        }
        if(this.bg2.y >= 0){
            this.bg2.y = -600;
        }
    },
}

var menu = {
    title: new Text("SpaceShip"),
    label: new Text("Click to play"),
    ship: new Obj(220, 530, 60, 50, "assets/nave.png"),
    click(){
        changeScene(game);
    },
    draw(){
        infinityBackground.draw();
        this.title.draw_text(40, "Arial", 155, 300, "white");
        this.label.draw_text(20, "Arial", 200, 250, "white");
        this.ship.draw();
    },
    update(){
        infinityBackground.move_bg();
    }
}

var game = {
    score: new Text("0"),
    ship: new Obj(220, 530, 60, 50, "assets/nave.png"),
    click(){
        if(bullets > 0){
            var shoot = new Shoot(this.ship.x + (this.ship.width / 2), this.ship.y, 2, 10, "assets/tiro.png");
            groupShoot.push(shoot);
            bullets--;
        }
    },
    moveShip(event){
        this.ship.x = event.offsetX - this.ship.width / 2;
        this.ship.y = event.offsetY - this.ship.height / 2;
    },
    draw(){
        infinityBackground.draw();
        this.score.draw_text(30, "Arial", 40, 40, "white");
        this.ship.draw();
        shoots.draw();
        meteors.draw();
    },
    update(){
        infinityBackground.move_bg();
        shoots.update();
        meteors.update();
        this.score.update_text(pts);
    }
}

var game_over = {
    score: new Text("0"),
    label_gameover: new Text("Game Over"),
    clean_scene(){
        pts = 0;
        bullets = DEFAULT.TIROS;
        groupMeteors = [];
        groupShoot = [];
    },
    click(){
        this.clean_scene();
        changeScene(menu);
    },
    draw(){
        infinityBackground.draw();
        this.score.draw_text(30, "Arial", 40, 40, "white");
        this.label_gameover.draw_text(60, "Arial", 100, 300, "white");
    },
    update(){
        infinityBackground.move_bg();
        this.score.update_text(pts);
    }
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