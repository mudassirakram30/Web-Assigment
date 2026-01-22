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
