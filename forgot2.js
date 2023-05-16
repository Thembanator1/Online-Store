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
document.querySelector("#third").addEventListener("click", e => {
    e.preventDefault();
    //alert("start");
    
    // get the email and password values from the form 
    //var email = "irene@gmail.com";
    var password = document.getElementById("Password").value;
    if (password.length<6){
        alert("Password must be at least 6 characters in length");
    }
    else {
        reset(password);
    }
});

function reset(password){
    //alert("updateDetails");
    contactFormDB.orderByChild("email").equalTo( localStorage.getItem('code_email') ).once("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            childSnapshot.ref.update({
                password: password
            });
        });
        alert("Password Reset Successful")
        window.location.assign("login.html");
    });
}