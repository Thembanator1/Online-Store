var imageUrl  = localStorage.getItem("image");
var nname = localStorage.getItem("name");
var price = localStorage.getItem("price");
var ddate = localStorage.getItem("ddate");
var paym = localStorage.getItem("paym");
var deliv = localStorage.getItem("deliv");
var desc = localStorage.getItem("description");
var quantity = localStorage.getItem("quantity");


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

