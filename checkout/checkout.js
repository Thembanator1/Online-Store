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
var contactFormDB = firebase.database().ref("Cart");
//var email = localStorage.getItem("RECIPIENT_EMAIL");
var email = "mm@gmail.com";
var totalCost = 0;
var numItems = 0;

    contactFormDB.on("value", function (snapshot) {        
        snapshot.forEach(function(childSnapshot) {
            
        var price = parseFloat(childSnapshot.val().product_price);
            if (email==childSnapshot.val().customer_email){
                totalCost = totalCost+ price;
                numItems = numItems+1;
            }       
        });
        
        var elements = document.getElementsByClassName("item-price");
        elements[0].innerHTML = numItems; 
        var elements = document.getElementsByClassName("total-price");
        elements[0].innerHTML ="R"+totalCost; 
    
    });
    
   





