const game = document.getElementById("gameBoard")
var buttonId = 1
var seconds = 0
var time = document.getElementById("timer")
var buttonBoard = []
const numberOfBombs = 30
const validButtons = 370
var bombs = []
var bombsNear = []
let allPossibleButtons = []
let flags= []
var left = [21,41,61,81,101,121,141,161,181,201,221,241,261,281,301,321,341,361]
var right =[40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380]
var up = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
var down = [382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399]
createBoard()
generateBombs()
addMark()
console.log(bombs)
console.log(allPossibleButtons)
console.log(bombsNear)
function createBoard() {
    for(var i = 1; i <= 400; ++i) {
            var button = document.createElement("button")
            button.setAttribute("id", i)
            button.setAttribute("class", "buttons")
            game.appendChild(button)
            allPossibleButtons[i] = i
    }   
}
function generateBombs() {
    for(var i = numberOfBombs; i > 0; --i) {
        var randomNumber = Math.floor(Math.random() * 400 - 1 + 1)
        if(!(bombs.includes(randomNumber)) && randomNumber != 0) {
            bombs[i] = randomNumber
        } else {
            ++i
        }
    }
    
    for( let i = 1; i <= 400; ++i) {
        var total = 0
        if (left.includes(i)){
            if(bombs.includes(i + 1)){
                ++total
            }
            if(bombs.includes(i - 19)){
                ++total
            }
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i + 21)){
                ++total
            }
            if(bombs.includes(i + 20)){
                ++total
            }
        } else if (right.includes(i)){
            if(bombs.includes(i - 1)){
                ++total
            }
            if(bombs.includes(i - 21)){
                ++total
            }
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i + 19)){
                ++total
            }
            if(bombs.includes(i + 20)){
                ++total
            }
        } else if (up.includes(i)){
            if(bombs.includes(i + 1)){
                ++total
            }
            if(bombs.includes(i - 1)){
                ++total
            }
            if(bombs.includes(i + 20)){
                ++total
            }
            if(bombs.includes(i + 21)){
                ++total
            }
            if(bombs.includes(i + 19)){
                ++total
            }
        } else if (down.includes(i)){
            if(bombs.includes(i + 1)){
                ++total
            }
            if(bombs.includes(i - 19)){
                ++total
            }
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i - 21)){
                ++total
            }
            if(bombs.includes(i - 1)){
                ++total
            }
        } else if (i == 1) {
            if(bombs.includes(i + 20)){
                ++total
            }
            if(bombs.includes(i + 21)){
                ++total
            }
            if(bombs.includes(i + 1)){
                ++total
            }
        } else if (i == 20) {
            if(bombs.includes(i + 20)){
                ++total
            }
            if(bombs.includes(i + 19)){
                ++total
            }
            if(bombs.includes(i - 1)){
                ++total
            }
        } else if (i == 381) {
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i - 19)){
                ++total
            }
            if(bombs.includes(i + 1)){
                ++total
            }
        } else if (i == 400) {
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i - 19)){
                ++total
            }
            if(bombs.includes(i - 1)){
                ++total
            }
        } else {
            if(bombs.includes(i + 1)){
                ++total
            }
            if(bombs.includes(i + 19)){
                ++total
            }
            if(bombs.includes(i + 20)){
                ++total
            }
            if(bombs.includes(i + 21)){
                ++total
            }
            if(bombs.includes(i - 1)){
                ++total
            }
            if(bombs.includes(i - 19)){
                ++total
            }
            if(bombs.includes(i - 20)){
                ++total
            }
            if(bombs.includes(i - 21)){
                ++total
            }
        }

        document.getElementById(i).innerText = total
        bombsNear[i] = total;
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
const gameButtons = Array.from(game.querySelectorAll(".buttons"))
gameButtons.forEach(button => {
    button.addEventListener("click", e =>{
        var buttonId = getButtonId(button)
        checkForBomb(buttonId)
    })
})
function checkForBomb(buttonId) {
            var isBomb = false
            for(var i = 0; i < bombs.length; ++i) {
                if(buttonId == bombs[i]) {
                    isBomb = true;
                    break;
                }
            }
            if(isBomb) {
                for(var i = 1; i < bombs.length; ++i) {
                    document.getElementById(bombs[i]).style.backgroundColor = 'red'
                    document.getElementById(bombs[i]).disabled = true;
                }
                for(var i = 1; i <= 400; ++i){
                    //document.getElementById(i).disabled = true
                }
            } else {
                if(bombsNear[buttonId] != 0){
                    document.getElementById(buttonId).innerText = bombsNear[buttonId]
                    document.getElementById(buttonId).disabled = true
                } else {
                }
                
            }

    console.log(bombsNear[buttonId])
    console.log(buttonId)
}

function addMark() {
    const allButtons = game.querySelectorAll(".buttons")
    allButtons.forEach(button => {
        button.addEventListener("contextmenu", e =>{
            var buttonId = getButtonId(button)
            document.getElementById(buttonId).style.backgroundColor = 'yellow'
            flags.push(buttonId)
        })
    })
}

