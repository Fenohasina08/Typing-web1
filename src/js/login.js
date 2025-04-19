document.getElementById("formulaire").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email: " + email);
  console.log("Password: " + password);

  const validEmail = "true@gmail.com";
  const validPassword = "fozaorana";

  if (email === validEmail && password === validPassword) {
    window.location.href = "../html/home.html";
  } else {
    alert("Please enter the email and password shown in the placeholders.");
  }
});
