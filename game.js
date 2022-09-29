const gameGrid = document.querySelectorAll('.game-grid > div')
const gameContainer = document.querySelector('.game-container')
const characterFormButton = document.querySelector('.create-button')
const gameMenu = document.querySelector('.game-menu')
const startGameContainer = document.querySelector('.start-game-container')
const startGameButton = document.querySelector('.startgame-button')
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

gameGrid.forEach((grid) => {
    grid.addEventListener('click', function () {
        if (blockGrid === false) {
            grid.innerHTML = playerOne.playerMark
            gameBoard[grid.classList.value] = (playerOne.playerMark)
            grid.style.backgroundColor = '#930C10'
            if (playerOne.checkWinnings() === true) {
                playerOne.checkWinnings().innerHTML = 'R'
                playerTwo.takeDamage(20);
                blockGrid = true;
                setTimeout(function () {
                    playerOne.roundWinner()
                }, 1000);
                playerTwo.updatePlayerInfo();
            }

        }
    })
}

)

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









// const gameController = () => {
//     const playerLoseRound = () => {
//         playerOne.loseHealth(10)
//     }
//     return { playerLoseRound, createCharacter, Character }
// }



//////////////I have to figure how to control the class via the "gameController"///
// function Character(playerName, playerClass) {
//     switch (playerClass) {
//         case 'warrior':
//             maxHealth = 120;
//             break;
//         case 'archer':
//             maxHealth = 100;
//             break;
//         case 'mage':
//             maxHealth = 80;
//             break;
//     }
//     this.playerName = playerName;
//     this.playerClass = playerClass;
//     this.maxHealth = maxHealth;
//     this.currentHealth = maxHealth;//player starts with 100% life
// }
// Character.prototype.loseHealth = function (amount) {
//     this.currentHealth = this.currentHealth - amount
// }