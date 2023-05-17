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
      document.getElementById("Name").innerHTML = prev_name;
      document.getElementById("Surname").innerHTML = prev_surname;
      document.getElementById("Email").innerHTML = email;
  });
} 

document.querySelector("#validate").addEventListener("click", e => {
  e.preventDefault();
  window.location.assign("edit_profile.html");
});

