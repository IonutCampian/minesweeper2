const game = document.getElementById("gameBoard")
var buttonId = 1
var seconds = 0
var time = document.getElementById("timer")
var buttonBoard = []
const numberOfBombs = 30
const validButtons = 370
var bombs = []
var bombsNear = []
const allPossibleButtons = []
var up = parseInt([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
var down = parseInt([382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399])
var left = parseInt([21,41,61,81,101,121,141,161,181,201,221,241,261,281,301,321,341,361])
var right = parseInt([40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380])
createBoard()
generateBombs()
checkForBomb()
addMark()
addBombPosition()
function createBoard() {
    var k = 1;
    for(var i = 1; i <= 20; ++i) {
        for (var j = 1; j <= 20; ++j) {
            var button = document.createElement("button")
            button.setAttribute("id", k)
            button.setAttribute("class", "buttons")
            game.appendChild(button)
            allPossibleButtons.push(parseInt(k))
            ++k
           
        }
    }
}

function generateBombs() {
    for(var i = numberOfBombs; i > 0; --i) {
        var randomNumber = Math.floor(Math.random() * 400 - 1 + 1)
        if(!(bombs.includes(randomNumber)) && randomNumber != 0) {
            bombs.push(parseInt(randomNumber))
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
    allButtons.forEach(button => {
        button.addEventListener('click', e => {
            var isBomb = false
            var buttonId = parseInt(getButtonId(button)) 
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
                var numberOfBombs = checkNumberOfBombs(buttonId, bombs)
                document.getElementById(buttonId).innerHTML = numberOfBombs
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

function checkNumberOfBombs(buttonId, bombs) {
    var totalBombsNear = 0
    for(var i = 0; i < bombs.length; ++i) {
        if(buttonId == 1){
            if(bombs[i] == buttonId + 1) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 20) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 21){
                ++totalBombsNear
            }
        } else if (buttonId == 20) {
            if(bombs[i] == buttonId - 1) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 20) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId +19){
                ++totalBombsNear
            }
        } else if (buttonId == 381) {
            if(bombs[i] == buttonId + 1) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 20) {
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 19){
                ++totalBombsNear
            }
        } else if (checkMargins(buttonId, up)){
            if(bombs[i] == buttonId - 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 19){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId +20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 21){
                ++totalBombsNear
            }
        } else if (checkMargins(buttonId, down)){
            if(bombs[i] == buttonId - 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 19){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 21){
                ++totalBombsNear
            }   
        } else if (checkMargins(buttonId, left)) {
            if(bombs[i] == buttonId - 20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 19){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 21){
                ++totalBombsNear
            }
        } else if (checkMargins(buttonId, right)){
            if(bombs[i] == buttonId - 1){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 19){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId - 20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId +20){
                ++totalBombsNear
            }
            if(bombs[i] == buttonId + 19){
                ++totalBombsNear
            }
        }
        
    }
    if(totalBombsNear == 0) {
        totalBombsNear = compareSquers(buttonId, bombs)
    }

    return totalBombsNear
}

function addBombPosition() {
    for(var i = 1; i <= 400; ++i) {
        var bombsNear = checkNumberOfBombs(i, bombs)
        if(bombsNear != 0) {
            buttonBoard[i] = parseInt(bombsNear)
        }
        else {
            buttonBoard[i] = parseInt(0)
        }
    }
    console.log(buttonBoard)
}

function checkMargins(buttonId, margin) {
    for(var i = 0; i < margin.length; ++i){
        if(margin[i] == buttonId){
            return true;
        }
    }
    return false
}

function compareSquers (square, bombs) {
    var rez = 0
    for(var i = 0; i < bombs.length; ++i) {
        if(bombs[i] == square + 1)
        ++rez
        if(bombs[i] == square + 19)
        ++rez
        if (bombs[i] == square + 20) 
        ++rez
        if (bombs[i] == square + 21)
        ++rez
        if (bombs[i] == square - 19)
        ++rez
        if(bombs[i] == square - 20)
        ++rez
        if(bombs[i] == square - 21)
        ++rez
        if(bombs[i] == square - 1)
        ++rez
    }
    return rez
}
