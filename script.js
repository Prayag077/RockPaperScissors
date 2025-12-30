let userScore = 0;
let compScore = 0;
let soundUnlocked = false;

const choices = document.querySelectorAll(".choice");
const msg = document.getElementById("msg");
const userEl = document.getElementById("user-score");
const compEl = document.getElementById("comp-score");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("themeToggle");
const gameCard = document.querySelector(".game");

function triggerShake() {
  gameCard.classList.remove("win");
  gameCard.classList.remove("shake");
  void gameCard.offsetWidth;
  gameCard.classList.add("shake");
}

const sounds = {
  click: new Audio("./sounds/click.mp3"),
  win: new Audio("./sounds/win.mp3"),
  lose: new Audio("./sounds/lose.mp3"),
  draw: new Audio("./sounds/draw.mp3")
};

Object.values(sounds).forEach(s => s.volume = .6);

function unlockSounds() {
  if (soundUnlocked) return;
  Object.values(sounds).forEach(sound => {
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
    }).catch(() => { });
  });
  soundUnlocked = true;
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

function getComputerChoice() {
  const options = ["rock", "paper", "scissor"];
  return options[Math.floor(Math.random() * options.length)];
}

function playSound(sound) {
  const s = sound.cloneNode();
  s.volume = 0.6;
  s.play();
}

function setMessage(text, type) {
  msg.textContent = text;
  msg.className = "message " + type;
}

function playRound(userChoice) {
  playSound(sounds.click);

  const compChoice = getComputerChoice();

  if (userChoice === compChoice) {
    playSound(sounds.draw);
    setMessage("It's a Draw!", "draw");
    return;
  }

  const userWins =
    (userChoice === "rock" && compChoice === "scissor") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissor" && compChoice === "paper");

  if (userWins) {
    userScore++;
    userEl.textContent = userScore;
    playSound(sounds.win);
    confetti({ particleCount: 120, spread: 70 });
    setMessage(`You Win! ${userChoice} beats ${compChoice}`, "win");
    gameCard.classList.remove("shake"); // ❗ stop shake
    gameCard.classList.add("win");
    setTimeout(() => gameCard.classList.remove("win"), 350);
  } else {
    compScore++;
    compEl.textContent = compScore;
    playSound(sounds.lose);
    setMessage(`You Lose! ${compChoice} beats ${userChoice}`, "lose");
    triggerShake();
  }
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    choices.forEach(c => c.classList.remove("active"));
    choice.classList.add("active");

    unlockSounds();
    playRound(choice.dataset.choice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userEl.textContent = 0;
  compEl.textContent = 0;
  msg.className = "message";
  msg.textContent = "Make your move";
  choices.forEach(c => c.classList.remove("active"));
});
