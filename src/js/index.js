import '../scss/main.scss';


/* place your code below */

// service worker registration - remove if you're not going to use it
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("serviceworker.js").then(
        function (registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
  
  // place your code below
  
  const question = document.querySelector(".game__question");
  const answers = Array.from(document.querySelectorAll(".answer"));
  const button = document.querySelector('.button');
  let score = 0;
  const body = document.getElementsByTagName('body')
  let question__counter = 1;
  const questions__amount = 4;
  const questions = [
    {
      question: "What is the capital of Slovenia?",
      answer0: "Bratislava",
      answer1: "Zagreb",
      answer2: "Lublana",
      answer3: "Skopje",
      correct: 2,
    },
    {
      question: "Which of these rivers is the longest?",
      answer0: "Dniepr",
      answer1: "Missisipi",
      answer2: "Ganges",
      answer3: "Loara",
      correct: 1,
    },
    {
      question: "In which city you can find Willis/Sears tower?",
      answer0: "New York",
      answer1: "Baltimore",
      answer2: "London",
      answer3: "Chicago",
      correct: 3,
    },
    {
      question: "Which city held 1988 Olympics?",
      answer0: "Los Angeles",
      answer1: "Moscow",
      answer2: "Atlanta",
      answer3: "Seul",
      correct: 3,
    },
  ];
  
  let available__questions = [];
  if(button){
  function newGame() {
    button.disabled = true;
    score = 0;
    available__questions = [...questions];
    
    getQuestion();
  }
  
  
  function getQuestion() {
    button.disabled = true
    button.classList.remove('button-active');
    let question__index = Math.floor(Math.random() * available__questions.length);
    let current__question = available__questions[question__index];
    question.innerHTML = current__question.question;
    available__questions.splice(question__index, 1);
  
  
    
  
    answers.forEach((answer) => {
      const number = answer.dataset["number"];
      answer.innerText = current__question["answer" + number];
      answer.classList.remove('answer-active')
  
      //interactions
      answer.addEventListener('click', (e)=>{
        button.disabled = false;
        button.classList.add('button-active')
        answers.forEach((answer) => {answer.classList.remove('answer-active')})
        answer.classList.add('answer-active');
  
        
    })})
    function scoring(){
      if(answers[current__question.correct].classList.contains('answer-active')){
      score++;
    console.log(score);
  }
      if((available__questions.length)==0 && question__counter==questions__amount){
  localStorage.setItem('score', score);
  window.location = 'score.html'
    }
    getQuestion()
    question__counter++;
    
   }
     
    button.addEventListener('click', scoring)
    button.addEventListener('click', (e) => {
    button.removeEventListener('click', scoring)
    })
    
    
  
  
  }
  
  newGame();
  }
   const result = document.querySelector('.score');
   const image = document.querySelector('.image')
   if(result){
     const points = localStorage.getItem('score')
     const ratio = (points/questions__amount)
     result.innerHTML=`Your score: ${points}/${questions__amount}`
     if(ratio>0.7){
       image.setAttribute('src','img/not-bad.jpg')
     }
    else  if(ratio>0.4 && ratio<=0.7){
      image.setAttribute('src','img/so-so.gif')
      image.classList.add('result-image')
    }
    else{
      image.setAttribute('src','img/pathetic.jpg')
  
    }
  
    }
  
  
  