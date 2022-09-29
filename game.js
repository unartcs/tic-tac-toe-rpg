const gameGrid = document.querySelectorAll('.game-grid > div')
const gameContainer = document.querySelector('.game-container')
const characterFormButton = document.querySelector('.create-button')
const gameMenu = document.querySelector('.game-menu')
const startGameContainer = document.querySelector('.start-game-container')
const startGameButton = document.querySelector('.startgame-button')
const gameAlert = document.querySelector('.game-alert')
const goBackButton = document.querySelector('.goback-button')
const playerOneContainer = document.querySelector('.player-one-container')
const playerTwoContainer = document.querySelector('.player-two-container')
let playerOne;
let blockGrid;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*
I think I could majorly improve the code instead of using 2 different functions to calculate playerOne win and playerTwo win (computer)
I could use the factory function, also could use the factory function to control gameAlert, style etc..
Not sure, but maybe I should revamp the code
*/

gameGrid.forEach((grid) => {
    grid.addEventListener('click', function () {
        if (grid.innerHTML != '') { return; }
        if (blockGrid === false) {
            grid.innerHTML = playerOne.playerMark
            gameBoard[grid.classList.value] = (playerOne.playerMark)
            grid.style.backgroundColor = '#930C10'
            computerTurn();
            if (playerOne.checkWinnings() === true) {
                gameAlert.innerHTML = `${playerOne.playerName} won!`;
                gameAlert.style.visibility = 'visible';
                playerTwo.takeDamage(20);
                blockGrid = true;
                setTimeout(function () {
                    gameAlert.style.visibility = 'collapse';
                    playerOne.roundWinner()
                }, 2000);
                playerTwo.updatePlayerInfo();
            }
        }
    })
})

function computerTurn() {
    gridsAreFull = gameBoard.every((grid) => grid != '')
    computerChoice = Math.floor(Math.random() * gameBoard.length)
    grid = document.getElementById(computerChoice)
    if (gridsAreFull === true && blockGrid != true) {
        gameAlert.innerHTML = 'Draw!'
        gameAlert.style.visibility = 'visible';
        setTimeout(function () {
            gameAlert.style.visibility = 'collapse';
            playerTwo.declareDraw();
        }, 2000);
    }
    else if (gameBoard[computerChoice] != '') {
        computerTurn();
    }
    else {
        grid.innerHTML = playerTwo.playerMark
        grid.style.backgroundColor = '#47780c'
        gameBoard[grid.classList.value] = (playerTwo.playerMark)
        if (playerTwo.checkWinnings() === true) {
            gameAlert.innerHTML = `${playerTwo.playerName} won!`;
            gameAlert.style.visibility = 'visible';
            playerOne.takeDamage(20);
            blockGrid = true;
            setTimeout(function () {
                gameAlert.style.visibility = 'collapse';
                playerTwo.roundWinner()
            }, 2000);
            playerOne.updatePlayerInfo();
        }
    }
}

characterFormButton.addEventListener('click', function (e) {
    let pName = document.forms["character-creation"]["playerName"].value
    let pClass = document.forms["character-creation"]["playerClass"].value
    if (pName != '') {
        e.preventDefault();
        playerOne = gameControl(pName, pClass, 'X', playerOneContainer)
        playerOne.setMaxHealth();
        playerOne.updatePlayerInfo();
        playerTwo = gameControl('Computer', 'warrior', 'O', playerTwoContainer) // Can choose here to fight a second player
        playerTwo.setMaxHealth();
        playerTwo.updatePlayerInfo();                 // Change here to setup a second player and not a computer
        gameMenu.style.visibility = 'collapse';
        startGameContainer.style.visibility = 'visible'
    }
})

goBackButton.addEventListener('click', function () {
    gameMenu.style.visibility = 'visible';
    startGameContainer.style.visibility = 'collapse'
})

startGameButton.addEventListener('click', function () {
    gameContainer.style.visibility = 'visible';
    startGameContainer.style.visibility = 'collapse'
    blockGrid = false;
})


const gameControl = (playerName, playerClass, playerMark, playerDOM) => {
    return {
        playerName: playerName,
        playerClass: playerClass,
        playerMark: playerMark,
        maxHealth: this.maxHealth,
        currentHealth: this.currentHealth,
        playerDOM: this.playerDOM,
        setMaxHealth() {
            switch (playerClass) {
                case 'warrior':
                    this.maxHealth = 120;
                    this.currentHealth = this.maxHealth
                    break;
                case 'archer':
                    this.maxHealth = 100;
                    this.currentHealth = this.maxHealth
                    break;
                case 'mage':
                    this.maxHealth = 80;
                    this.currentHealth = this.maxHealth
                    break;
            }
        },
        takeDamage(amount) {
            if (this.currentHealth > 0) {
                this.currentHealth = this.currentHealth - amount
            }
            else { playerDeath(); }
        },
        playerDeath() {
            //Gameover here
        },
        checkWinnings() {
            return winCombos.some(combo => {
                return combo.every(comboIndex => {
                    return gameBoard[comboIndex] === playerMark;
                })
            })
        },
        declareDraw() {
            gameBoard = new Gameboard();
            blockGrid = false;
            gameGrid.forEach((grid) => {
                grid.innerHTML = ''
                grid.style.backgroundColor = ''

            })
        },
        roundWinner() {
            //Need to clear board, add a winner effect (maybe the winning tiles glow?)
            //Add a delay before clearing board so its clear that there is a winner
            gameBoard = new Gameboard();
            blockGrid = false;
            gameGrid.forEach((grid) => {
                grid.innerHTML = ''
                grid.style.backgroundColor = ''
            })
        },
        updatePlayerInfo() {
            parent = playerDOM;
            pName = parent.children[1]
            pHealth = parent.children[2]
            pName.innerHTML = this.playerName;
            pHealth.innerHTML = `${this.currentHealth} / ${this.maxHealth}`;
            color1Value = (this.maxHealth - this.currentHealth) / (this.maxHealth);
            color1FixValue = 100 - 100 * color1Value;
            if (this.maxHealth != this.currentHealth) { color1 = `green ${color1FixValue}% `; color2 = `red ${color1FixValue}% `; } else { color1 = 'green 100%'; color2 = 'red 100%' }
            color3 = 'red 100%'
            pHealth.style.background = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`
        }
    }
}

const Gameboard = function () {
    let gameBoard = new Array;
    for (let i = 0; i < 9; i++) {
        gameBoard.push('')
    }
    return gameBoard
}

let gameBoard = new Gameboard();