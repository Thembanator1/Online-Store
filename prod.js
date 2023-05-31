import { db, db_firestore } from './firebase.js';

var user = localStorage.getItem('user_email');
const id = localStorage.getItem('id');

// Get a reference to the product node in the database
const productRef = db.ref('Products/' + id);
console.log(productRef);
// Retrieve the product data from the database
productRef.once('value', (snapshot) => {
  const productData = snapshot.val();
  const img = document.getElementById('product-img');
  img.src = productData.picture;

  const desc = document.getElementById('product-desc');
  desc.textContent = productData.description;

  const price = document.getElementById('product-price');
  price.textContent += ' ' + productData.price;
});

function addToCart(){
    // Create a reference to the Firestore collection where you want to store the cart items
    const cartCollection = firestore.collection('users').doc(user).collection('cart');

    // Create a new document in the cart collection with the product data
    cartCollection.add({
    picture: productData.picture,
    description: productData.description,
    price: productData.price
    })
    .then((docRef) => {
    console.log('Product added to cart with ID: ', docRef.id);
    })
    .catch((error) => {
    console.error('Error adding product to cart: ', error);
    });
}


