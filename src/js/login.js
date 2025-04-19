document.getElementById("formulaire").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const validEmail = "fazilah.andriatiana@gmail.com";
  const validPassword = "foza_orana";

  if (email === validEmail && password === validPassword) {
    window.location.href = "./index.html";
  } else {
    alert("Please enter the email and password shown in the placeholders.");
  }
});
