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


// Get a reference to the Firebase database
const database = firebase.database();
const id = localStorage.getItem('id');
const user_email=localStorage.getItem('user_email');

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
});

function addToCart(){
// Get a reference to the product node in the database


// Retrieve the product data from the database
productRef.once('value', (snapshot) => {
  const productData = snapshot.val();

  // Set the image source attribute
  var productId=id;
  var productImage = productData.picture;

  // Set the product description
  
  var description = productData.description;
var productName=productData.name;
  // Set the product price
  
  var productPrice= productData.price;
 var customer_email=user_email;
  saveMessages(productId, productName, productPrice,description,productImage, customer_email  );
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
    
    
    // redirect to login page
    window.location.assign("cart.html");
    };



