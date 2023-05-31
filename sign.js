import { db, db_firestore } from './firebase.js';
  
const usersCollection = db_firestore.collection("users");

  // Get the form element and add a submit event listener
  var form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the input field values
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmpassword').value;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    var regexp =
    /^(([^<>()\.,;:\s@"]+(.[^<>()\.,;:\s@"]+)*)|(".+"))@(([0−9]1,3[˙0−9]1,3[˙0−9]1,3[˙0−9]1,3[0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3)|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  // Validate user input
  if (name == "") {
    alert("Enter name");
  } else if (surname == "") {
    alert("Enter surname");
  } else if (!regexp.test(String(email).toLowerCase())) {
    alert("Invalid email");
  } else if (password.length < 6) {
    alert("Password must be at least 6 characters in length");
  } else if (password != confirmPassword) {
    alert("Password does not match");
  } else {
    // Check if user already exists in the database
    var state = "Account created";
    usersCollection
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          state = "User Already Exists";
        }

        // If user does not already exist, save user data to the database
        if (state == "Account created") {
          saveUser(email, name, surname, password);
          alert(state);
        } else {
          alert(state);
        }
      })
      .catch((error) => {
        console.error("Error checking user existence: ", error);
      });
  }    

    

});

    // Create an object with the user data
    var user = {
    name: name,
    surname: surname,
    email: email,
    password: password
    };

    // Save the user data to Firestore with the user's email as the document ID
    db_firestore.collection("users").doc(email).set(user)
    .then(function() {
        console.log("User saved with ID: ", email);
        // You can redirect the user to another page or show a success message here
    })
    .catch(function(error) {
        console.error("Error saving user: ", error);
        // Handle the error as needed
    });
  