var canvas = document.getElementById("canvas").getContext("2d");

let cards = new Array();
let card_options = [];
let score = 0;
let score_text = new Text();
let timer_text = new Text();
let timer_seconds = 0;
let timer_minutes = 0;
let timer_hours = 0;
let card_selected1 = false;
let card_selected2 = false;
let selected = false;
let marginWidthSize = (window.innerWidth - 511) / 2;
let marginHeightSize = (window.innerHeight - 550) / 2;
let tipo_jogo = GAMETYPE.POINTS;
let jogando = true;

let pointsType_image = new Obj(150, 5, 100, 30, "assets/tipo_pontos.png");
let timerType_image = new Obj(260, 5, 100, 30, "assets/tipo_tempo.png");

document.addEventListener("click", (event) => {
    if(!selected){
        let card = checkClick(event.x, event.y);
        if(card && !cards[card].revealed){
            cards[card].image = "assets/" + cards[card].card_selection + ".png";
            cards[card].revealed = true;
    
            if(!card_selected1){
                card_selected1 = card;
            }else if(!card_selected2){
                card_selected2 = card;
                selected = true;
                checkSelection();
            }
    
        }/*else{
            cards[card].image = "assets/background.png";
            cards[card].revealed = false;
        }*/
    }

    if(pointsType_image.collideClick(event.x - marginWidthSize, event.y - marginHeightSize)){
        let confirmar = confirm("Deseja realmente trocar o tipo de jogo? (O jogo será reiniciado!)");

        if(confirmar){
            tipo_jogo = GAMETYPE.POINTS;
            sortCards();
            start();
        }
    }else if(timerType_image.collideClick(event.x - marginWidthSize, event.y - marginHeightSize)){
        let confirmar = confirm("Deseja realmente trocar o tipo de jogo? (O jogo será reiniciado!)");

        if(confirmar){
            tipo_jogo = GAMETYPE.TIME;
            sortCards();
            start();
        }
    }
});

addEventListener("resize", (event) => {
    marginWidthSize = (window.innerWidth - 511) / 2;
    marginHeightSize = (window.innerHeight - 550) / 2;
});

function sortCards(){

    cards = new Array();
    card_options = [];

    for(var i = 1; i<= 50; i++){
        card_options.push(i, i);
    }
    
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            let card = new Card((1 + i * 51), (1 + j * 51 + 39), 50, 50, "assets/background.png");
            let position = Math.floor(Math.random() * card_options.length);
            card.card_selection = card_options[position];
            card_options.splice(position, 1);
            cards.push(card);
        }
    }
}

function checkSelection(){
    if(card_selected1 && card_selected2){
        if(cards[card_selected1].card_selection == cards[card_selected2].card_selection){
            cards[card_selected1].revealed = true;
            cards[card_selected2].revealed = true;
            card_selected1 = false;
            card_selected2 = false;
            selected = false;
            score++;
        }else{
            setTimeout(function(){
                cards[card_selected1].image = "assets/background.png";
                cards[card_selected1].revealed = false;
                cards[card_selected2].image = "assets/background.png";
                cards[card_selected2].revealed = false;
                card_selected1 = false;
                card_selected2 = false;
                selected = false;
            }, 1500);
        }
    }
}

function checkClick(x, y){
    x -= marginWidthSize;
    y -= marginHeightSize;

    let click = false;

    for(var i in cards){
        if(cards[i].collideClick(x, y)){
            click = i;
        }
    }

    return click;
}

function draw(){
    canvas.clearRect(0, 0, 511, 550);
    cards.forEach((element, index, cards) => {
        element.draw();
    });

    /*pointsType_text.draw_text(20, "Arial", 150, 25, "red", true);
    timerType_text.draw_text(20, "Arial", 260, 25, "red", true);*/

    pointsType_image.draw();
    timerType_image.draw();
}

function update(){
    timerText = "";
    timerText = (timer_hours < 10) ? "0" + timer_hours : timer_hours;
    timerText += ":";
    timerText += (timer_minutes < 10) ? "0" + timer_minutes : timer_minutes;
    timerText += ":";
    timerText += (timer_seconds < 10) ? "0" + timer_seconds : timer_seconds;

    score_text.text = "Score: " + score;
    score_text.draw_text(20, "Arial", 10, 25, "yellow");
    timer_text.text = timerText;
    timer_text.draw_text(20, "Arial", 420, 25, "yellow");
}

function checkWin(){
    switch(tipo_jogo){
        case GAMETYPE.POINTS:
            if(score == 50){
                alert("Você venceu! Tempo de jogo: " + timer_text.text);
                jogando = false;
            }
            break;
        
        case GAMETYPE.TIME:
            if(timer_minutes == 0 && timer_seconds == 0){
                alert("Fim de jogo! " + score_text.text);
                jogando = false;
            }
            break;
    }
}

function start(){
    switch(tipo_jogo){
        case GAMETYPE.POINTS:
            timer_hours = 0;
            timer_minutes = 0;
            timer_seconds = 0;
            score = 0;
            break;
        
        case GAMETYPE.TIME:
            timer_hours = 0;
            timer_minutes = 5;
            timer_seconds = 0;
            score = 0;
            break;
    }
}

function main(){
    if(jogando){
        draw();
        update();
        checkWin();
        requestAnimationFrame(main);
    }
}

sortCards();
start();
main();

setInterval(() => {

    switch(tipo_jogo){
        case GAMETYPE.POINTS:
            timer_seconds++;
            if(timer_seconds >= 60){
                timer_seconds = 0;
                timer_minutes++;
            }
            if(timer_minutes >= 60){
                timer_minutes = 0;
                timer_hours++;
            }
            break;
        
        case GAMETYPE.TIME:
            timer_seconds--;
            if(timer_seconds < 0){
                timer_seconds = 59;
                timer_minutes--;
            }
            if(timer_minutes < 0){
                timer_minutes = 0;
            }
            break;
    }
}, 1000);