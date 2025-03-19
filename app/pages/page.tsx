"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./styles.css";

type QuestionData = {
  question: string;
  options: string[];
  answer: string;
};

type QuestionsType = Record<string, QuestionData>;

type LeaderboardEntry = {
  name: string;
  score: number;
};

const questionsData: QuestionsType = {
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

const QuizPage = () => {
  const [questions, setQuestions] = useState<QuestionsType>(questionsData);
  const [selectedQuestion, setSelectedQuestion] = useState<
    (QuestionData & { letter: string }) | null
  >(null);
  const [tileStatus, setTileStatus] = useState<
    Record<string, "correct" | "wrong" | "unattempted">
  >({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    ) as LeaderboardEntry[];
    setLeaderboard(storedLeaderboard);
  }, []);

  const handleTileClick = (letter: string) => {
    if (tileStatus[letter]) return;
    setSelectedQuestion({ letter, ...questions[letter] });
  };

  const checkAnswer = (chosenOption: string) => {
    if (!selectedQuestion) return;

    const isCorrect = selectedQuestion.answer === chosenOption;
    setTileStatus((prev) => ({
      ...prev,
      [selectedQuestion.letter]: isCorrect ? "correct" : "wrong",
    }));

    const updatedQuestions = { ...questions };
    delete updatedQuestions[selectedQuestion.letter];
    setQuestions(updatedQuestions);
    setSelectedQuestion(null);

    if (Object.keys(updatedQuestions).length === 0) {
      setShowLogo(true);
      updateLeaderboard();
    }
  };

  const updateLeaderboard = () => {
    const playerName = prompt("Enter your name:") || "Player";
    const updatedLeaderboard = [
      ...leaderboard,
      { name: playerName, score: Object.keys(tileStatus).length },
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    setLeaderboard(updatedLeaderboard);
  };

  return (
    <div>
      <header>
        <h1>TECHZORITE - The Puzzle Mania</h1>
        <p>Click letters, answer Dell trivia, and reveal the hidden image!</p>
      </header>
      <main>
        <div id="game-container">
          <div id="puzzle-grid">
            {Object.keys(questionsData).map((letter) => (
              <div
                key={letter}
                className={`puzzle-tile ${tileStatus[letter] || "unattempted"}`}
                onClick={() => handleTileClick(letter)}
              >
                {letter}
              </div>
            ))}
          </div>
          <div id="question-box">
            {selectedQuestion ? (
              <div>
                <p>{selectedQuestion.question}</p>
                <div id="options">
                  {selectedQuestion.options.map((option, index) => (
                    <button key={index} onClick={() => checkAnswer(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Click a letter to start!</p>
            )}
          </div>
        </div>
        <div id="leaderboard">
          <h2>Leaderboard</h2>
          <ol>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {entry.name}: {entry.score}
              </li>
            ))}
          </ol>
        </div>
        {showLogo && (
          <div id="dell-logo">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlpCfzsaHmQd-Ph0XaBqTGPbpfAY4qmg8bQ&s"
              alt="Dell Logo"
              width={300}
              height={300}
            />
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2025 TECHZORITE - Dell Trivia Game</p>
      </footer>
      <style jsx>{`
        #game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        #puzzle-grid {
          display: grid;
          grid-template-columns: repeat(5, 60px);
          gap: 10px;
          margin-bottom: 20px;
        }
        .puzzle-tile {
          padding: 10px;
          margin: 5px;
          cursor: pointer;
          border: 1px solid black;
          text-align: center;
          font-weight: bold;
        }
        .correct {
          background-color: green;
          color: white;
        }
        .wrong {
          background-color: red;
          color: white;
        }
        .unattempted {
          background-color: blue;
          color: white;
        }
        #leaderboard {
          margin-top: 20px;
          text-align: center;
        }
        #dell-logo {
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
