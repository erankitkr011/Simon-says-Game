// ! Simon Says Game

let gameseq=[];
let userseq=[];
let highScore = 0;

let btns=["yellow","red","purple","green"];

let started = false;
let level=0;

let h2=document.querySelector('h2');
document.addEventListener("keypress", function () {
    if(started==false){
        // console.log("Game is started");
        started=true;
        Levelup();
    }
})
document.addEventListener("touchstart", function () {
    if(started==false){
        // console.log("Game is started");
        started=true;
        Levelup();
    }
})
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function Levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randcolor = btns[randIdx];
    let randBtn=document.querySelector(`.${randcolor}`);
    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randBtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnFlash(randBtn);
}
function checkAns(idx){
    // console.log("Curr level : ", level);
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(Levelup,1000);
        }
    }
    else{
        // h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        h2.innerHTML=`Game Over!<br> Your score was <b><span style="color:#819ff9">${level}</span></b> <br> Touch any where to start the game`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnpress(){
    // console.log("Button is pressed");
    // console.log(this);
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    // console.log(userColor)
    userseq.push(userColor);
    checkAns(userseq.length-1);
}
let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnpress)
}
function reset(){
    if(level > highScore) {
        highScore = level;
        document.getElementById('high-score').innerHTML = `High Score: <span style="color:#819ff9">${highScore}</span>`;
    }
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}