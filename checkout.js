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

  
  var next = document.getElementById("next-button");
  var prev = document.getElementById("prev-button");
  var done = document.getElementById("done");
  var form1 = document.getElementById("form1");
  var form2 = document.getElementById("form2");
  var form3 = document.getElementById("confirmation");
  var payments = document.getElementById("paymentOptions");
  //
  const payButton = document.getElementById('pay-button');
  const popupContainer = document.getElementById('popup-container');
  const popupMessage = document.createElement('div'); // new element for message
  const counterElement = document.getElementById('counter');
  const cardOnDeliveryRadio = document.getElementById('cardOnDelivery');

  //
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
  // Initially, only form1 is displayed and other forms are hidden
  form1.style.display = "block";
  form2.style.display = "none";
  form3.style.display = "none";
  payments.style.display = "none";
  prev.style.display = "none";
  done.style.display = "none";
  payButton.style.display='none';
  function nextView() {

    if (form1.style.display === "block") {
      // If we're in form1, hide all other forms except payment options
      form1.style.display = "none";
      payments.style.display = "block";
      next.style.display = "block";
      prev.style.display = "block";
      done.style.display = "none";
      payButton.style.display='none';
    } else if (payments.style.display === "block") {
        if (cardOnDeliveryRadio.checked) {
            // user selected card on delivery, take them to form 3
            // replace the following line with code that takes the user to form 3
            // If we're in form2, hide all other forms except form3
      form2.style.display = "none";
      form3.style.display = "block";
      next.style.display = "none";
      prev.style.display = "block";
      done.style.display = "block";
      payments.style.display = "none";
      payButton.style.display='none';
      localStorage.setItem('payments',"card");
            console.log('Take user to form 3');
          } else {
            // user selected pay online, take them to form 2
            // replace the following line with code that takes the user to form 2
            // If we're in payment options, hide all other forms except form2
      payments.style.display = "none";
      form2.style.display = "block";
      next.style.display = "none";
      prev.style.display = "block";
      done.style.display = "none";
      payButton.style.display='block';
            console.log('Take user to form 2');
          }
 
    } else {
      // If we're in form2, hide all other forms except form3
      form2.style.display = "none";
      form3.style.display = "block";
      next.style.display = "none";
      prev.style.display = "block";
      done.style.display = "block";
      payButton.style.display='none';
    }
  }
  
  function prevView() {
    if (form2.style.display === "block") {
      // If we're in form2, hide all other forms except payment options
      form2.style.display = "none";
      payments.style.display = "block";
      prev.style.display = "block";
      next.style.display = "block";
      done.style.display = "none";
      payButton.style.display='none';
    } else if (form3.style.display === "block") {
        const back=localStorage.getItem('payments');
        if(back=="card"){
            form3.style.display = "none";
            form2.style.display = "none";
            payments.style.display = "block";
            prev.style.display = "block";
            next.style.display = "block";
            done.style.display = "none";
            payButton.style.display='none';

        }else{
      // If we're in form3, hide all other forms except form2
      form3.style.display = "none";
      form1.style.display='none';
      form2.style.display = "block";
      next.style.display = "none";
      prev.style.display = "block";
      done.style.display = "none";
      payButton.style.display='block';
        }
    } else {
      // If we're in payment options, hide all other forms except form1
      payments.style.display = "none";
      form1.style.display = "block";
      prev.style.display = "none";
      next.style.display = "block";
      done.style.display = "none";
      payButton.style.display='none';
    }
  }
  
function doneView(){
  

// Check if all fields are filled
if (firstName && lastName && country && email && streetAddress && buildingType && city && province) {

  
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
   
    
    popupMessage.innerHTML = "Payment successful"; // set message content
    popupMessage.style.display = "none"; // hide the message element by default
    popupMessage.style.position = "absolute";
    popupMessage.style.top = "50%";
    popupMessage.style.left = "50%";
    popupMessage.style.transform = "translate(-50%, -50%)";
    popupMessage.style.background = "black";
    popupMessage.style.padding = "20px";
    popupMessage.style.borderRadius = "10px";
    popupMessage.style.fontSize = "50px";
    popupMessage.style.fontWeight = "bold";
    
    popupContainer.appendChild(popupMessage); // append message element to popup container
    
    payButton.addEventListener('click', () => {
       
    popupContainer.style.display = 'block';
    let count = 3;
    counterElement.textContent = count;
  
    const intervalId = setInterval(() => {
      count--;
      counterElement.textContent = count;
      if (count === 0) {
        clearInterval(intervalId);
        popupMessage.style.display = "block"; // display message
        setTimeout(() => {
          popupMessage.style.display = "none"; // hide message after 1 second
          popupContainer.style.display = 'none';
          nextView(); // hide popup container
        }, 1000);
      } 
    }, 1000);
   


 
    });
    
    
  