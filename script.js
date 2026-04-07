var questions = document.querySelectorAll('.item h2');

questions.forEach(function (question) {

  question.addEventListener('click', function () {

    var answer = this.nextElementSibling;


    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
});

function changeImage() {
  var img = document.getElementById('hoverimage');
  img.src = './All images/trade image 2.png';
}
function beforeImg() {
    var img = document.getElementById('hoverimage');
    img.src = './All images/herosection img.png';
  }
  var pass = document.getElementById("password");
var checkbox = document.getElementById("showPass");

checkbox.addEventListener("change", function() {
    if (this.checked) {
        pass.type = "text"; 
    } else {
        pass.type = "password";
    }
});
//  Email Js Conceept

// ── FAQ Accordion ───────────────────────────────────────────
var questions = document.querySelectorAll('.item h2');

questions.forEach(function (question) {
  question.addEventListener('click', function () {
    var answer = this.nextElementSibling;
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
});

// ── Hero Image Hover ─────────────────────────────────────────
function changeImage() {
  var img = document.getElementById('hoverimage');
  if (img) img.src = './All images/trade image 2.png';
}

function beforeImg() {
  var img = document.getElementById('hoverimage');
  if (img) img.src = './All images/herosection img.png';
}

// ── Show/Hide Password (Login page only) ─────────────────────
var pass     = document.getElementById("password");
var checkbox = document.getElementById("showPass");

if (pass && checkbox) {
  checkbox.addEventListener("change", function () {
    pass.type = this.checked ? "text" : "password";
  });
}

// NOTE: Signup + EmailJS logic has been moved to Signup.html directly.
// script.js ab sirf shared/index page ke liye hai.
