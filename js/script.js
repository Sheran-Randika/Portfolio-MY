const header=document.querySelector('header');

const first_skill=document.querySelector('.skill:first-child');
const sk_counters=document.querySelectorAll('.counter span');
const progress_bars=document.querySelectorAll('.skills svg circle');

const prt_section=document.querySelector('.portfolio');
const zoom_icons=document.querySelectorAll('.zoom-icon');
const modal_overlay = document.querySelector('.modal-overlay');
const images=document.querySelectorAll('.images img');
const next_btn=document.querySelector('.next-btn');
const prev_btn=document.querySelector('.prev-btn');

const links=document.querySelectorAll('.nav-link');

const toggle_btn=document.querySelector('.toggle-btn');

const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll',()=>{
   activeLink();
   if (!skillsPlayed) skillsCounter();
});

function stickyNavbar(){
   header.classList.toggle("scrolled",window.pageYOffset>0);
}

stickyNavbar();

window.addEventListener('scroll',stickyNavbar);

let sr = ScrollReveal({
   duration: 1700,
   distance: '50px',
});

sr.reveal(".showcase-info",{origin:'bottom',delay:200});
sr.reveal(".showcase-image",{origin:'top',delay:200});


function hasReached(el){
   let topPosition = el.getBoundingClientRect().top;
   
   if(window.innerHeight >= topPosition + el.offsetHeight) return true;
      return false;
}

function updateCount(num, maxNum){
   let currentNum = +num.innerText;

   if(currentNum < maxNum){

      num.innerText = currentNum + 1;

      setTimeout(()=>{
         updateCount(num, maxNum);
      }, 12);
}
}

let skillsPlayed = false;

function skillsCounter(){
   if(!hasReached(first_skill))return;

   skillsPlayed = true;

   sk_counters.forEach((counter, i)=>{
      let target = +counter.dataset.target;
      let strokeValue = 427 - 427 * (target/100);

      progress_bars[i].style.setProperty("--target", strokeValue);

      setTimeout(()=>{
         updateCount(counter, target);
      },400);
   });

   progress_bars.forEach((p)=>(p.style.animation="progress 2s ease-in-out forwards"));
}

// portfolio animation

let mixer = mixitup('.portfolio-gallery',
{
   selectors: {
       target: '.prt-card'
   },
   animation: {
       duration: 500
   }
});

let currentIndex =0;

zoom_icons.forEach((icn, i)=>
   icn.addEventListener('click',()=>{
      prt_section.classList.add('open');
      document.body.classList.add('stopScrolling');
      currentIndex = i;
      changeImage(currentIndex);
   }));

modal_overlay.addEventListener('click',()=>{
   prt_section.classList.remove('open');
   document.body.classList.remove('stopScrolling');
});

prev_btn.addEventListener('click',()=>{
   if(currentIndex===0) {
      currentIndex=5;
   } else{
      currentIndex--;
   }
   changeImage(currentIndex);
});

next_btn.addEventListener('click',()=>{
   if(currentIndex===5) {
      currentIndex=0;
   } else{
      currentIndex++;
   }
   changeImage(currentIndex);
});

function changeImage(index){
   images.forEach(img=>img.classList.remove('showImage'));
   images[index].classList.add('showImage');
}

// active link

function activeLink(){
   let sections = document.querySelectorAll('section[id]');
   let passedSections = Array.from(sections).map((sct, i)=>{
      return{ y: sct.getBoundingClientRect().top- header.offsetHeight, 
         id: i,
      };
   }).filter((sct)=>sct.y<=0);

   let currSectionID = passedSections.at(-1).id;

   links.forEach(l=>
      l.classList.remove('active'));
   links[currSectionID].classList.add('active');
}

activeLink();

// Change page Theme

let firstTime = localStorage.getItem('dark');

changeTheme(+firstTime);

function changeTheme(isDark){
   if(isDark){
      document.body.classList.add('dark');
      toggle_btn.classList.replace("uil-moon","uil-sun");
      localStorage.setItem('dark','1');
   } else{
      document.body.classList.remove('dark');
      toggle_btn.classList.replace("uil-sun","uil-moon");
      localStorage.setItem('dark','0');
   }
}

toggle_btn.addEventListener('click',()=>{
   changeTheme(!document.body.classList.contains('dark'));
} ); 

// toggle menu



function toggleEducation() {
   var educationDiv = document.getElementById("myDiv1");
   var expandIcons = document.querySelectorAll(".uil-angle-down");
 
   if (educationDiv.style.display === "none") {
     educationDiv.style.display = "block";
     expandIcons.forEach(icon => icon.classList.add("expanded"));
   } else {
     educationDiv.style.display = "none";
     expandIcons.forEach(icon => icon.classList.remove("expanded"));
   }
 }
 
 function toggleVolanteering() {
   var volunteeringDiv = document.getElementById("myDiv2");
   var expandIcons = document.querySelectorAll(".expand");
 
   if (volunteeringDiv.style.display === "none") {
     volunteeringDiv.style.display = "block";
     expandIcons.forEach(icon => icon.classList.add("expanded"));
   } else {
     volunteeringDiv.style.display = "none";
     expandIcons.forEach(icon => icon.classList.remove("expanded"));
   }
 }
 

 document.addEventListener("DOMContentLoaded", function () {
   const readMoreButtons = document.querySelectorAll(".read-more-button");
   const popupOverlays = document.querySelectorAll(".popup-overlay");
   const popupBoxes = document.querySelectorAll(".popup-box");
   const popupCloseButtons = document.querySelectorAll(".popup-close-button");

   readMoreButtons.forEach(function (button, index) {
       button.addEventListener("click", function (event) {
           event.preventDefault();
           popupOverlays[index].style.display = "block";
           popupBoxes[index].classList.add("active");
           document.body.classList.add("popup-open");
       });
   });

   popupCloseButtons.forEach(function (button, index) {
       button.addEventListener("click", function () {
           popupOverlays[index].style.display = "none";
           popupBoxes[index].classList.remove("active");
           document.body.classList.remove("popup-open");
       });
   });
});


window.addEventListener("scroll", function() {
   if (window.scrollY > 300) {
       document.querySelector(".quick-up-button").style.display = "block";
   } else {
       document.querySelector(".quick-up-button").style.display = "none";
   }
});

document.querySelector(".quick-up-button").addEventListener("click", function() {
   window.scrollTo({ top: 0, behavior: "smooth" });
});




const scriptURL = 'https://script.google.com/macros/s/AKfycbw_KWn0Gtx07dGfQHxzqVJxwT4VSYMqHNvuWsgkcubArJeMec0uixZDbbc0kaZ41kKh/exec';
        const form = document.forms['submit-to-google-sheet'];
        const msg = document.getElementById("msg");

        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(form);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    msg.textContent = "Message sent successfully";
                    setTimeout(function(){
                        msg.textContent = "";
                    }, 5000);
                    form.reset();
                } else {
                    msg.textContent = "Error sending message";
                }
            })
            .catch(error => {
                console.error('Error!', error);
                msg.textContent = "An error occurred. Please try again later.";
            });
        });

// hamburgur

hamburger.addEventListener('click',()=>{
   document.body.classList.toggle('open');
   document.body.classList.toggle('stopScrolling');
});

links.forEach(link=>link.addEventListener('click',()=>{
      document.body.classList.remove('open');
      document.body.classList.remove('stopScrolling');
   }));

