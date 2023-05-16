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
document.querySelector("#second").addEventListener("click", e => {
    e.preventDefault();
    //alert("start");
    
    // get the email and password values from the form 
    //var email = "irene@gmail.com";
    var c_code = document.getElementById("Code").value;
    varify(c_code);
});

function varify(c_code){
    //alert("sendMail");

    if (localStorage.getItem('user_code')!=c_code){
        alert("incorrect code");
    } 
    else {
        window.location.assign("forgot2.html");
    }
}