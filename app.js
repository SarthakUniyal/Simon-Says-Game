let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "purple", "green"];

let level = 0;
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function (){
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSequence.push(randColor);
    console.log(gameSequence);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> </br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress(){
    console.log("Button Pressed");
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    console.log("User Sequence: ", userSequence);
    checkAns(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}