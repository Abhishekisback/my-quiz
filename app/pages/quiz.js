const questions = {
    A: {
      question: "What year was Dell founded?",
      options: ["1984", "1990", "2000"],
      answer: "1984",
    },
    B: {
      question: "Who founded Dell?",
      options: ["Bill Gates", "Steve Jobs", "Michael Dell"],
      answer: "Michael Dell",
    },
    C: {
      question: "What is Dell’s premium laptop series?",
      options: ["XPS", "ThinkPad", "MacBook"],
      answer: "XPS",
    },
    D: {
      question: "What color is Dell’s logo?",
      options: ["Blue", "Red", "Green"],
      answer: "Blue",
    },
    E: {
      question: "Which OS is pre-installed on most Dell PCs?",
      options: ["Windows", "Linux", "MacOS"],
      answer: "Windows",
    },
    F: {
      question: "Dell’s Alienware brand is known for?",
      options: ["Gaming", "Office Work", "Medical Use"],
      answer: "Gaming",
    },
    G: {
      question: "Where is Dell's headquarters?",
      options: ["Austin, Texas", "San Francisco", "New York"],
      answer: "Austin, Texas",
    },
    H: {
      question: "Which Dell laptop is designed for business use?",
      options: ["Inspiron", "Latitude", "Alienware"],
      answer: "Latitude",
    },
    I: {
      question: "Which Dell monitor series is for professionals?",
      options: ["UltraSharp", "OptiView", "VisionPro"],
      answer: "UltraSharp",
    },
    J: {
      question: "Which company did Dell merge with in 2016?",
      options: ["HP", "EMC", "Lenovo"],
      answer: "EMC",
    },
    K: {
      question: "Which component is Dell known for selling?",
      options: ["GPUs", "Servers", "Smartphones"],
      answer: "Servers",
    },
    L: {
      question: "Which is a Dell software solution?",
      options: ["VMware", "CloudSuite", "ThinkOS"],
      answer: "VMware",
    },
    M: {
      question: "What is Dell’s budget-friendly laptop series?",
      options: ["Latitude", "Inspiron", "XPS"],
      answer: "Inspiron",
    },
    N: {
      question: "What’s Dell’s initiative for sustainability?",
      options: ["EcoWorks", "Recycling Program", "Go Green"],
      answer: "Recycling Program",
    },
    O: {
      question: "What is Dell’s primary business focus?",
      options: ["Automobiles", "Technology", "Retail"],
      answer: "Technology",
    },
  };
  
  let correctAnswers = 0;
  const totalQuestions = Object.keys(questions).length;
  
  let playerName = prompt("Enter your name:") || "Player";
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
  // Create puzzle grid dynamically
  const puzzleGrid = document.getElementById("puzzle-grid");
  Object.keys(questions).forEach((letter) => {
    let tile = document.createElement("div");
    tile.classList.add("puzzle-tile");
    tile.textContent = letter;
    tile.addEventListener("click", () => showQuestion(letter, tile));
    puzzleGrid.appendChild(tile);
  });
  
  // Show question
  function showQuestion(letter, tile) {
    if (!questions[letter]) return;
  
    document.getElementById("question-text").textContent =
      questions[letter].question;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    questions[letter].options.forEach((option) => {
      let btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(letter, option, tile);
      optionsContainer.appendChild(btn);
    });
  }
  
  // Check answer
  function checkAnswer(letter, chosenOption, tile) {
    let correct = questions[letter].answer === chosenOption;
  
    if (correct) {
      tile.style.animation = "correctAnswer 0.5s forwards";
      document.getElementById("correct-sound").play();
      correctAnswers++;
    } else {
      tile.style.animation = "wrongAnswer 0.5s forwards";
      document.getElementById("wrong-sound").play();
    }
  
    tile.removeEventListener("click", () => showQuestion(letter, tile));
    delete questions[letter];
  
    setTimeout(() => {
      if (Object.keys(questions).length === 0) {
        showFinalImage();
      }
    }, 1000);
  }
  
  // Show final image
  function showFinalImage() {
    document.getElementById("question-box").innerHTML = `
          <h2>Game Over!</h2>
          <p>${playerName}, you got ${correctAnswers} out of ${totalQuestions} correct!</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" width="200">
      `;
    updateLeaderboard();
  }
  
  // Update leaderboard
  function updateLeaderboard() {
    leaderboard.push({ name: playerName, score: correctAnswers });
    leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  
    document.getElementById("score-list").innerHTML = leaderboard
      .map((entry) => `<li>${entry.name}: ${entry.score}</li>`)
      .join("");
  }
  
  // Load leaderboard on page load
  document.addEventListener("DOMContentLoaded", updateLeaderboard);
  