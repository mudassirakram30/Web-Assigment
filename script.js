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

(function(){
  emailjs.init("aZAYbJc4HaaKa9kaR"); 
})();

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

  const firstName = document.getElementById("signupFirstName").value;
  const lastName = document.getElementById("signupLastName").value;
  const email = document.getElementById("signupEmail").value;

  const fullName = firstName + " " + lastName;
  const time = new Date().toLocaleString();

  try {

    // 🟢 1. ADMIN EMAIL
    await emailjs.send("service_r4a94f9", "template_vl5g1wu", {
      user_name: fullName,
      user_email: email,
      time: time,
      to_email: "tradeempire88@gmail.com"
    });

    console.log("Admin email sent");

    // 🔵 2. USER EMAIL
    await emailjs.send("service_r4a94f9", "template_wyjokbr", {
      user_name: fullName,
      to_email: email
    });

    console.log("User email sent");

    alert("Signup successful! Emails sent ✅");

  } catch (error) {
    console.error("Email error:", error);
    alert("Error sending email ❌");
  }

});
