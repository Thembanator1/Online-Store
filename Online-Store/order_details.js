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
var user = localStorage.getItem('user_email');
var reviewsRef = firebase.database().ref('Reviews');
var ids=localStorage.getItem("shipping");
const supplir_emailRef = firebase.database().ref('Shipping/' + ids + '/supplier_email');
var imageUrl  = localStorage.getItem("image");
var nname = localStorage.getItem("name");
var price = localStorage.getItem("price");
var ddate = localStorage.getItem("ddate");
var paym = localStorage.getItem("paym");
var deliv = localStorage.getItem("deliv");
var desc = localStorage.getItem("description");
var quantity = localStorage.getItem("quantity");
var i=localStorage.getItem("id");
console.log(i);
const img = document.getElementById('product-img');
img.src = imageUrl;

const pdesc = document.getElementById('product-desc');
pdesc.textContent = desc;

const pprice = document.getElementById('product-price');
pprice.textContent = "R" + price;

const pName = document.getElementById('product-name');
pName.textContent = nname;

const pdate = document.getElementById('product-date');
pdate.textContent = ddate;

const pquantity = document.getElementById('product-quantity');
pquantity.textContent = quantity;

const ptype = document.getElementById('product-pay-type');
ptype.textContent =  paym;

const pdeliv = document.getElementById('product-delivery');
pdeliv.textContent =  deliv;

