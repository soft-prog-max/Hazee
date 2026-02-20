$(document).ready(function () {

  $("#loginBtn").click(function () {

    let user = $("#username").val();
    let pass = $("#password").val();

    if (user === "admin" && pass === "1234") {
      Swal.fire("Success", "Login successful!", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      Swal.fire("Error", "Invalid login credentials!", "error");
    }
  });

});


function logout() {
  Swal.fire("Logged Out", "You have been logged out.", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

let persons = [];      
let undoStack = [];    


$(document).on("click", "#saveBtn", function () {

  let person = {
    fname: $("#fname").val().trim(),
    mname: $("#mname").val().trim(),
    lname: $("#lname").val().trim(),
    age: $("#age").val().trim(),
    email: $("#email").val().trim()
  };

  if (!person.fname || !person.lname || !person.age || !person.email) {
    Swal.fire("Error", "Please fill required fields!", "error");
    return;
  }

  persons.push(person);     
  undoStack.push(person);     

  displayPersons();
  Swal.fire("Saved!", "Person added successfully.", "success");

  $("input").val("");
});

$(document).on("click", "#undoBtn", function () {

  if (undoStack.length === 0) {
    Swal.fire("Info", "Nothing to undo.", "info");
    return;
  }

  undoStack.pop();   
  persons.pop();     

  displayPersons();
  Swal.fire("Undo", "Last record removed.", "success");
});


$(document).on("click", "#peekBtn", function () {

  if (undoStack.length === 0) {
    Swal.fire("Info", "Stack is empty.", "info");
    return;
  }

  let top = undoStack[undoStack.length - 1];
  Swal.fire("Last Saved", top.fname + " " + top.lname, "info");
});


$(document).on("click", "#sizeBtn", function () {
  Swal.fire("Stack Size", "Total: " + undoStack.length, "info");
});

function displayPersons() {
  $("#tableBody").html("");

  for (let i = 0; i < persons.length; i++) {
    $("#tableBody").append(`
      <tr>
        <td>${persons[i].fname}</td>
        <td>${persons[i].mname}</td>
        <td>${persons[i].lname}</td>
        <td>${persons[i].age}</td>
        <td>${persons[i].email}</td>
      </tr>
    `);
  }
}

