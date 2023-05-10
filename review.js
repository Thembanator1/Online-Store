// Initialize Firebase
var firebaseConfig = {
    // Your Firebase config
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
  
  // Get a reference to the reviews in the Firebase database
  var reviewsRef = firebase.database().ref('Reviews');
  
  // Get a reference to the scroll view
  var scrollView = document.querySelector('.scroll-view');
  
  // Listen for new reviews added to the database
  reviewsRef.on('child_added', function(snapshot) {
    // Get the review data from the snapshot
    var review = snapshot.val();
    var product_name=" ";
    var pro_img=" ";
    console.log(review.product_id);
    var products=firebase.database().ref('Products/' + '-NTdxbInhERFMXN8FkJv');
    products.once('value', (snapshot) => {
       
        const productData = snapshot.val();
        product_name=productData.name;
        pro_img=productData.picture;
         // Create a new product box element
    var productBox = document.createElement('div');
    productBox.className = 'product-box';
   
    console.log(product_name);
    console.log(pro_img);
    // Create a new product image element
    var productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = pro_img;
    productImage.alt = "good";
  
    // Create a new product info element
    var productInfo = document.createElement('div');
    productInfo.className = 'product-info';
  
    // Create a new product name element
    var productName = document.createElement('div');
    productName.className = 'product-name';
    productName.textContent = product_name;
  
    // Create a new product rating element
    var productRating = document.createElement('div');
    productRating.className = 'product-rating';
    productRating.innerHTML = '&#9733; '.repeat(review.num_of_stars);
  
    // Create a new product status element
    var productStatus = document.createElement('div');
    productStatus.className = 'product-status';
    productStatus.textContent = 'Status: ' + "published";
  
    // Append the product image, name, rating, and status to the product info element
    productInfo.appendChild(productName);
    productInfo.appendChild(productRating);
    productInfo.appendChild(productStatus);
  
    // Append the product image and info to the product box
    productBox.appendChild(productImage);
    productBox.appendChild(productInfo);
  
    // Append the product box to the scroll view
    scrollView.appendChild(productBox);
       
    });
   
  });


const changeYearLink = document.querySelector('.change-year');
const yearText = document.querySelector('.year');
const popup = document.querySelector('.popup');
const yearList = document.querySelectorAll('.popup li a');

// Show the popup when the "Change" link is clicked
changeYearLink.addEventListener('click', function(e) {
  e.preventDefault();
  popup.style.display = 'block';
});

// Hide the popup when a year is selected
yearList.forEach(function(yearLink) {
  yearLink.addEventListener('click', function(e) {
    e.preventDefault();
    popup.style.display = 'none';
    yearText.textContent = yearLink.textContent;
  });
});