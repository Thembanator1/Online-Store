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
  var contactFormDB = firebase.database().ref("shipping-details");


var next=document.getElementById("next-button");
var prev=document.getElementById("prev-button");
var done=document.getElementById("done");
if(form1.style.display !== "none"){
    prev.style.display="none";
    done.style.display="none";
}
function nextView() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("confirmation");
    if (form1.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
        prev.style.display="block";
    } else if (form2.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
        next.style.display="none";
        done.style.display="block";
    } else {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
    }
}

function prevView() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("confirmation");
    if (form3.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
        next.style.display="block";
        done.style.display="none";
    } else if (form2.style.display !== "none") {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
        prev.style.display="none";
    } else {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
    }
}
function doneView(){
    // Get form elements
var firstName = document.getElementById('firstName').value;
var lastName = document.getElementById('lastName').value;
var country = document.getElementById('country').value;
var email = document.getElementById('mail').value;
var streetAddress = document.getElementById('street').value;
var buildingType = document.getElementById('building').value;
var city = document.getElementById('city').value;
var province = document.getElementById('province').value;
var cardNumber = document.getElementById('cardN').value;
var expDate = document.getElementById('expD').value;
var cvv = document.getElementById('cvv').value;

// Check if all fields are filled
if (firstName && lastName && country && email && streetAddress && buildingType && city && province && cardNumber && expDate && cvv) {

  
  saveMessages(firstName , lastName , country , email ,streetAddress , buildingType , city , province , cardNumber , expDate , cvv);

} else {
  alert('Please fill in all fields');
}

}
const saveMessages = (firstName , lastName , country , email ,streetAddress , buildingType , city , province , cardNumber , expDate , cvv) => {
    var newContactForm = contactFormDB.push();
    // set data to be saved
    newContactForm.set({
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        streetAddress: streetAddress,
        buildingType: buildingType,
        city: city,
        province: province,
        cardNumber: cardNumber,
        expDate: expDate,
        cvv: cvv
    });
    alert("Finished");
    
    // redirect to login page
    window.location.assign("homepage.html");
    };

  