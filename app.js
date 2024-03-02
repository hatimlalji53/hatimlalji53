let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","blue","green"];

let  started=false;
let level=0;
let score=0;
let hs=0; //highest score

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
    }

    levelup();
})

function gameFlash(btn){
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

function levelup(){
    userSeq=[];
    level++;
    // score++;
    score=level-1;
    h2.innerText=`level ${level}`;

    // random button choose
    let randomeIndex=Math.floor(Math.random()*3);
    let randColor=btns[randomeIndex];
    let randbtn=document.querySelector(`.${randColor}`);
    // console.log(randomeIndex);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    // console.log(`cureent level : ${level}`);

    if(userSeq[idx]===gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        if(hs<score){
            hs=score;
        }
        h2.innerHTML=`game over! your score was <b>${score}<b/><br><br>Highest score : ${hs}<br><br>: press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
       

        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    usercolor=btn.getAttribute("id");
    console.log(usercolor);
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
    score=0;
}