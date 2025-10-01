console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// New: mode selection
let vsComputer = confirm("Do you want to play against the computer? Click 'OK' for Computer, 'Cancel' for 2 Player.");

//Function to change the turn
const changeTurn = ()=>{

    return turn === "X"?"0":"X"
} 

//Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 2, 5, 0],
        [3, 4, 5, 2, 15, 0],
        [6, 7, 8, 2, 25, 0],
        [0, 3, 6, -8, 15, 90],
        [1, 4, 7, 2, 15, 90],
        [2, 5, 8, 12, 15, 90],
        [0, 4, 8, 2, 15, 45],
        [2, 4, 6, 3, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText)&& (boxtext[e[0]].innerText !== '')){
            document.querySelector('.info').innerText = "🎉 Congratulations! " + boxtext[e[0]].innerText + " Wins 🎉";

            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "28vw";
            gameover.play();
    }
})
}

// Function for computer's move
function computerMove(){
    let boxtext = document.getElementsByClassName('boxtext');
    let emptyBoxes = [];
    Array.from(boxtext).forEach((el, idx)=>{
        if(el.innerText === '') emptyBoxes.push(idx);
    });

    if(emptyBoxes.length > 0 && !isgameover){
        let move = null;

        // Winning combinations
        let wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        // 1️⃣ Try to win
        wins.forEach(combo => {
            let [a,b,c] = combo;
            if(boxtext[a].innerText === turn && boxtext[b].innerText === turn && boxtext[c].innerText === ''){
                move = c;
            }
            if(boxtext[a].innerText === turn && boxtext[c].innerText === turn && boxtext[b].innerText === ''){
                move = b;
            }
            if(boxtext[b].innerText === turn && boxtext[c].innerText === turn && boxtext[a].innerText === ''){
                move = a;
            }
        });

        // 2️⃣ Block player
        if(move === null){
            let opponent = (turn === "X") ? "0" : "X";
            wins.forEach(combo => {
                let [a,b,c] = combo;
                if(boxtext[a].innerText === opponent && boxtext[b].innerText === opponent && boxtext[c].innerText === ''){
                    move = c;
                }
                if(boxtext[a].innerText === opponent && boxtext[c].innerText === opponent && boxtext[b].innerText === ''){
                    move = b;
                }
                if(boxtext[b].innerText === opponent && boxtext[c].innerText === opponent && boxtext[a].innerText === ''){
                    move = a;
                }
            });
        }

        // 3️⃣ Otherwise, random
        if(move === null){
            move = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        }

        // Play move
        boxtext[move].innerText = turn;
        audioTurn.play();
        checkWin();
        if(!isgameover){
            turn = changeTurn();
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
}

//Game Logic
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

                // If playing vs computer and it's O's turn → AI plays
                if(vsComputer && turn === "0"){
                    setTimeout(computerMove, 500);
                }
            }
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener("click", (e)=>{
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    })
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

     // 👇 Ask again after reset
     vsComputer = confirm("Do you want to play against the computer? Click 'OK' for Computer, 'Cancel' for 2 Player.");
})
