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
// initialize Firebase using the provided configuration
firebase.initializeApp(firebaseConfig);
// reference your database
// reference your database
var id="none";
localStorage.setItem('item_key', id);

var imagesRef = firebase.database().ref("Products");
// Retrieve all product items from the Firebase Realtime Database
const productsRef = firebase.database().ref("Products");
 // document.getElementById("Onlinestore").addEventListener("submit", submitForm)r query="";

   function searchObjects(){
  query =document.getElementById("searchInput").value.toLowerCase();
  var objectlist=document.getElementById("objectList");
  objectlist.innerHTML="";
  productsRef.once("value", function(snapshot){
    var product=snapshot.val();
    for (var [key, product] of Object.entries(product)){
      console.log(product)
      if(product.name.toLowerCase().indexOf(query)!=-1){
        var objectDiv = document.createElement("div");
        objectDiv.className = "object";
        
        var objectImage = document.createElement("img");
        objectImage.src = product.picture; // Assuming there's a URL property in the data
        objectImage.alt = product.name;
        objectImage.alt = product.price;
        objectImage.className = "item-image";
        

        objectDiv.appendChild(objectImage);
        
        var objectName = document.createElement("p");
        var price=document.createElement("q");
        objectName.innerHTML = product.name;
        price.innerHTML=("$"+product.price);
        objectDiv.appendChild(objectName);
        objectDiv.appendChild(price);

        objectDiv.addEventListener("click", () => {
          localStorage.setItem('id',key);
           // redirect to login page
            window.location.assign("ProductPage.html");
            // Print the key of the clicked item
          });
        
        objectlist.appendChild(objectDiv);
      }
    }

  })
}