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