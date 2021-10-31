const game = document.getElementById("gameBoard")
var buttonId = 1
var seconds = 0
var time = document.getElementById("timer")
var buttonBoard = []
const numberOfBombs = 30
const validButtons = 370
var bombs = []
var bombsNear = []
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
            buttonBoard.push(k)
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
                if(numberOfBombs != 0) {
                    document.getElementById(buttonId).innerHTML = numberOfBombs
                } else {
                    var copyOfId1 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId1] == 0){
                        document.getElementById(copyOfId1).disabled = true
                        ++copyOfId1
                    }
                    document.getElementById(copyOfId1).innerHTML = buttonBoard[copyOfId1]
                    document.getElementById(copyOfId1).disabled = true
                    var copyOfId2 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId2] == 0){
                        document.getElementById(copyOfId2).disabled = true
                        --copyOfId2
                    }
                    document.getElementById(copyOfId2).innerHTML = buttonBoard[copyOfId2]
                    document.getElementById(copyOfId2).disabled = true
                    var copyOfId3 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId3] == 0){
                        document.getElementById(copyOfId3).disabled = true
                        copyOfId3 -= 20
                    }
                    document.getElementById(copyOfId3).innerHTML = buttonBoard[copyOfId3]
                    document.getElementById(copyOfId3).disabled = true
                    var copyOfId4 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId4] == 0){
                        document.getElementById(copyOfId4).disabled = true
                       copyOfId4 += 20
                    }
                    document.getElementById(copyOfId4).innerHTML = buttonBoard[copyOfId4]
                    document.getElementById(copyOfId4).disabled = true
                    var copyOfId5 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId5] == 0){
                        document.getElementById(copyOfId5).disabled = true
                        copyOfId5 -= 19
                    }
                    document.getElementById(copyOfId5).innerHTML = buttonBoard[copyOfId5]
                    document.getElementById(copyOfId5).disabled = true
                    var copyOfId6 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId6] == 0){
                        document.getElementById(copyOfId6).disabled = true
                        copyOfId6 += 19
                    }
                    document.getElementById(copyOfId6).innerHTML = buttonBoard[copyOfId6]
                    document.getElementById(copyOfId6).disabled = true
                    var copyOfId7 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId7] == 0){
                        document.getElementById(copyOfId7).disabled = true
                        copyOfId7 -= 21
                    }
                    document.getElementById(copyOfId7).innerHTML = buttonBoard[copyOfId7]
                    document.getElementById(copyOfId7).disabled = true
                    var copyOfId8 = parseInt(buttonId) 
                    while(buttonBoard[copyOfId8] == 0){
                        document.getElementById(copyOfId8).disabled = true
                        copyOfId8 += 21
                    }
                    document.getElementById(copyOfId8).innerHTML = buttonBoard[copyOfId8]
                    document.getElementById(copyOfId8).disabled = true
                }
                 
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
        if(bombs[i] == buttonId + 1 || bombs[i] == buttonId + 19 || bombs[i] == buttonId + 20 || bombs[i] == buttonId + 21
        ||bombs[i] == buttonId - 1 || bombs[i] == buttonId - 19 || bombs[i] == buttonId - 20 || bombs[i] == buttonId - 21 ) {
            ++totalBombsNear;
        }
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
