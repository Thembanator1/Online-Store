// Initialize Firebase app
firebase.initializeApp({
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
    authDomain: "online-store-b90ca.firebaseapp.com",
    databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
    projectId: "online-store-b90ca",
    storageBucket: "online-store-b90ca.appspot.com",
    messagingSenderId: "160581372978",
    appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
    measurementId: "G-PH4QNCPP2J"
  });
  
  (function(firebase) {
  
    var storage = firebase.storage();
    // Reference to Firebase database
    var database = firebase.database();
  
    // Reference to users in the database
    var usersRef = firebase.database().ref("Products");
  
    // Function to edit name and category and price and description of a user
    var email = sessionStorage.getItem("user_email");
    var ImageUrl = localStorage.getItem("image");
  
   
    // Upload the file to Firebase Storage
    function editUser() {
       // checking if name is updated
      var Upname = document.getElementById("name").value || localStorage.getItem("name") || "";
  
      // checking if price is updated
      var Upprice =document.getElementById("price").value || localStorage.getItem("price") ||  "";
      
      // checking if description was updated
      var Updescription =document.getElementById('description').value || localStorage.getItem("description") ||  "";
    
      // checking if category was updated
      const select = document.querySelector('select');
      var Upcategory = select.value || localStorage.getItem("category") || "";






      var userRef = usersRef.child(Upname);
      usersRef.orderByChild("picture").equalTo(ImageUrl).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // Delete the child from the "Products" table
          childSnapshot.ref.update({
            name: Upname,
            price: Upprice,
            category: Upcategory,
            description: Updescription,
            picture: ImageUrl
          });
          alert("sucessfully Updated Product");
           });
         });
     
    }
    
    // Function to delete a user
    function deleteUser() {
      var Upname = document.getElementById("name").value || localStorage.getItem("name") || "";
  
      // Search for user's username in "Products" table and delete if found
      usersRef.orderByChild("name").equalTo(Upname).once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Delete the child from the "Products" table
      childSnapshot.ref.remove();
      alert("sucessfully deleted Product");
       });
     });
    }
  
    window.deleteUser = deleteUser;
    window.editUser = editUser;
  
    
  })(firebase);
  