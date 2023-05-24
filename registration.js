document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Make a POST request to the Reqres.in API to register the user
    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed.");
        }
      })
      .then(function (data) {
        // Registration successful, redirect to login page
        window.location.href = "login.html";
      })
      .catch(function (error) {
        console.log(error);
        // Handle registration error, display an error message to the user
      });
  });
