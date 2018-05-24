// Find necessary elements
let slides = document.querySelectorAll(".content");
let dots = document.querySelectorAll(".dot");
dots = Array.from(dots);
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let cross = document.querySelector(".cross");
let notification = document.querySelector(".notification"); 
let checkbox = document.querySelector("input"); 
// Pagination - numbers
dots.forEach(function(dot, i){
  dot.textContent = i + 1;
});

// SLIDER //
//Add event listeners to the 'next' and 'prev' buttons
prev.addEventListener('click', minusSlides); 
next.addEventListener('click', plusSlides); 
dots.forEach(function(dot) {
  dot.addEventListener('click', currentSlide); 
});

// Start index, launch the slider starting from the first slide
let slideIndex = 1; 
showSlides(slideIndex);

// functions to show the next/previous slide
function plusSlides() {showSlides(++slideIndex);}
function minusSlides() {showSlides(--slideIndex);}

// Pagination
function currentSlide(event) {
  slideIndex = dots.indexOf(event.target) + 1;
  showSlides(slideIndex);
}

function showSlides(n) {
  // to make slider infinite 
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  //put display=none for all the slides
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  // remove active status from all the dots
  for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  // only show the current slide and dot
  slides[slideIndex-1].style.display = "inline-block"; 
  dots[slideIndex-1].className += " active";
}

// CROSS
cross.addEventListener('click', hide); 
function hide(){ notification.style.display = "none";}

//SHOW NOTIFICATION IN 5 SECONDS
document.addEventListener("DOMContentLoaded", showNotification);

function showNotification(){
  if (localStorage.length === 0) {localStorage.setItem('display', defaultStr);}
  let displayParsed = JSON.parse(localStorage.getItem('display'));
  setTimeout(function() {  
    notification.style.display = displayParsed['display'];
  }, 5000);
}

// DISABLE SHOWING NOTIFICATION
let defaultDisplay = {"display": "block"};
let disableDisplay = {"display": "none"};
let defaultStr = JSON.stringify(defaultDisplay);
let disableStr = JSON.stringify(disableDisplay);

checkbox.addEventListener('change', disableNotification);

function disableNotification() {
  localStorage.removeItem('display');
  if(checkbox.checked === true) {
     localStorage.setItem('display', disableStr);
  } else {
    localStorage.setItem('display', defaultStr);
  }
}

//KEYBOARD CONTROLS
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const ESC_KEY = 27;
const ENTER_KEY = 13;

// Left, Right, Esc keys
addEventListener('keydown', onKeyPress);
function onKeyPress(event) {
  if (event.keyCode === LEFT_KEY) { 
    minusSlides();
  } else if (event.keyCode === RIGHT_KEY) {
    plusSlides();
  } else if (event.keyCode === ESC_KEY) {
    hide();
  }
}

// Push Enter on Cross
cross.addEventListener('keydown', onCrossEnter); 
function onCrossEnter(event) {
  if (event.keyCode === ENTER_KEY) {
    hide();
  }
}

// Push Enter on Checkbox
checkbox.addEventListener('keydown', onCheckboxEnter); 
function onCheckboxEnter(event) {
  if (event.keyCode === ENTER_KEY) {
    if(checkbox.checked === true) {
      checkbox.checked = false;
   } else {
    checkbox.checked = true;
   }
   disableNotification();
  }
}

// Push Enter on Prev and Next
prev.addEventListener('keydown', onPrevEnter); 
function onPrevEnter(event) {
  if (event.keyCode === ENTER_KEY) {
    minusSlides();
  }
}

next.addEventListener('keydown', onNextEnter); 
function onNextEnter(event) {
  if (event.keyCode === ENTER_KEY) {
    plusSlides();
  }
}

// Push Enter on Dots
dots.forEach(function(dot) {
  dot.addEventListener('keydown', onDotEnter); 
});
function onDotEnter(event) {
  if (event.keyCode === ENTER_KEY) {
    currentSlide(event);
  }
}


