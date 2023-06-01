const prodRef = database.ref('Products');
const shippRef = database.ref('Shipping');
var suppliers_email = "";
cartRef.once("value", (snapshot) => {
  var cartData = snapshot.val();
  var productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  var customer_email = localStorage.getItem('user_email');
  for (const productId in cartData) {
    const cartItem = cartData[productId];

    if (cartItem.customer_email == customer_email) {
      var productName = cartItem.product_name;
      var description = cartItem.description;
      var productPrice = cartItem.product_price;
      var link = cartItem.product_image;
      var DeliveryMethod = "Online Flying";
      var PaymentMethod = "Cash";
      var quantity = cartItem.quantity;
      var status = "open";
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let my_date = day + "/" + month + "/" + year;
      console.log(my_date);

      const productId = cartItem.product_id;
      prodRef.once("value", (snapshot) => {
        const cartData2 = snapshot.val();
        for (const [key, product] of Object.entries(cartData2)) {

          const cartItem2 = product;

          const productId2 = key;

          if (productId2 == productId) {
            suppliers_email = cartItem2.suppliers_email;
            alert("only supplier email is not found");

            saveMessages(
              DeliveryMethod,
              PaymentMethod,
              customer_email,
              suppliers_email,
              my_date,
              description,
              productName,
              productPrice,
              quantity,
              status,
              productId,
              link
            );
          }
        }
      });
    }
  }
});
alert('Your Order has been placed');

// function to save user data to the database
const saveMessages = (DeliveryMethod, PaymentMethod, customer_email, suppliers_email, my_date, description, productName, productPrice, quantity, status, productId, link) => {
  var newContactForm = shippRef.push();
  // set data to be saved
  newContactForm.set({
    Delivery_Method: DeliveryMethod,
    Payment_Method: PaymentMethod,
    customer_email: customer_email,
    date: my_date,
    description: description,
    name: productName,
    status: status,
    price: productPrice,
    quantity: quantity,
    picture: link,
    product_id: productId,
    suppliers_email: suppliers_email
  });

  // redirect to login page
};
