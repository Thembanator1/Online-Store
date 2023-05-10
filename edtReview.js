// Initialize Firebase
var firebaseConfig = {
    // Your Firebase config
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
    authDomain: "online-store-b90ca.firebaseapp.com",
    databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
    projectId: "online-store-b90ca",
    storageBucket: "online-store-b90ca.appspot.com",
    messagingSenderId: "160581372978",
    appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
    measurementId: "G-PH4QNCPP2J"
  };
  
  firebase.initializeApp(firebaseConfig);
var id =localStorage.getItem('review_id');
// Get a reference to the database node you want to update
// Reference to users in the database
var usersRef = firebase.database().ref("Reviews");
const rating = document.querySelector('.rating');
// Get the review title and description values from the input fields
var n_stars=0;

rating.addEventListener('click', function(e) {
  if (e.target.type === 'radio') {
    alert(`You clicked on ${e.target.value} stars!`);
    n_stars=e.target.value;
  }
});

function editUser(){
    var reviewTitle = document.getElementById("review_title").value;
    var reviewDescription = document.getElementById("description").value;


    usersRef.orderByChild("product_id").equalTo(id).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // Delete the child from the "Products" table
          if(n_stars!==0){
            childSnapshot.ref.update({
               num_of_stars:n_stars
              });
          }
          if(reviewTitle){
            childSnapshot.ref.update({
              
                review_title: reviewTitle
              
              });
          }
          if(reviewDescription){
            childSnapshot.ref.update({
                review: reviewDescription
               
              });
          }
          
           });
         });
         alert("sucessfully Updated Review");
         window.location.assign("reviews.html");
    
}

// Function to delete a user
function deleteUser() {
   

    // Search for user's username in "Products" table and delete if found
    usersRef.orderByChild("product_id").equalTo(id).once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    // Delete the child from the "Products" table
    childSnapshot.ref.remove();
    
     });
   });
   alert("sucessfully deleted Product");
   window.location.assign("reviews.html");
  }
