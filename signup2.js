const firebaseConfig = {
    //   copy your firebase config informations
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
    authDomain: "online-store-b90ca.firebaseapp.com",
    databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
    projectId: "online-store-b90ca",
    storageBucket: "online-store-b90ca.appspot.com",
    messagingSenderId: "160581372978",
    appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
    measurementId: "G-PH4QNCPP2J"
  
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("onlinestore");
  document.getElementById("onlinestore").addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();
    var username = document.getElementVal("Username");
    var password = document.getElementVal("Password");
    var confirm = document.getElementVal("Confirm");
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(String(username).toLowerCase())){
        alert("invalide email");
    }
    else if (password.length<6){
        alert("Password must be at least 6 characters in length");
    }
    else if (password!=confirm){
        alert("confirmation password does not match with password");
    }
    else {
        //here is where you will insert the username and password variables into the database
        saveMessages(username, email, confirm);

        //   enable alert
        document.querySelector(".alert").style.display = "block";
      
        //   remove the alert
        setTimeout(() => {
          document.querySelector(".alert").style.display = "none";
        }, 3000);
      
        //   reset the form
        document.getElementById("onlinestore").reset();
        window.location.assign("login.html");
    }
};
const saveMessages = (name, email, surname) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      email: email,
      surname: surname,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };