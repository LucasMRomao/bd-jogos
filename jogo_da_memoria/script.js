var canvas = document.getElementById("canvas").getContext("2d");

let cards = new Array();
let card_options = [];
let score = 0;
let score_text = new Text();
let card_selected1 = false;
let card_selected2 = false;
let selected = false;
let marginWidthSize = (window.innerWidth - 511) / 2;
let marginHeightSize = (window.innerHeight - 511) / 2;

for(var i = 1; i<= 50; i++){
    card_options.push(i);
    card_options.push(i);
}

for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
        let card = new Card((1 + i * 51), (1 + j * 51), 50, 50, "assets/background.png");
        let position = Math.floor(Math.random() * card_options.length);
        card.card_selection = card_options[position];
        card_options.splice(position, 1);
        cards.push(card);
    }
}

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
});

addEventListener("resize", (event) => {
    marginWidthSize = (window.innerWidth - 511) / 2;
    marginHeightSize = (window.innerHeight - 511) / 2;
});

function checkSelection(){
    if(card_selected1 && card_selected2){
        if(cards[card_selected1].card_selection == cards[card_selected2].card_selection){
            cards[card_selected1].revealed = true;
            cards[card_selected2].revealed = true;
            card_selected1 = false;
            card_selected2 = false;
            selected = false;
            score++;
            alert(score);
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
    //x -= 428;
    x -= marginWidthSize;
    //y -= 57; //Arrumar depois
    y -= marginHeightSize;

    let click = false;

    for(var i in cards){
        if(cards[i].x <= x &&
            cards[i].x + cards[i].width >= x &&
            cards[i].y <= y &&
            cards[i].y + cards[i].height >= y){
                click = i;
            }
    }

    return click;
}

function draw(){
    canvas.clearRect(0, 0, 511, 511);
    for(var i in cards){
        cards[i].draw();
    }
}

function update(){
    /*score_text.text = "Score: " + score;
    score_text.draw_text(20, "Arial", 10, 25, "yellow");*/
}

function main(){
    draw();
    update();
    requestAnimationFrame(main);
}

main();