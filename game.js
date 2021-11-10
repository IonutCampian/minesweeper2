const game = document.getElementById("gameBoard")
var buttonId = 1
var seconds = 0
var time = document.getElementById("timer")
var buttonBoard = []
const numberOfBombs = 60
const validButtons = 370
var bombs = []
var bombsNear = []
let allPossibleButtons = []
let flags = []
var left = [21,41,61,81,101,121,141,161,181,201,221,241,261,281,301,321,341,361]
var right =[40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380]
var up = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
var down = [382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399]
createBoard()
generateBombs()
function createBoard() {
    for(var i = 1; i <= 400; ++i) {
            var button = document.createElement("button")
            button.setAttribute("id", i)
            button.setAttribute("class", "buttons")
            //button.innerText = i
            game.appendChild(button)
            allPossibleButtons[i] = i
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

    for( let i = 1; i <= 400; ++i) {
        var total = 0
        if(i != 1 && i != 400 && i != 381 && i != 20 && !bombs.includes(i) && !left.includes(i) && !right.includes(i) &&
        !up.includes(i) && !down.includes(i)) {
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
        } else if (left.includes(i)){
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
        }
            //document.getElementById(i).innerText = total
        bombsNear[i] = total;
    }
    console.log(bombs)
}

const allButtons = game.querySelectorAll(".buttons")
allButtons.forEach( button => {
    button.addEventListener("click", e => {
        var id = button.getAttribute("id")
        check(id)
    })
})

function checkForBomb(button) {
    var isBomb = false
    for(var i = 0; i < bombs.length; ++i) {
        if(bombs[i] == button){
            isBomb = true
        }
    }
    return isBomb
}
    
function check(button) {
    
    if(bombs.includes(button) || flags.includes(button)) {
        return
    }
    var gameOver = false
    if(checkForBomb(button)) {
        for(var i = 0; i <bombs.length; ++i) {
            document.getElementById(bombs[i]).style.backgroundColor = 'red'
            document.getElementById(bombs[i]).disabled = true
        }
        gameOver = true
    } else {
        if(bombsNear[button] > 0) {
        document.getElementById(button).innerText = bombsNear[button]
        document.getElementById(button).disabled = true
        return  
        }
        document.getElementById(button).disabled = true
        checkSquare(button)  
    } 

}

function checkSquare(button) {
    setTimeout(() => {
        if(button == 1) {
            var newButton = button + 1
            var newButton2 = button + 20
            var newButton3 = button + 21
            check(newButton)
            check(newButton2)
            check(newButton3)
        } else if (button == 20) {
            var newButton = button - 1
            var newButton2 = button + 20
            var newButton3 = button + 19
            check(newButton)
            check(newButton2)
            check(newButton3)
        } else if (button == 381) {
            var newButton = button + 1
            var newButton2 = button - 20
            var newButton3 = button - 19
            check(newButton)
            check(newButton2)
            check(newButton3)
        } else if (button == 400) {
            var newButton = button - 1
            var newButton2 = button - 20
            var newButton3 = button - 21
            check(newButton)
            check(newButton2)
            check(newButton3)
        } else if(up.includes(button)) {
            var newButton = button - 1
            var newButton2 = button + 1
            var newButton3 = button + 19
            var newButton4 = button + 20
            var newButton5 =  button + 21
            check(newButton)
            check(newButton2)
            check(newButton3)
            check(newButton4)
            check(newButton5)
        } else if(down.includes(button)) {
            var newButton = button - 1
            var newButton2 = button + 1
            var newButton3 = button + 19
            var newButton4 = button + 20
            var newButton5 = button + 21
            check(newButton)
            check(newButton2)
            check(newButton3)
            check(newButton4)
            check(newButton5)
        }
    }, 10)
}


allButtons.forEach(button => {
    button.addEventListener("contextmenu", e => {
        var id = button.getAttribute("id")
        document.getElementById(id).style.backgroundColor = "yellow"
        flags.push(id)
    })
})

