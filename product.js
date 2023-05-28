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
var user = localStorage.getItem('user_email');
var reviewsRef = firebase.database().ref('Reviews');
const id = localStorage.getItem('id');
const categories=localStorage.getItem('category');

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

  // Loop through only 100% of the shuffled products
const numProducts = Math.floor(shuffledProducts.length * 1);
for (const [key, product] of shuffledProducts.slice(0, numProducts)) {
  // Check if the product belongs to the "Cellphones & Smartwatches" category
  if (product.category === categories && key!==id ) {
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
    listItem.addEventListener("click", () => {
      localStorage.setItem('id', key);
      localStorage.setItem("category",product.category);
      // Redirect to login page
      window.location.assign("ProductPage.html");
      // Print the key of the clicked item
    });

    // Add the list item to the products list
    productsList.appendChild(listItem);
  }
}

});


reviewsRef.once('value', (snapshot) => {
  const reviewsnode = snapshot.val();
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = "";
  let totalStars = 0;
  let numReviews = 0;
  for (const key in reviewsnode) {
    if(id==reviewsnode[key].product_id){
    const review = reviewsnode[key].review;
    const reviewTitle = reviewsnode[key].review_title;
    const customerEmail = reviewsnode[key].customer_email;
    const reviewDate = reviewsnode[key].date;
    const numStars = reviewsnode[key].num_of_stars;
    console.log(review);
    console.log(reviewTitle);
    console.log(reviewDate);
    console.log(customerEmail);
    console.log(numStars);
    totalStars += numStars;
    numReviews++;
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");

    const title = document.createElement("h3");
    title.textContent = reviewTitle;

    const stars = document.createElement("div");
    stars.classList.add("stars");
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      stars.appendChild(star);
    }

    const email = document.createElement("p");
    email.textContent = customerEmail;

    const date = document.createElement("p");
    date.textContent = reviewDate;

    const comment = document.createElement("p");
    comment.textContent = review;

    reviewDiv.appendChild(title);
    reviewDiv.appendChild(stars);
    reviewDiv.appendChild(email);
    reviewDiv.appendChild(comment);
    reviewDiv.appendChild(date);

    reviewsContainer.appendChild(reviewDiv);
  
    if (numReviews > 0) {
      const averageRating = Math.min(5, Math.max(0, Math.round((totalStars / numReviews) * 2) / 2));
      console.log(averageRating);
      const ratingStars = document.createElement("div");
      ratingStars.classList.add("starsrating");
      for (let i = 0; i < Math.floor(averageRating); i++) {
        const star = document.createElement("a");
        star.textContent = "★";
        ratingStars.appendChild(star);
      }
      if (averageRating % 1 !== 0) {
        const halfStar = document.createElement("a");
        halfStar.textContent = "★";
        halfStar.style = "clip-path: polygon(0% 0%, 60% 0%, 60% 60%, 0% 60%)";
        ratingStars.appendChild(halfStar);
      }
      const ratingContainer = document.getElementById("ratingContainer");
      ratingContainer.innerHTML = "";
      ratingContainer.appendChild(ratingStars);
    } else {
      const noReviews = document.createElement("p");
      noReviews.textContent = "No reviews for this product yet.";
      const ratingContainer = document.getElementById("ratingContainer");
      ratingContainer.innerHTML = "";
      ratingContainer.appendChild(noReviews);
    }

    }
  }
});

// Get a reference to the Firebase database
const database = firebase.database();


// Get a reference to the product node in the database
const productRef = database.ref('Products/' + id);

// Retrieve the product data from the database
productRef.once('value', (snapshot) => {
  const productData = snapshot.val();

  // Set the image source attribute
  const img = document.getElementById('product-img');
  img.src = productData.picture;

  // Set the product description
  const desc = document.getElementById('product-desc');
  desc.textContent = productData.description;

  // Set the product price
  const price = document.getElementById('product-price');
  price.textContent += ' ' + productData.price;
});//end of prodRef

function addToCart() {
  // Get a reference to the product node in the database
  const database = firebase.database();
  const id = localStorage.getItem('id');
  const productRef = database.ref('Products/' + id);

  // Retrieve the product data from the database
  productRef.once("value", (snapshot) => {
    const productData = snapshot.val();

    // Set the image source attribute
    const productId = id;
    const productImage = productData.picture;

    // Set the product description
    const description = productData.description;
    const productName = productData.name;

    // Set the product price
    const productPrice = productData.price;
    const customer_email = "abc123@gmail.com";

    saveMessages(
      productId,
      productName,
      productPrice,
      description,
      productImage,
      customer_email
    );

    //++++++++++------ADDING to the CART table on html by add to cart button---++++++++++++++//
    // Get a reference to the table element
    const cartTable = document.querySelector("#cart-table");

    // Create a new table row and cells
    const newRow = document.createElement("tr");
    const productCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const subtotalCell = document.createElement("td");
    const actionsCell = document.createElement("td");

    // Populate the cells with product information
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
    actionsCell.innerHTML = '<button id="remove-product">Remove</button>';

    // Append the cells to the new row
    newRow.appendChild(productCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(subtotalCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table
    cartTable.appendChild(newRow);

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
    sumElem.textContent = sum;
  });
}



// function to save user data to the database
const saveMessages = (productId, productName, productPrice,description,productImage, customer_email  ) => {
    var newContactForm = contactFormDB.push();
    // set data to be saved
    newContactForm.set({
        product_id: productId,
        product_name: productName,
        product_price: productPrice,
        description: description,
        product_image: productImage,
        quantity: 1,
        customer_email: customer_email
    });
    
  };



