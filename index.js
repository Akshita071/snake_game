//Game constants and variables 
window.onload = function () {

let inputDir ={x:0,y:0};
const music = new Audio ("music.mp3");
const gameover = new Audio("gameover.mp3");
const moveSound = new Audio ("move.mp3");
const foodsound = new Audio("food.mp3");
let speed =5;
let score =0;
let LastPaintTime= 0;
let hiscoreval = 0;
let scorebox = document.getElementById("scorebox");
let hiscorebox = document.getElementById("hiscorebox");

let snakeArr = [
    {x : 13 , y : 15}
]
let food = { x:6 , y: 7};



//Game Functions 

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-LastPaintTime)/1000<1/speed){
        return;
    }
    // console.log(ctime);
    LastPaintTime = ctime;
    gameEngine();
}
function iscollide(snake){
    // if you bump into yourself 
    for(let  i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall 
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
    
}
 function gameEngine(){
    //if collide then game over 
    if(iscollide(snakeArr)){
    gameover.play();
    music.pause();
    inputDir={x:0,y:0};
    alert("game over press any key to start again !");
    snakeArr = [{x:13 , y:15 }];
    music.play();
    score=0;
    }  
    //if you have eaten the food then increment the score and regenerate the food 
    if(snakeArr[0].x===food.x && snakeArr[0].y === food.y){
        score+=1;
        if(score > hiscoreval){
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); 
    hiscorebox.innerHTML = "highscore: " + hiscoreval;
}
        scorebox.innerHTML=`Score: ${score}`;
        foodsound.play();      
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a+(b-a)*Math.random()), y:  Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake 
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
     

    const board = document.querySelector('.board');
    //display the snake
    board.innerHTML="";
snakeArr.forEach ((e, index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index === 0){
        snakeElement.classList.add('head')
    }else{
snakeElement.classList.add('snake');
    }
    
    board.appendChild(snakeElement);
    });
    //DISPLAY THE FOOD
   let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
 }

//main function starts here 
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval =0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML="Hi score : " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , function(e) {
    inputDir ={x:0 , y:1}//start the game 
    moveSound.play();
    if(e.key==="ArrowUp"){
        console.log("Upper key pressed ");
        inputDir.x= 0;
        inputDir.y=-1;


    }else if(e.key === "ArrowDown"){
        console.log("down key pressed ");
        inputDir.x= 0;
        inputDir.y=1;

    }
    else if (e.key === "ArrowLeft"){
        console.log("Left key is pressed ");
        inputDir.x= -1;
        inputDir.y=0;

    }
    else if (e.key === "ArrowRight"){
        console.log("Right key is pressed ");
        inputDir.x= 1;
        inputDir.y=0;
    }
    



    });


};
