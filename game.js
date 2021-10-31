const game = document.getElementById("gameBoard")
var buttonId = 1
var seconds = 0
var time = document.getElementById("timer")
const buttonBoard = []
const numberOfBombs = 30
const validButtons = 370
const bombs = []
createBoard()
generateBombs()
checkForBomb()
addMark()
function createBoard() {
    var k = 1;
    for(var i = 1; i <= 20; ++i) {
        for (var j = 1; j <= 20; ++j){
            var button = document.createElement("button")
            button.setAttribute("id", k)
            button.setAttribute("class", "buttons")
            game.appendChild(button)
            buttonBoard.push(k)
            ++k
        } 
    }
}

function generateBombs() {
    for(var i = numberOfBombs; i > 0; --i) {
        var randomNumber = Math.floor(Math.random() * 400 - 1 + 1)
        if(!(bombs.includes(randomNumber)) && randomNumber != 0) {
            bombs.push(randomNumber)
        } else {
            ++i
        }
    }
}

function passTime() {
    seconds += 1
    document.getElementById("timer").innerText = seconds
    console.log(seconds)
}

function getButtonId(button) {
    return button.getAttribute("id")
}

function checkForBomb() {
    const allButtons = Array.from(game.querySelectorAll(".buttons"))
    console.log(allButtons)
    console.log(bombs)
    allButtons.forEach(button => {
        button.addEventListener('click', e => {
            var isBomb = false
            var buttonId = getButtonId(button)
            for(var i = 1; i < bombs.length; ++i) {
                if(buttonId == bombs[i]) {
                    isBomb = true;
                    break;
                }
            }
            if(isBomb) {
                for(var i = 1; i < bombs.length; ++i) {
                    document.getElementById(bombs[i]).style.backgroundColor = 'red'
                }
            } else {
                document.getElementById(buttonId).disabled = true
            }
        })
    })  
}

function addMark() {
    const allButtons = game.querySelectorAll(".buttons")
    allButtons.forEach(button => {
        button.addEventListener("contextmenu", e =>{
            var buttonId = getButtonId(button)
            document.getElementById(buttonId).style.backgroundColor = 'yellow'
        })
    })
}

