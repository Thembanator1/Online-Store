const firebaseConfig = {
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
// Get a reference to the database
var database = firebase.database();

// Get a reference to the "Products" node in the database
var email  = sessionStorage.getItem("user_email");
var productRef = database.ref('Products');
productRef.orderByChild('suppliers_email').equalTo(email).once('value', function(snapshot) {
  var data = snapshot.val();
  if (data) {
      
      // Loop through retrieved data and display it in the result div
      var imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
      
      // Add CSS styles to the imageContainer element
      imageContainer.style.overflowY = "scroll"; // Make it scrollable
      imageContainer.style.maxHeight = "300px"; // Limit the height
      
      snapshot.forEach(function(childSnapshot) {
         
          // Get the image URL from the childSnapshot
          var imageURL = childSnapshot.val().picture;
          var price = childSnapshot.val().price;
          var desc = childSnapshot.val().description;
          var name = childSnapshot.val().name;
          var category = childSnapshot.val.category;

          // Create a new div element for the product
          var productDiv = document.createElement('div');
          productDiv.style.display = 'flex';
          productDiv.style.flexDirection = 'column';
          productDiv.style.marginBottom = '20px'; // Add margin to the bottom for spacing

          // Create a new image element and set its source to the imageURL
          var imageElement = document.createElement('img');
          imageElement.src = imageURL;
          imageElement.alt = "A description of the image";
          productDiv.appendChild(imageElement);

          var nameElement = document.createElement('label');
          nameElement.innerText ="Name :"+ name;
          productDiv.appendChild(nameElement);

          var priceElement = document.createElement('label');
          priceElement.innerText ="Price :R"+ price;
          productDiv.appendChild(priceElement);

          imageContainer.addEventListener("click", () => {
            localStorage.setItem('name',name);
            localStorage.setItem('category',category);
            localStorage.setItem('price',price);
            localStorage.setItem('image',imageURL);
            localStorage.setItem('description',desc );
                   // redirect to login page
    window.location.assign("edit_del.html");
          // Print the key of the clicked item
        }) 
          // Add the product div to the container
          imageContainer.appendChild(productDiv);
      });
  } else {
      alert("Error: No data found for the given email");
  }
});
