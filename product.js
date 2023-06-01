import { db, db_firestore } from './firebase.js';

// get reference to the Firebase database
var contactFormDB = db.ref("Cart");
var user = localStorage.getItem('user_email');
var reviewsRef = db.ref('Reviews');
const id = localStorage.getItem('id');
const categories=localStorage.getItem('category');



// Get a reference to the product that was clicked to get here
const clickedProd = db.ref('Products/' + id);

// Retrieve the product data from the database
clickedProd.once('value', (snapshot) => {
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


const productsList = document.querySelector(".instore-container");
// Retrieve all product items from the Firebase Realtime Database
const productsRef = db.ref("Products");
productsRef.once("value", snapshot => {
  productsList.innerHTML = ""; // Clear any existing product items from the list
  const products = snapshot.val();

  // Shuffle the products randomly using Fisher-Yates algorithm
  const shuffledProducts = Object.entries(products)
    .map(([key, product]) => ({ key, ...product }));
  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
  }

  // Loop through only 100% of the shuffled products
  const numProducts = Math.floor(shuffledProducts.length * 0.6);
  for (const { key, ...product } of shuffledProducts.slice(0, numProducts)) {
    if (product.category === categories && key !== id) {
      const listItem = document.createElement("div");
      listItem.className = "product-item";

      const image = document.createElement("img");
      image.src = product.picture;
      image.alt = product.name;
      listItem.appendChild(image);

      const infoDiv = document.createElement("div");
      infoDiv.className = "details";
      listItem.appendChild(infoDiv);

      const nameSpan = document.createElement("h3");
      nameSpan.textContent = product.name;
      infoDiv.appendChild(nameSpan);

      const categorySpan = document.createElement("h4");
      categorySpan.textContent = product.category;
      infoDiv.appendChild(categorySpan);

      const priceSpan = document.createElement("h2");
      priceSpan.textContent = "R " + product.price;
      infoDiv.appendChild(priceSpan);

      listItem.addEventListener("click", () => {
        localStorage.setItem('id', key);
        localStorage.setItem('category', product.category);
        window.location.assign("ProductPage.html");
      });

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


function addToCart() {
  // Get a reference to the product node in the database
  const database = db;
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



