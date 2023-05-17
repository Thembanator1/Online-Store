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


function time(){
    var sta = new Date().getTime();
    var end = new Date().getTime();
    while (end-sta<1000*40){
        end = new Date().getTime();
    }
    sendM(localStorage.getItem('code_email'), localStorage.getItem('user_code'));
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
	});
}
