const shapes = {
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors'
};

const shapesArr = Object.keys(shapes);

// gets a random int between 0 and rightBound (inclusive)
let getRandomInt = (rightBound) => Math.floor(Math.random() * (rightBound+1));

let capitalize = (word) => {
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
}

let getComputerSelection = () => {
    let computerSelection = shapesArr[getRandomInt(2)];
    return capitalize(computerSelection);
}

function playRound(playerSelection) {
    let computerSelection = getComputerSelection();
    if (playerSelection == computerSelection) {
        return [1, playerSelection, computerSelection];
    } else if (
        (playerSelection == shapes.ROCK && computerSelection == shapes.SCISSORS) ||
        (playerSelection == shapes.SCISSORS && computerSelection == shapes.PAPER) ||
        (playerSelection == shapes.PAPER && computerSelection == shapes.ROCK)
    ) {
        return [2, playerSelection, computerSelection];
    } else {
        return [0, playerSelection, computerSelection];
    }
}

function proccessRoundResult(result) {
    let resultCode = result[0];
    let playerSelection = result[1];
    let computerSelection = result[2];

    if (playerPoints == 0 && computerPoints == 0 && roundResultBoard.nextElementSibling.classList.contains('game-over')) {
        document.querySelectorAll('.game-over').forEach(e => {
            content.removeChild(e);
        });
    }

    if (resultCode == 1) {
        roundResultBoard.textContent = `${playerSelection} vs ${computerSelection}! It's a draw!`;
    } else if (resultCode == 0) {
        roundResultBoard.textContent = `${playerSelection} vs ${computerSelection}! Computer wins!`;
        computerPoints++;
    } else {
        roundResultBoard.textContent = `${playerSelection} vs ${computerSelection}! Player wins!`;
        playerPoints++;
    }

    scoreBoard.textContent = `The current score is ${playerPoints} - ${computerPoints}`;

    if (playerPoints == 5 || computerPoints == 5) {
        const resultBoard = document.createElement('div');
        resultBoard.classList.add('game-over'); 
        let winner = (playerPoints == 5) ? 'Player' : 'Computer';
        resultBoard.textContent = (winner == 'Player') ? 'Victory! ' : 'Defeat! ';
        resultBoard.textContent += `The winner is ${winner}!`;
        resultBoard.style.margin = '-30px 0 40px 0';
        resultBoard.style.fontSize = '40px';
        resultBoard.style.color = (winner == 'Player') ? 'chartreuse' : 'crimson'; 
        content.insertBefore(resultBoard, document.querySelector('.buttons'));

        const playAgain = document.createElement('div');
        playAgain.classList.add('game-over'); 
        playAgain.style.margin = '-30px 0 40px 0';
        playAgain.style.fontSize = '40px';
        playAgain.textContent = 'Choose a shape to play again!';
        content.insertBefore(playAgain, document.querySelector('.buttons'));
        playerPoints = 0;
        computerPoints = 0;
    }
}

let playerPoints = 0;
let computerPoints = 0;

const content = document.querySelector('.content');

const scoreBoard = document.querySelector('.score');
const roundResultBoard = document.querySelector('.round-result')

const buttons = document.querySelectorAll('button');

const rockButton = buttons[0];
const paperButton = buttons[1];
const scissorsButton = buttons[2];

rockButton.addEventListener('click', () => {
    let result = playRound('Rock');
    proccessRoundResult(result);
});

paperButton.addEventListener('click', () => {
    let result = playRound('Paper');
    proccessRoundResult(result);
});

scissorsButton.addEventListener('click', () => {
    let result = playRound('Scissors');
    proccessRoundResult(result);
});