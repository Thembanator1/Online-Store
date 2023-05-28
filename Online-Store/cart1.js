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

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = firebase.database();

const customer_email = localStorage.getItem('user_email');
// Get a reference to the product node in the database
const cartRef = database.ref('Cart');
// Retrieve the product data from the database
cartRef.once("value", (snapshot) => {
    const cartData = snapshot.val();
    for (const productId in cartData) {
        const cartItem = cartData[productId];
        // Display the cart item on the cart page
        //console.log(cartItem)
        if (cartItem.customer_email == customer_email) {
            //console.log(cartItem)
            // Set the image source attribute
            const productId = cartItem.product_id;
            const productImage = cartItem.product_image;

            // Set the product description
            const description = cartItem.description;
            const productName = cartItem.product_name;

            // Set the product price
            const productPrice = cartItem.product_price;
            //const customer_email = "abc123@gmail.com";

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
            sumElem.textContent = "R " + sum;
            localStorage.setItem("price",sum);
            // Add event listener to remove button
            const removeButton = actionsCell.querySelector('.remove-product');
            removeButton.addEventListener('click', function() {
           deleteUser(key);
            newRow.remove();
                // Recalculate and update the total price
                sum -= parseFloat(subtotalCell.textContent);
                totalElem.textContent = `TOTAL: (${rows.length - 2} items)`;
                sumElem.textContent = "R " + sum;
            });
        }
    }
});
// Function to delete a user
function deleteUser(id) {
   

    // Search for user's username in "Products" table and delete if found
    usersRef.orderByChild("product_id").equalTo(id).once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    // Delete the child from the "Products" table
    childSnapshot.ref.remove();
    
     });
   });
   alert("sucessfully deleted Product");
   window.location.assign("reviews.html");
  }

