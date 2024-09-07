// Function to validate the form
    function validateForm(e) {
    e.preventDefault(); // Prevent default form submission
  
    // Get the values from the form fields dynamically
    let email = document.getElementById("emailform").value;
    let password = document.getElementById("passwordform").value;
  
    // Check if the entered username and password match 'admin' and '12345'
    if (email === "admin" && password === "12345") {
      window.location.href = "todolist.html"; // Redirect to 'todolist.html'
    } else {
      alert("Please enter the correct username and password."); // Show an error message
    }
  }
  
  // Todolist
  
  async function Todolist() {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let data = await response.json();
  
    console.log(data);
    let tableBody = document.getElementById("todoTableBody");
  
    // Create a counter to track checked checkboxes
    let checkedCount = 0;
  
    // Function to check if 5 tasks are completed
    function checkFiveTasksCompleted() {
      return new Promise((resolve) => {
        if (checkedCount === 5) {
          resolve();
        }
      });
    }
  
    data.map((todo, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row"></th>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>
          <input type="checkbox" class="form-check-input" ${
            todo.completed ? "checked disabled" : ""
          }>
        </td>   
      `;
  
      tableBody.appendChild(row);
  
      // Add event listener to the checkbox to count checked items
      const checkbox = row.querySelector("input[type='checkbox']");
      if (!todo.completed) {
        // Only add event listener to unchecked checkboxes
        checkbox.addEventListener("change", (event) => {
          if (event.target.checked) {
            checkedCount++; // Increment count if checked
          } else {
            checkedCount--; // Decrement count if unchecked
          }
  
          // Check if 5 tasks are completed and display the message
          checkFiveTasksCompleted().then(() => {
            alert("Congrats, you have completed 5 tasks!");
          });
        });
      }
    });
  }
  
  // Call the Todolist function when the button is clicked
  document.querySelector("button[onclick='Todolist()']").addEventListener("click", Todolist);
  