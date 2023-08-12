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

window.addEventListener('scroll',()=>{
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
      prt_section.classList.add('open')
      document.body.classList.add('stopScrolling');
      currentIndex = i;
      changeImage(currentIndex);
   }));

modal_overlay.addEventListener('click',()=>{
   prt_section.classList.remove('open')
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
   images.forEach((img)=>img.classList.remove('showImage'));
   images[index].classList.add('showImage');
}