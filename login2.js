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

document.querySelector("#validate").addEventListener("click", e => {
    e.preventDefault();
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    //var pass = "return the password where the email is equal to the username above"
    var state = "User does not exist";
    contactFormDB.on("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            if (email==childSnapshot.val().email && password==childSnapshot.val().password){
                state = "successful";
            }    
            else if (email==childSnapshot.val().email){
                state = "Invalid password";
            }
        });
        if (state=="successful"){
            window.location.assign("homepage.html");
        }
        else {
            alert(state);
        }
    });
});
