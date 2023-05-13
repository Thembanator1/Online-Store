// Initialize Firebase
var firebaseConfig = {
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

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var contactFormDB = firebase.database().ref('Shipping');
// Get a reference to the database service
var database = firebase.database();

// Function to upload image to Firebase Storage

//var email  = localStorage.getItem("user_email");
var email = "yeses";
var column = document.getElementById('table1');

contactFormDB.orderByChild('supplier_email').equalTo(email).once('value', function(snapshot) {
    var data = snapshot.val();
    if (data) {
        
        // Loop through retrieved data and display it in the result div
        var imageContainer = document.getElementById('table1');
        imageContainer.innerHTML = '';
        
        // Add CSS styles to the imageContainer element
        imageContainer.style.overflowY = "scroll"; // Make it scrollable
        imageContainer.style.maxHeight = "600px"; // Limit the height
        
        snapshot.forEach(function(childSnapshot) {
           
            // Get the image URL from the childSnapshot
            var imageURL = childSnapshot.val().picture;
            var price = childSnapshot.val().price;
            var desc = childSnapshot.val().description;
            var name = childSnapshot.val().name;
            var quantity = childSnapshot.val().quantity;
            var ddate = childSnapshot.val().date;
            var deliv = childSnapshot.val().Delivery_Method;
            var paym = childSnapshot.val().Payment_Method;

            console.log("look at",childSnapshot.key);
           
            // Create a new div element for the product
            var productDiv = document.createElement('table');
        
            productDiv.style.border ='collapse';
            productDiv.style.width = '100%';
             
            // Create a new row element for the product
            var productRow = document.createElement('tr');
            
            // Create a new table data element for the image
            var productImage = document.createElement('td');
            var imageElement = document.createElement('img');
            imageElement.src = imageURL;
            imageElement.alt = "A description of the image";
            productImage.appendChild(imageElement);
            
            // Create a new table data element for the name
            var productName = document.createElement('td');
            var nameElement = document.createElement('label');
            nameElement.style.fontFamily = "Arial";
            nameElement.style.fontSize = "18px";
            nameElement.innerText = "Product Name :" + name;
            productName.appendChild(nameElement);
            
            // Create a new table data element for the price
            var productPrice = document.createElement('td');
            var priceElement = document.createElement('label');
            priceElement.style.fontFamily = "Arial";
            priceElement.style.fontSize = "18px";
            priceElement.innerText = "Product Price: R" + price;
            productPrice.appendChild(priceElement);
  
            productRow.appendChild(productImage);
            productRow.appendChild(productName);
            productRow.appendChild(productPrice);

            productDiv.appendChild(productRow);

            
            // Add event listener to the product div
            productDiv.addEventListener("click", () => {
              localStorage.setItem('name', name);
              localStorage.setItem('price', price);
              localStorage.setItem('ddate',ddate);
              localStorage.setItem('image', imageURL);
              localStorage.setItem('description', desc );
              localStorage.setItem('quantity',quantity);
              localStorage.setItem('deliv',deliv);
              localStorage.setItem('paym',paym);
              localStorage.setItem('shipping',childSnapshot.key);
              // redirect to edit/delete page
              window.location.assign("order_details.html");
            });
            
            // Add the product div to the container
            imageContainer.appendChild(productDiv);
        });
    } else {
        alert("No products in store found");
    }
});

// Function to switch between tab content
function openTable(evt, tableName) {
    var i, tabcontent, tablinks;
  
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the selected tab content and set the button to active
    document.getElementById(tableName).style.display = "block";
    evt.currentTarget.className += " active";

   
  }
