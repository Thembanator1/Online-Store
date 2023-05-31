import { db, db_firestore } from './firebase.js';

var id="none";
localStorage.setItem('item_key', id);
  


const productsList = document.querySelector(".foryou-container");

// Clear any existing product items from the list
productsList.innerHTML = "";

// Retrieve all product items from the Firebase Realtime Database
const productsRef = db.ref("Products");
productsRef.once("value", snapshot => {
const products = snapshot.val();

// Shuffle the products randomly using Fisher-Yates algorithm
const shuffledProducts = Object.entries(products);
for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
}

// Loop through only 60% of the shuffled products
const numProducts = Math.floor(shuffledProducts.length * 0.6);
for (const [key, product] of shuffledProducts.slice(0, numProducts)) {
    // Create a new list item for each product item
    const listItem = document.createElement("div");
    listItem.className = "product-item";

    // Create an image element to display the product image
    const image = document.createElement("img");
    image.src = product.picture;
    image.alt = product.name;
    listItem.appendChild(image);

    // Create a div element to hold the product name and price
    const infoDiv = document.createElement("div");
    infoDiv.className = "details";
    listItem.appendChild(infoDiv);

    // Create a h3 element to display the product name
    const nameSpan = document.createElement("h3");
    nameSpan.textContent = product.name;
    infoDiv.appendChild(nameSpan);

    // Create a h4 element to display the product category
    const categorySpan = document.createElement("h4");
    categorySpan.textContent = product.category;
    infoDiv.appendChild(categorySpan);

    // Create a h2 element to display the product price
    const priceSpan = document.createElement("h2");
    priceSpan.textContent = "R " + product.price;
    infoDiv.appendChild(priceSpan);

// Add an event listener to the list item
listItem.addEventListener("click", () => {
    localStorage.setItem('id',key);
    localStorage.setItem("category",product.category);
            // redirect to login page
    window.location.assign("ProductPage.html");
    // Print the key of the clicked item
});

// Add the list item to the products list
    productsList.appendChild(listItem);
}
});


const instoreList = document.querySelector(".instore-container");

// Clear any existing product items from the list
instoreList.innerHTML = "";

// Retrieve all product items from the Firebase Realtime Database
productsRef.once("value", snapshot => {
const products = snapshot.val();

// Shuffle the products randomly using Fisher-Yates algorithm
const shuffledProducts = Object.entries(products);
for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
}

// Loop through only 100% of the shuffled products
const numProducts = Math.floor(shuffledProducts.length * 1);
for (const [key, product] of shuffledProducts.slice(0, numProducts)) {
    // Create a new list item for each product item
    const listItem = document.createElement("div");
    listItem.className = "product-item";

    // Create an image element to display the product image
    const image = document.createElement("img");
    image.src = product.picture;
    image.alt = product.name;
    listItem.appendChild(image);

    // Create a div element to hold the product name and price
    const infoDiv = document.createElement("div");
    infoDiv.className = "details";
    listItem.appendChild(infoDiv);

    // Create a h3 element to display the product name
    const nameSpan = document.createElement("h3");
    nameSpan.textContent = product.name;
    infoDiv.appendChild(nameSpan);

    // Create a h4 element to display the product category
    const categorySpan = document.createElement("h4");
    categorySpan.textContent = product.category;
    infoDiv.appendChild(categorySpan);

    // Create a h2 element to display the product price
    const priceSpan = document.createElement("h2");
    priceSpan.textContent = "R " + product.price;
    infoDiv.appendChild(priceSpan);

// Add an event listener to the list item
listItem.addEventListener("click", () => {
    localStorage.setItem('id',key);
    localStorage.setItem("category",product.category);
            // redirect to login page
    window.location.assign("ProductPage.html");
    // Print the key of the clicked item
});

// Add the list item to the products list
    instoreList.appendChild(listItem);
}
});





  

  
  
  
  