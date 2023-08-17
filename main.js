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

let getPlayerChoice = () => {
    let playerSelection = prompt("Please choose a shape. The valid options are rock, paper, and scissors. If you wish to quit the game, type 'quit'.");

    if (playerSelection.toUpperCase() == 'QUIT') {
        return 'quit';
    }

    if (!validatePlayerChoice(playerSelection)) {
        alert("You chose a wrong shape. Please try again.");
        return;
    }

    return capitalize(playerSelection);
}

let getComputerChoice = () => {
    let computerSelection = shapesArr[getRandomInt(2)];
    return capitalize(computerSelection);
}

function validatePlayerChoice(selection) {
    let shape = selection.toUpperCase();
    if (!(shape in shapes)) {
        return false;
    }
    return true;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return 1;
    } else if (
        (playerSelection == shapes.ROCK && computerSelection == shapes.SCISSORS) ||
        (playerSelection == shapes.SCISSORS && computerSelection == shapes.PAPER) ||
        (playerSelection == shapes.PAPER && computerSelection == shapes.ROCK)
    ) {
        return 2;
    } else {
        return 0;
    }
}

function start() {
    let playerPoints = 0;
    let computerPoints = 0;
    while (playerPoints < 5 && computerPoints < 5) {
        console.log(`The current score is ${playerPoints} - ${computerPoints}!`);
        let playerSelection = getPlayerChoice();
        if (playerSelection == 'quit') {
            console.log("Aborting the game...");
            return console.log("Type start() if you want to play again!");
        }
        if (playerSelection === undefined) continue;

        let computerSelection = getComputerChoice();
        
        result = playRound(playerSelection, computerSelection);
        if (result == 0) {
            console.log(`You lose! ${computerSelection} beats ${playerSelection}!`);
            computerPoints++;
        }
        else if (result == 1) {
            console.log(`It's a tie between ${playerSelection} and ${computerSelection}!`);
        }
        else if (result == 2) {
            console.log(`You win! ${playerSelection} beats ${computerSelection}!`);
            playerPoints++;
        }
    }
    if (playerPoints == 5) {
        console.log(`You win! The final score is ${playerPoints} - ${computerPoints}. Good job!`);
    } else {
        console.log(`You lose. The final score is ${playerPoints} - ${computerPoints}. Better luck next time!`);
    }

    return console.log("Type start() if you want to play again!");
}

console.log("Hello and welcome to my console based game of Rock Paper Scissors! You are playing against your super smart computer. The rules are simple: the first one to get five points wins!");
console.log("Type start() to start the game!");