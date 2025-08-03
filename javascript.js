let compScore = 0;
let userScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userPoints = document.querySelector("#user-score");
const compPoints = document.querySelector("#comp-score");
const resetMsg = document.querySelector("#reset");
const body = document.querySelector("body");


resetMsg.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userPoints.innerText = "0";
    compPoints.innerText = "0";
    const tapSound = new Audio('https://www.myinstants.com/media/sounds/clicksoundeffect.mp3');
    tapSound.play();
    body.style.backgroundColor = "#E8E1EF";
    msg.innerText = "Play your move!";
    resetMsg.classList.add("hide");
})

const showConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};

const showDislikeConfetti = () => {
    confetti({
        particleCount: 10,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#444444', '#222222', '#555555', '#000000', '#7a7a7a'],
        scalar: 1.2,
        gravity: 1.5,
        decay: 0.95,
        shapes: ['square'],
        ticks: 200,
        zIndex: 9999,
    });
};


const genCompChoice = () => {
    const options = ["paper", "rock", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {

        body.style.backgroundColor = "yellow";

        showConfetti();
        const tapSound = new Audio(`https://www.myinstants.com/media/sounds/orb.mp3`);
        tapSound.play();
        console.log("You Win!");
        userScore++;
        userPoints.innerText = userScore;
        msg.innerText = `You Win! your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {

        showDislikeConfetti();
        body.style.backgroundColor = "brown";

        const tapSound = new Audio(`https://www.myinstants.com/media/sounds/minecraft_hit_soundmp3converter.mp3`);
        tapSound.play();
        console.log("You Lose");
        compScore++;
        compPoints.innerText = compScore;
        msg.innerText = `You loose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    console.log(`User: ${userScore} | Computer: ${compScore}`);
};

const playGame = (userChoice) => {
    resetMsg.classList.remove("hide");
    console.log("User Choice:", userChoice);

    const compChoice = genCompChoice();
    console.log("Computer Choice:", compChoice);

    if (userChoice === compChoice) {
        const tapSound = new Audio(`https://www.myinstants.com/media/sounds/bow_shoot.mp3`);
        body.style.backgroundColor = "pink";
        tapSound.play();
        console.log('Game Was Draw.');
        msg.innerText = "Game Was Draw. Play Again.";
        msg.style.backgroundColor = "#6A7FDB";
        return;
    }

    let userWin = true;
    if (userChoice === "paper") {
        userWin = compChoice === "scissor" ? false : true;
    } else if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "scissor") {
        userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        choice.addEventListener("mousedown", () => {
            choice.style.opacity = "0.5";
        });

        choice.addEventListener("mouseup", () => {
            choice.style.opacity = "1";
        });

        choice.addEventListener("mouseleave", () => {
            choice.style.opacity = "1";
        });
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
