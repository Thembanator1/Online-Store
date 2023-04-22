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
    var product=snapshot.exportVal();
    for(let i in product){
      console.log(product[i])
      if(product[i].name.toLowerCase().indexOf(query)!=-1){
        var objectDiv = document.createElement("div");
        objectDiv.className = "object";
        
        var objectImage = document.createElement("img");
        objectImage.src = product[i].picture; // Assuming there's a URL property in the data
        objectImage.alt = product[i].name;
        objectImage.alt = product[i].price;
        objectImage.className = "item-image";
        
        objectImage.onclick = function () {
          // Redirect to another HTML page when the image is clicked
          window.location.href = "ProductPage.html?id=" + i;
        };
        objectDiv.appendChild(objectImage);
        
        var objectName = document.createElement("p");
        var price=document.createElement("q");
        objectName.innerHTML = product[i].name;
        price.innerHTML=("$"+product[i].price);
        objectDiv.appendChild(objectName);
        objectDiv.appendChild(price);
        
        objectlist.appendChild(objectDiv);
      }
    }

  })
}
  



  

 
  
 