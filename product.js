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
    actionsCell.innerHTML = '<button class="remove-product">Remove</button>';

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



