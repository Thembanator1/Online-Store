import { db, db_firestore } from './firebase.js';

var id="none";
localStorage.setItem('item_key', id);

const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

//image slider next button
nextBtn.addEventListener("click", () => {
slides.forEach((slide) => {
    slide.classList.remove("active");
});
slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
});

slideNumber++;

if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
}

slides[slideNumber].classList.add("active");
slideIcons[slideNumber].classList.add("active");
});

//image slider previous button
prevBtn.addEventListener("click", () => {
slides.forEach((slide) => {
    slide.classList.remove("active");
});
slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
});

slideNumber--;

if(slideNumber < 0){
    slideNumber = numberOfSlides - 1;
}

slides[slideNumber].classList.add("active");
slideIcons[slideNumber].classList.add("active");
});

//image slider autoplay
var playSlider;

var repeater = () => {
playSlider = setInterval(function(){
    slides.forEach((slide) => {
    slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
}, 4000);
}
repeater();

//stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
clearInterval(playSlider);
});

//start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
repeater();
});

/**
 * =========Done with background Slides===========
 **/


const productsList = document.querySelector(".foryou-container");
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



/**
 * +-+-+-+--JavaScript for the Cart from here--+-+-+-+-+
 **/
const cartTable = document.getElementById('cart-table');
const cartTotalElement = document.getElementById('cart-total');
const customer_email = localStorage.getItem('user_email');
// Function to calculate and update the cart total
function updateCartTotal() {
  const rows = cartTable.querySelectorAll('tr');
  let total = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const subtotalCell = row.querySelector('td:nth-child(3)');
    const subtotal = parseFloat(subtotalCell.textContent);
    total += subtotal;
  }

  cartTotalElement.textContent = `Total: ${total}`;
}

// Function to handle product removal
function removeProduct(event) {
  const button = event.target;
  const row = button.closest('tr');
  row.remove();
  updateCartTotal();
}

// Retrieve the cart data from the database
firebase.database().ref('Cart').once('value', snapshot => {
  const cartData = snapshot.val();

  for (const productId in cartData) {
    const cartItem = cartData[productId];

    if (cartItem.customer_email === customer_email) {
      const productImage = cartItem.product_image;
      const productName = cartItem.product_name;
      const productPrice = cartItem.product_price;

      const newRow = document.createElement('tr');
      const productCell = document.createElement('td');
      const quantityCell = document.createElement('td');
      const subtotalCell = document.createElement('td');
      const actionsCell = document.createElement('td');
      const removeButton = document.createElement('button');

      productCell.innerHTML = `
        <div class="cart-info">
          <img src="${productImage}">
          <div>
            <p>${productName}</p>
            <small>Price: ${productPrice}</small>
          </div>
        </div>
      `;

      quantityCell.innerHTML = '<input type="number" value="1">';
      subtotalCell.textContent = productPrice;
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-product');

      removeButton.addEventListener('click', removeProduct);

      actionsCell.appendChild(removeButton);

      newRow.appendChild(productCell);
      newRow.appendChild(quantityCell);
      newRow.appendChild(subtotalCell);
      newRow.appendChild(actionsCell);

      cartTable.appendChild(newRow);
    }
  }

  updateCartTotal();
  // Calculate and update the total price
  let sum = 0;
  const rows = document.querySelectorAll('table tr');
  for (let i = 1; i < rows.length; i++) { 
    const subtotalStr = rows[i].querySelector('td:nth-child(3)').textContent;
    const subtotalNum = parseFloat(subtotalStr.replace(/[^\d.-]+/g,""));
    sum += subtotalNum;
  }
  const totalElem = document.getElementById('cart-total');
  totalElem.textContent = `TOTAL: (${rows.length - 1} items)`;
  const sumElem = document.getElementById('cart-sum');
  sumElem.textContent = "R " + sum;
});

// Event delegation for remove buttons
cartTable.addEventListener('click', event => {
  const button = event.target;
  if (button.classList.contains('remove-product')) {
    removeProduct(event);
    // Calculate and update the total price
  let sum = 0;
  const rows = document.querySelectorAll('table tr');
  for (let i = 1; i < rows.length; i++) { 
    const subtotalStr = rows[i].querySelector('td:nth-child(3)').textContent;
    const subtotalNum = parseFloat(subtotalStr.replace(/[^\d.-]+/g,""));
    sum += subtotalNum;
  }
  const totalElem = document.getElementById('cart-total');
  totalElem.textContent = `TOTAL: (${rows.length - 1} items)`;
  const sumElem = document.getElementById('cart-sum');
  sumElem.textContent = "R " + sum;
  }
});



