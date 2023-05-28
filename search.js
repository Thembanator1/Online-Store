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
// reference your database
const id = localStorage.getItem('id');
localStorage.setItem('item_key', id);

var imagesRef = firebase.database().ref("Products");
// Retrieve all product items from the Firebase Realtime Database
const productsRef = firebase.database().ref("Products");
 // document.getElementById("Onlinestore").addEventListener("submit", submitForm)r query="";
 var categoriesRef = firebase.database().ref("Products");


function searchObjects() {
  var query = document.getElementById("searchInput").value.toLowerCase();
  var objectList = document.querySelector(".object-list");
  objectList.innerHTML = "";
  productsRef.once("value", function(snapshot) {
    var products = snapshot.val();
    console.log(products);
    var count = 0;
    var objectDiv = null;
    for (var [key, product] of Object.entries(products)) {
      if (query === "" || product.name.toLowerCase().indexOf(query) !== -1) {
        if (count % 2 === 0) {
          objectDiv = document.createElement("div");
          objectDiv.className = "object";
          objectList.appendChild(objectDiv);
        }

        var objectListItem = document.createElement("div");
        objectListItem.className = "item";

        var objectImageContainer = document.createElement("div");
        objectImageContainer.className = "item-image-container";

        var objectImage = document.createElement("img");
        objectImage.src = product.picture; // Assuming there's a URL property in the data
        objectImage.alt = product.name;
        objectImage.className = "item-image";
        objectImageContainer.appendChild(objectImage);

        var objectDetails = document.createElement("div");
        objectDetails.className = "item-details";

        var objectName = document.createElement("p");
        var price = document.createElement("p");
        objectName.className = "item-name";
        price.className = "item-price";
        objectName.innerHTML = product.name;
        price.innerHTML = "$" + product.price;

        objectListItem.addEventListener(
          "click",
          (function(productId) {
            return function() {
              localStorage.setItem("id", productId);
              window.location.assign("ProductPage.html");
            };
          })(key) // Use key (product ID) as the argument
        );
        
        console.log(key);
        objectDetails.appendChild(objectName);
        objectDetails.appendChild(price);

        objectListItem.appendChild(objectImageContainer);
        objectListItem.appendChild(objectDetails);
        objectDiv.appendChild(objectListItem);

        count++;
      }
    }
  });
}

function filterProducts(category) {
  // Retrieve all product items from the Firebase Realtime Database
  productsRef.once("value", function(snapshot) {
    var products = snapshot.val();
    var filteredProducts = {};
  
    // Iterate over the products to filter by category
    for (var key in products) {
      if (products[key].category === category) {
        filteredProducts[key] = products[key];
      }
    }
    // Display the filtered products
    displayFilteredProducts(filteredProducts);
  });
}


function displayFilteredProducts(products) {
  console.log(products);
  var objectList = document.querySelector(".object-list");
  objectList.innerHTML = "";

  for (var [key, product] of Object.entries(products)) {
    var objectDiv = document.createElement("div");
    objectDiv.className = "object";
    objectList.appendChild(objectDiv);

    var objectListItem = document.createElement("div");
    objectListItem.className = "item";
    objectDiv.appendChild(objectListItem);

    var objectImageContainer = document.createElement("div");
    objectImageContainer.className = "item-image-container";
    objectListItem.appendChild(objectImageContainer);

    var objectImage = document.createElement("img");
    objectImage.src = product.picture; // Assuming there's a URL property in the data
    objectImage.alt = product.name;
    objectImage.className = "item-image";
    objectImageContainer.appendChild(objectImage);

    var objectDetails = document.createElement("div");
    objectDetails.className = "item-details";
    objectListItem.appendChild(objectDetails);

    var objectName = document.createElement("p");
    var price = document.createElement("p");
    objectName.className = "item-name";
    price.className = "item-price";
    objectName.innerHTML = product.name;
    price.innerHTML = "$" + product.price;

    objectListItem.addEventListener(
      "click",
      (function(productId) {
        return function() {
          localStorage.setItem("id", productId);
          window.location.assign("ProductPage.html");
        };
      })(key) // Use key (product ID) as the argument
    );

    objectDetails.appendChild(objectName);
    objectDetails.appendChild(price);
  }
}















// Call the populateCategories function to populate the dropdown initially
populateCategories();


// Function to fetch and populate categories in the dropdown menu
function populateCategories() {
  var categoryDropdown = document.getElementById("categoryDropdown");

  // Fetch categories from the database
  categoriesRef.once("value", function(snapshot) {
    var products = snapshot.val();

    // Create an array to store unique categories
    var categories = [];

    // Iterate over the products to collect unique categories
    for (var key in products) {
      var category = products[key].category;
      if (category && !categories.includes(category)) {
        categories.push(category);
      }
    }

    // Create an option for each category and append it to the dropdown
    categories.forEach(function(category) {
      var option = document.createElement("a");
      option.textContent = category;
      option.setAttribute("onclick", "filterProducts('" + category + "')");
      categoryDropdown.appendChild(option);
    });
  });
}
function toggleDropdown() {
  var dropdownContent = document.getElementById("categoryDropdown");
  var doneFilteringButton = document.getElementById("doneFilteringButton");

  dropdownContent.classList.toggle("show");

}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  }
};
function refreshPage() {
  location.reload();
}
// Call the populateCategories function to populate the dropdown initially
