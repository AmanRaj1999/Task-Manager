document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Make a POST request to the Reqres.in API to authenticate the user
    fetch("https://reqres.in/api/login", {
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
          throw new Error("Login failed.");
        }
      })
      .then(function (data) {
        // Login successful, store the authentication token and redirect to the task dashboard
        localStorage.setItem("authToken", data.token);
        window.location.href = "dashboard.html";
      })
      .catch(function (error) {
        console.log(error);
        // Handle login error, display an error message to the user
      });
  });
