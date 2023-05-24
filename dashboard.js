// Check if the user is authenticated, otherwise redirect to the login page
var authToken = localStorage.getItem("authToken");
if (!authToken) {
  window.location.href = "login.html";
}

// Replace the API endpoint with your specific implementation
var apiEndpoint = "https://example.com/api/tasks";

// Function to handle error and display error message
function handleError(error) {
  console.log(error);
  // Display an error message to the user
  var errorMessage = document.createElement("p");
  errorMessage.innerHTML = "An error occurred. Please try again.";
  document.getElementById("task-list").appendChild(errorMessage);
}

// Function to fetch and display the user's tasks
function fetchTasks() {
  fetch(apiEndpoint, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch tasks.");
      }
    })
    .then(function (data) {
      // Process and display the tasks
      var taskList = document.getElementById("task-list");
      taskList.innerHTML = ""; // Clear the existing task list
      data.forEach(function (task) {
        var taskItem = document.createElement("div");
        taskItem.innerHTML =
          "<h4>" + task.title + "</h4><p>" + task.description + "</p>";
        taskList.appendChild(taskItem);
      });
    })
    .catch(function (error) {
      handleError(error);
    });
}

// Function to create a new task
function createTask(title, description) {
  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create task.");
      }
    })
    .then(function (data) {
      // Task created successfully, fetch and display the updated task list
      fetchTasks();

      // Clear the form fields
      document.getElementById("task-title").value = "";
      document.getElementById("task-description").value = "";
    })
    .catch(function (error) {
      handleError(error);
    });
}

// Fetch and display the user's tasks on page load
fetchTasks();

// Create a new task when the form is submitted
document
  .getElementById("create-task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var title = document.getElementById("task-title").value;
    var description = document.getElementById("task-description").value;

    createTask(title, description);
  });
