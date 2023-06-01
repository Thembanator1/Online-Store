// Initialize Firebase
var firebaseConfig = {
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
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  var contactFormDB = firebase.database().ref("Products");
  // Get a reference to the database service
  var database = firebase.database();
  var email  = localStorage.getItem("supplier_email");
  
  // Function to upload image to Firebase Storage
  function uploadImage() {
     // Get the values of the input fields
  var productName = document.getElementById('product-name').value;
  var productDescription = document.getElementById('product-description').value;
  var productPrice = document.getElementById('product-price').value;
  const select = document.querySelector('select');
  var productCategory = select.value;

 //var productQuantity = document.getElementById('product-category').value;
  var link="none";
    // Get the selected file from the input element
    var file = document.getElementById('image-upload').files[0];
    if (productName && productDescription && productPrice && productCategory) {
    // Create a storage reference to the selected file
   
    var storageRef = storage.ref('images/' + file.name);
  
    // Upload the file to Firebase Storage
    var task = storageRef.put(file);
  
    // Get the download URL of the uploaded file and store it in Firebase Database
    task.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        
        link=url;
        
        saveMessages(productName , productDescription , productPrice , productCategory,link);
        //database.ref('images').push({url: url});
       
      });
     
    });
    //saveMessages(productName , productDescription , productPrice , productQuantity,link);
}
else {
    alert('Please fill in all the required fields.');
  }
  }
  // function to save user data to the database
const saveMessages = (productName , productDescription , productPrice , productCategory,link) => {
    var newContactForm = contactFormDB.push();
    // set data to be saved
    newContactForm.set({
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        picture :link,
        suppliers_email:email
    });
    
    
    // redirect to login page
    alert('Image uploaded successfully!');
    };
    function moveNow() {
      window.location.href = "supplier_sales.html";
    }
    
