import "../scss/main.scss";
import pathetic from "../assets/img/pathetic.jpg";
import notbad from "../assets/img/not-bad.jpg";
import soso from "../assets/img/so-so.jpg";

// place your code below

const nextAudio = document.querySelector(".audio__next");
const answerAudio = document.querySelector(".audio__answer");
const question = document.querySelector(".game__question");
const answers = Array.from(document.querySelectorAll(".answer"));
const button = document.querySelector(".button");
const username = sessionStorage.getItem("username");
const category = sessionStorage.getItem("category");
const difficulty = sessionStorage.getItem("difficulty");
let score = 0;
const body = document.getElementsByTagName("body");
let question__counter = 1;
const questions__amount = 10;
const counter = document.querySelector(".counter");
const counter__circle = document.querySelector(".counter__circle");
const loader = document.querySelector(".loader");
const main = document.querySelector(".main");
const progress__bar = document.querySelector(".progress__inner");
let bonus = 1;
if (difficulty == "medium") {
  bonus = 1.25;
} else if (difficulty == "hard") {
  bonus = 1.5;
}

const max__points = questions__amount;
let available__questions = [];
let questions = [];

if (button) {
  function newGame() {
    button.disabled = true;
    score = 0;
    available__questions = [...questions];

    getQuestion();
  }

  fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
  )
    .then((resp) => resp.json())
    .then((resp) => {
      const results = resp.results;
      questions = results.map((result) => {
        const formatedQuestion = {
          question: result.question,
        };
        const formatedAnswers = [...result.incorrect_answers];
        formatedQuestion.correct = Math.floor(Math.random() * 4);
        formatedAnswers.splice(
          formatedQuestion.correct,
          0,
          result.correct_answer
        );

        formatedAnswers.forEach((choice, index) => {
          formatedQuestion["answer" + index] = choice;
        });
        return formatedQuestion;
      });
      loader.classList.add("loader__hidden");
      main.classList.remove("main__hidden");
      newGame();
    });

  function getQuestion() {
    counter.innerHTML = "10";
    progress__bar.style.width = `${
      (question__counter / questions__amount) * 100
    }%`;

    function countdown() {
      let value = counter.innerHTML;
      value = (value - 0.1).toFixed(1);
      counter.innerHTML = value;
      if (value == 0.1) {
        if (
          available__questions.length == 0 &&
          question__counter == questions__amount
        ) {
          localStorage.setItem(username, score);
          window.location = "score.html";
        }
        stopInterval();
        setTimeout(getQuestion(), 10);
        question__counter++;
      }
    }

    const timer = setInterval(countdown, 100);
    function stopInterval() {
      clearInterval(timer);
    }

    
    
    let question__index = Math.floor(
      Math.random() * available__questions.length
    );
    let current__question = available__questions[question__index];
    question.innerHTML = current__question.question;
    available__questions.splice(question__index, 1);

    answers.forEach((answer) => {
      const number = answer.dataset["number"];
      answer.innerText = current__question["answer" + number];
      answer.classList.remove("answer-active");
      answer.classList.remove("answer-correct");
      answer.classList.remove("answer-wrong");

      //interactions
      answer.addEventListener("click", (e) => {
        nextAudio.play();
        button.disabled = false;
        button.classList.add("button-active");
        answers.forEach((answer) => {
          answer.classList.remove("answer-active");
        });
        answer.classList.add("answer-active");
      });
    });
    function scoring() {
      if (
        answers[current__question.correct].classList.contains("answer-active")
      ) {
        score++;
        console.log(score);
      }

      if (
        available__questions.length == 0 &&
        question__counter == questions__amount
      ) {
        const finalScore = score * bonus;
        localStorage.setItem(username, finalScore);

        window.location = "score.html";
      }
      answers[current__question.correct].classList.add("answer-correct");
      answers.forEach((answer)=>{
        if(answer.classList.contains('answer-active') && (!answer.classList.contains('answer-correct'))){
          answer.classList.add('answer-wrong')

        }
      })
      answerAudio.play();
      stopInterval();
      button.disabled=true;
      button.classList.remove("button-active");
      setTimeout(getQuestion, 1000);
      question__counter++;
    }

    button.addEventListener("click", scoring);
    button.addEventListener("click", (e) => {
      button.removeEventListener("click", scoring);
    });
  }
}
const result = document.querySelector(".score");
const image = document.querySelector(".score__image");

if (result) {
  const points = localStorage.getItem(username);
  const ratio = points / max__points;
  result.innerHTML = `Your score: ${points}`;
  if (ratio > 0.7) {
    image.setAttribute("src", "img/not-bad.d2bbc814.jpg");
  } else if (ratio > 0.4 && ratio <= 0.7) {
    image.setAttribute("src", "img/so-so.db4239c6.jpg");
    image.classList.add("result-image");
  } else {
    image.setAttribute("src", "img/pathetic.3a8ef60f.jpg");
  }
}
const table = document.querySelector(".table");
if (table) {
  localStorage.removeItem(`loglevel:webpack-dev-server`);
  const data = { ...localStorage };
  const sortable = [];
  for (let username in data) {
    sortable.push([username, data[username]]);
  }
  const sorted = sortable.sort((a, b) => {
    return b[1] - a[1];
  });
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i][0] == username && sorted.length > 1) {
      table.tBodies[0].innerHTML += `<tr style="font-weight:bold; background-color:rgb(163, 154, 154);">
      <td>${i + 1}</td>
      <td>${sorted[i][0]}</td>
      <td>${sorted[i][1]}</td>    
  </tr>`;
    } else {
      table.tBodies[0].innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${sorted[i][0]}</td>
      <td>${sorted[i][1]}</td>    
  </tr>`;
    }
  }
}
