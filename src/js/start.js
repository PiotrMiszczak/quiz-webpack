import '../scss/main.scss';
import {gsap} from "gsap";
import {registerSW} from "./pwa.js"  
registerSW();  
const audio = document.getElementById('audio')
console.log(audio)
const image = document.querySelector('.image')
const loginButton = document.querySelector('.login__button');
const alert = document.querySelector('.login__alert')
const input = document.querySelector('.login__input');
const usernames = {...localStorage};
const select = document.querySelector('.login__input-select');
const radio = document.querySelectorAll('.login__input-radio');
const menu = document.querySelector('.menu')
const navigation = document.querySelector('.navigation')
menu.addEventListener('click', (e)=>{
    if(!navigation.classList.contains('navigation-active')){
    navigation.classList.add('navigation-active');
    gsap.from(navigation, {duration:0.5, y:-200, opacity:0});
    menu.innerHTML='X'
    
}
else{
    
    gsap.to(navigation, 0.3, {opacity:0, onComplete:function(){navigation.classList.remove('navigation-active');
    navigation.style.opacity=1}})
    
    menu.innerHTML = '&#9776'
    

}})
const radios = [...radio]
function AnimateAlert(){
    gsap.from(alert, {duration:0.5, y:-200, ease: "elastic.out(1,0.5)"});
    gsap.to(alert, {opacity:0, duration:0.5, delay:1, onComplete:
         function(){alert.classList.remove('login__alert--visible');
                    alert.style.opacity=1}
    });
};
function AnimateImage(){
    gsap.to(image, {scale:0.8, duration:0.5})
    gsap.to(image, {rotate:720, scale:5, duration:2, y:150, ease:"Circ.easeIn", delay:0.5});
    setTimeout(()=>{window.location='game.html'},3500)
   
}
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
        AnimateAlert();
    }
       else{
   sessionStorage.setItem('username',username);
   sessionStorage.setItem('category', select.value) 
        radios.forEach(radio => {
            if(radio.checked == true){
                sessionStorage.setItem('difficulty', radio.value)
            }
        })
       setTimeout(() => {audio.play()},1200)
    AnimateImage();
    

}})

 setInterval(checklength,100)  
 function checklength(){
 if(input.value.length<5){
   loginButton.disabled=true;
   loginButton.classList.remove('login__button-active')
 }
 else{
   loginButton.disabled=false;
   loginButton.classList.add('login__button-active')
   
 }}

