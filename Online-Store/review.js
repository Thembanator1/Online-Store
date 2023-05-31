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
  var user=localStorage.getItem('user_email');
  // Get a reference to the reviews in the Firebase database
  var reviewsRef = firebase.database().ref('Reviews');
 var id =localStorage.getItem('review_id');
// Get a reference to the database node you want to update
// Reference to users in the database
var usersRef = firebase.database().ref("Reviews");
  
  // Get a reference to the scroll view
var scrollView = document.querySelector('.scroll-view');
var popup = document.querySelector('.popup1');
// Listen for new reviews added to the database
reviewsRef.on('child_added', function(snapshot) {
  // Get the review data from the snapshot
  var review = snapshot.val();
  var star =review.num_of_stars;
  var r_title= review.review_title;
  var context =review.review;
  var date =review.date;
  var id_r=review.product_id;
  if(user==review.customer_email){
    var product_name=" ";
    var pro_img=" ";
    console.log(review.product_id);
    var products=firebase.database().ref('Products/' + id_r );
    products.on('value', (snapshot) => {
      localStorage.setItem("review_id",id_r);
      const productData = snapshot.val();
      product_name=productData.name;
      pro_img=productData.picture;
      // Create a new product box element
      var productBox = document.createElement('div');
      productBox.className = 'product-box';
      // Add an event listener to the product box element to retrieve the snapshot key when clicked
      productBox.addEventListener('click', function() {
        console.log(snapshot.key);
        localStorage.setItem("r_id",snapshot.key);
       // Get a reference to the product box and popup elements
      var productBox = document.querySelector('.product1-box');
      

      // Set the product information
      var productName = product_name;
      var productImageSrc = pro_img;
      var productRating = '&#9733; '.repeat(star);
      var productStatus = "Published";

      // Get references to the elements inside the popup
      var popupProductImage = popup.querySelector('.product1-image');
      var popupProductName = popup.querySelector('.product1-name');
      var popupProductRating = popup.querySelector('.product1-rating');
      var popupProductStatus = popup.querySelector('.product1-status');

      // Set the values of the elements inside the popup
      popupProductImage.src = productImageSrc;
      popupProductName.textContent = productName;
      popupProductRating.innerHTML = productRating;
      popupProductStatus.textContent = 'Status: ' + productStatus;
      popup.style.display = 'block';
      // Show the popup when the product box is clicked
  // Get references to the elements
      const ratingHeader = document.querySelector('.product1-rating-header');
      const ratingStars = document.querySelector('.product1-rating-stars');
      const ratingLabel = document.querySelector('.product1-rating-label');
      const review = document.querySelector('.product1-review');
      const published = document.querySelector('.product1-published');

      // Set the values
      ratingStars.innerHTML = productRating;
      ratingLabel.textContent =r_title;
      review.textContent = context;
      published.textContent = 'Published: '+date;



      });

      // Create a new product image element
      var productImage = document.createElement('img');
      productImage.className = 'product-image';
      productImage.src = pro_img;
      productImage.alt = review.title;

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
  }
});




const changeYearLink = document.querySelector('.change-year');
const yearText = document.querySelector('.year');
const popup1 = document.querySelector('.popup');
const yearList = document.querySelectorAll('.popup li a');

// Show the popup when the "Change" link is clicked
changeYearLink.addEventListener('click', function(e) {
  e.preventDefault();
  popup1.style.display = 'block';
});

// Hide the popup when a year is selected
yearList.forEach(function(yearLink) {
  yearLink.addEventListener('click', function(e) {
    e.preventDefault();
    popup1.style.display = 'none';
    yearText.textContent = yearLink.textContent;
  });
});

function close_btn(){
  popup.style.display = 'none';

}
function editReview(){
  
  window.location.assign("editReview.html");

}
// Function to delete a user
function deleteUser() {
   
  var id =localStorage.getItem('review_id');
  // Get a reference to the database node you want to update
  // Reference to users in the database
  var usersRef = firebase.database().ref("Reviews");
  // Search for user's username in "Products" table and delete if found
  usersRef.orderByChild("product_id").equalTo(id).once("value", function(snapshot) {
snapshot.forEach(function(childSnapshot) {
  // Delete the child from the "Products" table
  childSnapshot.ref.remove();
  
   });
 });
 alert("sucessfully deleted Product");
 popup.style.display = 'none';

}
