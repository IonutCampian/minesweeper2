const game = document.getElementById("gameBoard")
var buttonId = 1;
var seconds = 0;
var time = document.getElementById("timer")

createBoard();

function createBoard() {
    var k = 1;
    for(var i = 1; i <= 20; ++i) {
        for (var j = 1; j <= 20; ++j){
            var button = document.createElement("button");
            button.setAttribute("id", "btns");
            button.setAttribute("number", k)
            button.style.gridRowStart = i;
            button.style.gridColumnStart= j;
            game.appendChild(button);
            ++k;
        }
    }
    addEventListener();
}

function addEventListener() {
    var gameButtons = document.querySelectorAll("container");
    gameButtons.forEach(button =>{
         var btn = document.getElementById(btns);
         btn.addEventListener("click", e =>{ 
            btn.innerHTML = btn.getAttribute("Number")
         })
    })
}


function passTime() {
    seconds += 1;
    document.getElementById("timer").innerText = seconds;
}


