import { db } from './firebase.js';

// Display and Cide the cart modal window
var cartButton = document.getElementById("cartLink");
    var modal = document.getElementById("myModal");
    var close = document.getElementsByClassName("close")[0];

    cartButton.onclick = function() {
        modal.style.display = "block";
    }

    close.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


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
    sumElem.textContent += sum;
    console.log(sum);
var button = document.getElementById("checkout"); // Proceed to Checkout
    button.addEventListener("click", function(event) {
        window.location.assign("./checkout/delivery.html");
    });

/*
*  Section
*  Background Slides
*/
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

/*  
    * ================================================
    *  Section
    *  Firebase interactions
    * ================================================
*/

const productsRef = db.ref('Products');
const productsList = document.querySelector(".recommendations-container");

// Clear any existing product items from the list
productsList.innerHTML = "";

// Retrieve all product items from the Firebase Realtime Database
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

    const image = document.createElement("img");
    image.src = product.picture;
    image.alt = product.name;
    listItem.appendChild(image);

    const infoDiv = document.createElement("div");
    infoDiv.className = "product-info";
    listItem.appendChild(infoDiv);

    const nameSpan = document.createElement("span");
    nameSpan.className = "product-name";
    nameSpan.textContent = product.name;
    infoDiv.appendChild(nameSpan);

    const priceSpan = document.createElement("span");
    priceSpan.className = "product-price";
    priceSpan.textContent = "$" + product.price;
    infoDiv.appendChild(priceSpan);

  listItem.addEventListener("click", () => {
     localStorage.setItem('id',key);
     localStorage.setItem("category",product.category);
     // redirect to product page
     window.location.assign("prod.html");
   });

    // Add the list item to the products list
    productsList.appendChild(listItem);
  }
});


const verticalContainer = document.querySelector('.instore-container');

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
      localStorage.setItem("category",product.category);
       // redirect to login page
window.location.assign("ProductPage.html");
        // Print the key of the clicked item
      });
    // Add the list item to the product container
    productContainer.appendChild(listItem);

    count++;
  }
});
