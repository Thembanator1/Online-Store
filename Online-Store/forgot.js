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
document.querySelector("#first").addEventListener("click", e => {
    e.preventDefault();
    //alert("start");
    console.log("start");
    
    // get the email and password values from the form 
    //var email = "irene@gmail.com";
    var email = document.getElementById("Email").value;
    localStorage.setItem('code_email',email);
    getDetails(email);
});

function getDetails(email){

    //alert("getDetails");
    console.log("getDetails");
    var state = "user does not exist";
    // attach a listener to the Firebase database reference
    // this listener will be called whenever the value of the database changes
    // it will iterate over all the child snapshots of the "onlinestore" node
    contactFormDB.orderByChild("email").equalTo(email).once("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            state = "successful";
        });
        if (state=="successful"){
            var code = Math.floor(Math.random() * 900000) + 100000;
            localStorage.setItem('user_code', code);
            sendM(email, code);
        }
        else {
            alert(state);
        }
    });
} 

function sendM(email, code) {
    console.log("sendM");
	Email.send({
		Host : "smtp.elasticemail.com",
        Username : "testbranch99@gmail.com",
        Password : "F57BDAE11C4776079DA63B3D98A7D0EDFDB3",
        To : email,
        From : "testbranch99@gmail.com",
        Subject : "This is the subject",
        Body : "Your reset code is " + code
    })
	.then(function (message) {
    console.log(message);
    if (message=="OK"){
        alert("mail sent successfully");
        window.location.assign("forgot1.html");
    }
    else {
        alert("resend email");
    }
	});
}

