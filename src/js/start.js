import '../scss/main.scss';
import {gsap} from "gsap";

const loginButton = document.querySelector('.login__button');
const alert = document.querySelector('.login__alert')
const input = document.querySelector('.login__username');
const usernames = {...localStorage};
function animate(comp){
    gsap.from(comp, {duration:0.5, y:-200, ease: "elastic.out(1,0.5)"});
    gsap.to(comp, {opacity:0, duration:0.5, delay:1, onComplete:
         function(){alert.classList.remove('login__alert--visible');
                    alert.style.opacity=1}
    });
};

   loginButton.addEventListener('click', (e)=>{
   const username = input.value;
   const checklogin = function(){
       let repeat=false;
    for(let name in usernames){
       if(name==username){
           repeat=true;
       }
    }
    return repeat}
   checklogin();
    if(checklogin()){
        alert.classList.add('login__alert--visible');
        animate(alert); 
    }
       else{
   sessionStorage.setItem(0,username)
    window.location = 'game.html'

}})

 //setInterval(checklength,100)  
 function checklength(){
 if(input.value.length<5){
   loginButton.disabled=true;
   loginButton.classList.remove('login__button-active')
 }
 else{
   loginButton.disabled=false;
   loginButton.classList.add('login__button-active')
   
 }}

