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
// get reference to the Firebase database
var contactFormDB = firebase.database().ref("Users");



// add an event listener to the "validate" button on the form
function start(){
  console.log("start");
  
  // get the email and password values from the form 
  //var prev_email = "irene@gmail.com";
  prev_email = localStorage.getItem("user_email");
  getDetails(prev_email);
}

var prev_email;
var prev_name;
var prev_surname;
var prev_password;

function getDetails(email){

  console.log("getDetails");
  // attach a listener to the Firebase database reference
  // this listener will be called whenever the value of the database changes
  // it will iterate over all the child snapshots of the "onlinestore" node
  contactFormDB.orderByChild("email").equalTo(email).once("value", function (snapshot) {        
      snapshot.forEach(function(childSnapshot) {
          prev_name = childSnapshot.val().name;
          prev_surname = childSnapshot.val().surname;
          prev_password = childSnapshot.val().password;
      });
      document.getElementById("Name").value = prev_name;
      document.getElementById("Surname").value = prev_surname;
      document.getElementById("Password").value = prev_password;
  });
} 

document.querySelector("#validate").addEventListener("click", e => {
  e.preventDefault();
  var email = prev_email;
  var old_name = prev_name;
  var old_surname = prev_surname;
  var old_password = prev_password;
  edits(email, old_name, old_surname, old_password);
});

function edits(email, old_name, old_surname, old_password){
  console.log("edits");
  
  var name = changes(old_name, document.getElementById("Name").value);
  var surname = changes(old_surname, document.getElementById("Surname").value);
  var new_password = changes(old_password, document.getElementById("Password").value);
  var confirm_password = document.getElementById("old_Password").value;
  
  if (new_password.length<6){
      alert("new password must be at least 6 characters in length");
  }
  else if (old_password!=confirm_password){
      alert("Password does not match");
  }
  else {
      updateDetails(email, name, surname, new_password);
  }
}

function changes(old_value, new_value){
  if (new_value==""){
      new_value = old_value;
  }
  return new_value;
}



function updateDetails(email, name, surname, password){
  console.log("updateDetails");
  contactFormDB.orderByChild("email").equalTo(email).once("value", function (snapshot) {        
      snapshot.forEach(function(childSnapshot) {
          childSnapshot.ref.update({
              name: name,
              surname: surname,
              password: password
          });
      });
      alert("update successful")
  });
}

