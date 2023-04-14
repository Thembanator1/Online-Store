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
document.querySelector("#validate").addEventListener("click", e => {
    e.preventDefault();
    
    // get the email and password values from the form
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    // initialize the state variable to "User does not exist"
    var state = "User does not exist";

    // attach a listener to the Firebase database reference
    // this listener will be called whenever the value of the database changes
    // it will iterate over all the child snapshots of the "onlinestore" node
    contactFormDB.on("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            
            // check if the email and password match a record in the database
            // if so, set the state to "successful"
            if (email==childSnapshot.val().email && password==childSnapshot.val().password){
                state = "successful";
            }    
            
            // if the email matches but the password does not, set the state to "Invalid password"
            else if (email==childSnapshot.val().email){
                state = "Invalid password";
            }
        });

        // after iterating over all the child snapshots, check the state and take appropriate action
        if (state=="successful"){
            window.location.assign("homepage.html"); // redirect to the homepage
        }
        else {
            alert(state); // show an alert with the state message
        }
    });
});

