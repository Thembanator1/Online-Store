const firebaseConfig = {
  // Add your Firebase config information here
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
    authDomain: "online-store-b90ca.firebaseapp.com",
    databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
    projectId: "online-store-b90ca",
    storageBucket: "online-store-b90ca.appspot.com",
    messagingSenderId: "160581372978",
    appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
    measurementId: "G-PH4QNCPP2J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var id="none";
 localStorage.setItem('item_key', id);

var imagesRef = firebase.database().ref("Products");

const productsList = document.querySelector(".image-container");

// Clear any existing product items from the list
productsList.innerHTML = "";

// Retrieve all product items from the Firebase Realtime Database
const productsRef = firebase.database().ref("Products");
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
    infoDiv.className = "product-info";
    listItem.appendChild(infoDiv);

    // Create a span element to display the product name
    const nameSpan = document.createElement("span");
    nameSpan.className = "product-name";
    nameSpan.textContent = product.name;
    infoDiv.appendChild(nameSpan);

    // Create a span element to display the product price
    const priceSpan = document.createElement("span");
    priceSpan.className = "product-price";
    priceSpan.textContent = "$" + product.price;
    infoDiv.appendChild(priceSpan);

    // Add an event listener to the list item
//     listItem.addEventListener("click", () => {
//         localStorage.setItem('id',key);
//                // redirect to login page
// window.location.assign("ProductPage.html");
//       // Print the key of the clicked item
//     });

    // Add the list item to the products list
    productsList.appendChild(listItem);
  }
});


  


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

const verticalContainer = document.querySelector('.vertical-container');

// Retrieve all product items from the Firebase Realtime Database
//const productsRef = firebase.database().ref('Products');
productsRef.on('value', snapshot => {
  // Clear any existing product items from the container
  verticalContainer.innerHTML = '';

  const products = snapshot.val();

  // Create a container for each two products
  let productContainer;
  let count = 0;

  for (const [key, product] of Object.entries(products)) {
    // Create a new container for every two products
    if (count % 2 === 0) {
      productContainer = document.createElement('div');
      productContainer.className = 'product-container';
      verticalContainer.appendChild(productContainer);
    }

    // Create a new list item for the product
    const listItem = document.createElement('div');
    listItem.className = 'product-item';

    // Create an image element to display the product image
    const image = document.createElement('img');
    image.src = product.picture;
    image.alt = product.name;
    listItem.appendChild(image);

    // Create a div element to hold the product name and price
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';
    listItem.appendChild(infoDiv);

    // Create a span element to display the product name
    const nameSpan = document.createElement('span');
    nameSpan.className = 'product-name';
    nameSpan.textContent = product.name;
    infoDiv.appendChild(nameSpan);

    // Create a span element to display the product price
    const priceSpan = document.createElement('span');
    priceSpan.className = 'product-price';
    priceSpan.textContent = '$' + product.price;
    infoDiv.appendChild(priceSpan);

    // Add an event listener to the list item
    listItem.addEventListener("click", () => {
      localStorage.setItem('id',key);
       // redirect to login page
window.location.assign("ProductPage.html");
        // Print the key of the clicked item
      });
    // Add the list item to the product container
    productContainer.appendChild(listItem);

    count++;
  }
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



