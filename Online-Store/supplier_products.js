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
var email  = localStorage.getItem("supplier_email");
var productRef = database.ref('Products');
productRef.orderByChild('suppliers_email').equalTo(email).once('value', function(snapshot) {
  var data = snapshot.val();
  if (data) {
      
      // Loop through retrieved data and display it in the result div
      var imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
      
      // Add CSS styles to the imageContainer element
      imageContainer.style.overflowY = "scroll"; // Make it scrollable
      imageContainer.style.maxHeight = "400px"; // Limit the height
      
      snapshot.forEach(function(childSnapshot) {
         
          // Get the image URL from the childSnapshot
          var imageURL = childSnapshot.val().picture;
          var price = childSnapshot.val().price;
          var desc = childSnapshot.val().description;
          var name = childSnapshot.val().name;
          var category = childSnapshot.val().category;
          console.log(category);

          // Create a new list item for each product item
          const listItem = document.createElement("div");
          listItem.className = "product-item";

          // Create an image element to display the product image
          const image = document.createElement("img");
          image.src = imageURL;
          image.alt = "product-image";
          listItem.appendChild(image);

          // Create a div element to hold the product name and price
          const infoDiv = document.createElement("div");
          infoDiv.className = "details";
          listItem.appendChild(infoDiv);

          // Create a h3 element to display the product name
          const nameSpan = document.createElement("h3");
          nameSpan.textContent = name;
          infoDiv.appendChild(nameSpan);

          // Create a h4 element to display the product category
          const categorySpan = document.createElement("h4");
          categorySpan.textContent = category;
          infoDiv.appendChild(categorySpan);

          // Create a h2 element to display the product price
          const priceSpan = document.createElement("h2");
          priceSpan.textContent = "R " + price;
          infoDiv.appendChild(priceSpan);

          // Add the click event listener to the listItem
          listItem.addEventListener("click", () => {
            localStorage.setItem('name', name);
            localStorage.setItem('category', category);
            localStorage.setItem('price', price);
            localStorage.setItem('image', imageURL);
            localStorage.setItem('description', desc);
            // Redirect to the next page
            window.location.assign("edit_del.html");
        });

        // Add the product div to the container
        imageContainer.appendChild(listItem);
          
          
      });
  } else {
      alert(" No products in store found");
  }
});
