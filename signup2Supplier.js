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
// initialize Firebase using the provided configuration
firebase.initializeApp(firebaseConfig);
// reference your database
var contactFormDB = firebase.database().ref("Supplier");


document.querySelector("#validate").addEventListener("click", e => {
e.preventDefault(); // prevent default form submission behavior
// get user input values
var name = document.getElementById("name").value;
var surname = document.getElementById("surname").value;
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var c_password = document.getElementById("confirmpassword").value;

var company_name = document.getElementById("companyName").value;
var website = "None";
website = document.getElementById("website").value;
var company_email = document.getElementById("companyEmail").value;
var phone_no = document.getElementById("phoneNumber").value;
var registeration_no = document.getElementById("registerationNumber").value;

var vat_yes = document.getElementById("VATyes").checked;
var vat_no = document.getElementById("VATno").checked;
var VAT = "";
if (vat_yes){VAT = "yes";}
else if (vat_no){VAT = "no";}
var R10 = document.getElementById("lessR20k").checked;
var R20 = document.getElementById("R20k-R50k").checked;
var R50 = document.getElementById("R50k-R100k").checked;
var R100 = document.getElementById("R100k-R500k").checked;
var R500 = document.getElementById("moreR500k").checked;
var Revenue = "";
if (R10){Revenue = "less than R20k";}
else if (R20){Revenue = "R20k-R50k";}
else if (R50){Revenue = "R50k-R100k";}
else if (R100){Revenue = "R100k-R500k";}
else if (R500){Revenue = "more than R500k";}

var regexp = /^(([^<>()\.,;:\s@"]+(.[^<>()\.,;:\s@"]+)*)|(".+"))@(([0−9]1,3[˙0−9]1,3[˙0−9]1,3[˙0−9]1,3[0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3 [˙​ 0−9]1,3)|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
// validate user input
if (name==""){
alert("enter name");
}
else if (surname==""){
alert("enter surname");
}
else if (!regexp.test(String(email).toLowerCase())){
alert("invalide email");
}
else if (password.length<6){
alert("Password must be at least 6 characters in length");
}
else if (password!=c_password){
alert("Password does not match");
}
else if (company_name==""){
alert("enter company name");
}
else if (!regexp.test(String(company_email).toLowerCase())){
alert("invalide company email");
}
else if (phone_no.length<10){
alert("Phone number must be 10 characters in length");
}
else if (registeration_no==""){
alert("enter Business Registeration Number");
}
else if (VAT==""){
alert("select VAT registered");
}
else if (Revenue==""){
alert("select Monthly Revenue");
}
else {
// check if user already exists in the database
var state = "Account created";
contactFormDB.once("value", function (snapshot) {
snapshot.forEach(function(childSnapshot) {
if (email==childSnapshot.val().email){
state = "User Already Exists";
}
});
// if user does not already exist, save user data to the database
if(state=="Account created"){
saveMessages(name, email, surname, password, company_name, website, company_email, phone_no, registeration_no, VAT, Revenue);
alert(state);
}
else{
alert(state);
}
}); 
}
});

// function to save user data to the database
const saveMessages = (name, email, surname, password, company_name, website, company_email, phone_no, registeration_no, VAT, Revenue) => {
var newContactForm = contactFormDB.push();
// set data to be saved
newContactForm.set({
name: name,
email: email,
surname: surname,
password: password,
company_name: company_name, 
website: website, 
company_email: company_email, 
phone_no: phone_no, 
registeration_no: registeration_no, 
VAT: VAT, 
Revenue: Revenue
});


// redirect to login page
window.location.assign("loginSupplier.html");
};

