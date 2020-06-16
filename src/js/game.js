import '../scss/main.scss';
import pathetic from '../assets/img/pathetic.jpg';
import notbad from '../assets/img/not-bad.jpg';
import soso from '../assets/img/so-so.jpg';



/* place your code below */

// service worker registration - remove if you're not going to use it
/*if ("serviceWorker" in navigator) {
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
  }*/
  
  // place your code below
  

  const question = document.querySelector(".game__question");
  const answers = Array.from(document.querySelectorAll(".answer"));
  const button = document.querySelector('.button');
  const username = sessionStorage.getItem(0)
  let score = 0;
  const body = document.getElementsByTagName('body')
  let question__counter = 1;
  const questions__amount = 4;
  const counter = document.querySelector('.counter');
  const counter__circle = document.querySelector('.counter__circle')
  
  const max__points = (questions__amount + (10*questions__amount));
  let available__questions = [];
  let questions = [];
  
  
  if(button){
  function newGame() {
    button.disabled = true;
    score = 0;
    available__questions = [...questions];
    
    getQuestion();
  }
  
  
  function getQuestion() {
    counter.innerHTML='10';
    
    function countdown(){
      let value = counter.innerHTML;
      value=(value-0.1).toFixed(1);
      counter.innerHTML=value;
      if(value==0){
        if((available__questions.length)==0 && question__counter==questions__amount){
          localStorage.setItem(username, score);
          clearInterval(timer);
          window.location = 'score.html';}
        getQuestion();
        question__counter++;
      }

    };
    const timer = setInterval(countdown,100);
    setTimeout(function(){clearInterval(timer)}, 10000)
  
    
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
      score=(score+1+parseInt(counter.innerText));
    console.log(score);
    clearInterval(timer);
  }
  
      if((available__questions.length)==0 && question__counter==questions__amount){
  localStorage.setItem(username, score);
  clearInterval(timer);
  window.location = 'score.html';
    }
    
    getQuestion();
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
     const points = localStorage.getItem(username)
     const ratio = (points/max__points)
     result.innerHTML=`Your score: ${points}/${max__points}`
     if(ratio>0.7){
       image.setAttribute('src',"img/not-bad.d2bbc814.jpg")
     }
    else  if(ratio>0.4 && ratio<=0.7){
      image.setAttribute('src',"img/so-so.db4239c6.jpg")
      image.classList.add('result-image')
    }
    else{
      image.setAttribute('src',"img/pathetic.3a8ef60f.jpg")
  
    }
  
    }
  const table = document.querySelector('.table')
  if(table){
    localStorage.removeItem(`loglevel:webpack-dev-server`)
    const data = {...localStorage};
    const sortable = []
    for(let username in data){
      sortable.push([username, data[username]])
    }
    const sorted = sortable.sort((a,b)=>{
      return (b[1] - a[1])
    })
    for(let i=0;i<sorted.length;i++){
      if(sorted[i][0]==username && (sorted.length>1)){
      table.tBodies[0].innerHTML += `<tr style="font-weight:bold; background-color:rgb(163, 154, 154);">
      <td>${i+1}</td>
      <td>${sorted[i][0]}</td>
      <td>${sorted[i][1]}</td>    
  </tr>`
    }
    else{
      table.tBodies[0].innerHTML += `<tr>
      <td>${i+1}</td>
      <td>${sorted[i][0]}</td>
      <td>${sorted[i][1]}</td>    
  </tr>`
    }
  }
  }
  
  
  
  