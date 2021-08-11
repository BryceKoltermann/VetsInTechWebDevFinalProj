const topLeft = document.querySelector('.topLeftGreen');
const topRight = document.querySelector('.topRightYellow');
const bottomLeft = document.querySelector('.bottomLeftRed');
const bottomRight = document.querySelector('.bottomRightBlue');
const turnNum = document.querySelector('.level');
const startButton = document.querySelector('.start-btn');
const onButton = document.querySelector('.power-btn')
const Star = document.querySelector('.starRating')


let sequence = [];
let flash;
let playerOrder = [];
let turn;
let good;
let compTurn;
let intervalId;
let noise = true;
let on=false;
let win;

onButton.addEventListener('click', () => {
    on = true;
    turnNum.innerHTML = "--"
    onButton.style.backgroundColor = "green";
    clearColor();
    clearInterval(intervalId);
})

startButton.addEventListener('click',() => {
   if (on || win) {
       play();
   }
})

function play() {
    win = false;
    sequence = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnNum.innerHTML = "1";
    startButton.innerHTML = "Play"

    good = true
    compTurn = true;
    for (let i = 0; i < 15; i++) {
        sequence.push(Math.floor(Math.random() *4) + 1);
    }
    console.log(sequence)
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;
        if (flash == turn) {
            clearInterval(intervalId);
            compTurn = false;
            clearColor();
            on = true;
        }

        if (compTurn) {
            clearColor();
            setTimeout(() => {
                if (sequence[flash] == 1) {
                    green();
                }
                if (sequence[flash] == 2) {
                    yellow();
                }
                if (sequence[flash] == 3) {
                    red();
                }
                if (sequence[flash] == 4) {
                    blue();
                }
                flash++;
            }, 200);
        }
}

function green() {
    if (noise) {
        const Audio = document.getElementById("one");
        Audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = '#b3ffb3';
}
function yellow() {
    if (noise) {
        const Audio = document.getElementById("two");
        Audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = '#ffffb3';
}function red() {
    if (noise) {
        const Audio = document.getElementById("three");
        Audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = '#ffb3b3';
}
function blue() {
    if (noise) {
        const Audio = document.getElementById("four");
        Audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = '#b3b3ff';
}
function clearColor() {
    topLeft.style.backgroundColor = 'green';
    topRight.style.backgroundColor = 'yellow';
    bottomLeft.style.backgroundColor = 'red';
    bottomRight.style.backgroundColor = 'blue';
}

topLeft.addEventListener("click", () => {
    if (on) {
        playerOrder.push(1);
        check();
        green();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
topRight.addEventListener("click", () => {
    if (on) {
        playerOrder.push(2);
        check();
        yellow();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
bottomLeft.addEventListener("click", () => {
    if (on) {
        playerOrder.push(3);
        check();
        red();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
bottomRight.addEventListener("click", () => {
    if (on) {
        playerOrder.push(4);
        check();
        blue();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
function check() {
    if (playerOrder[playerOrder.length - 1] !== sequence[playerOrder.length - 1]){
        good = false
    }
    if (playerOrder.length == 15 && good) {
      winGame();
    }
    if (good == false) {
       flashColor();
        const Audio = document.getElementById("fail");
        Audio.play();
        setTimeout(() =>{
            startButton.innerHTML = "Play Again?"

 //           play();
        },8000)
        noise = false;   
    }
    if (turn == playerOrder.length && good && !win) {
        turn++
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnNum.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}
function winGame() {
    flashColor();
    turnNum.innerHTML = "WIN";
    startButton.innerHTML = "Play Again?"
    on = false;
    win = true;
}
function flashColor(){
    topLeft.style.backgroundColor = '#b3ffb3';
    topRight.style.backgroundColor = '#ffffb3';
    bottomLeft.style.backgroundColor = '#ffb3b3';
    bottomRight.style.backgroundColor = '#b3b3ff';

}

