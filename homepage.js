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
  var imagesRef = firebase.database().ref("Products");

// Listen for changes to the images in the database
imagesRef.on('value', (snapshot) => {
    // Clear the image container
    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = '';
  
    // Loop through the images in the snapshot and create image elements
    snapshot.forEach((childSnapshot) => {
      // Get the image data from the child snapshot
      const imageData = childSnapshot.val();
  
      // Create an image element
      const image = document.createElement('img');
      image.setAttribute('src', imageData.picture);
  
      // Create a div to hold the image information
      const imageInfo = document.createElement('div');
      imageInfo.classList.add('image-info');
  
      // Create an h3 element for the name
      const name = document.createElement('h3');
      name.textContent = imageData.name;
  
      // Create a p element for the price
      const price = document.createElement('p');
      price.textContent = '$' + imageData.price.toFixed(2);
  
      // Add the name and price to the image info div
      imageInfo.appendChild(name);
      imageInfo.appendChild(price);
  
      // Create a div to hold the image and info
      const imageContainerDiv = document.createElement('div');
      imageContainerDiv.appendChild(image);
      imageContainerDiv.appendChild(imageInfo);
  
      // Add the image and info to the image container
      imageContainer.appendChild(imageContainerDiv);
    });
  });
  
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

//image slider next button
nextBtn.addEventListener("click", () => {
slides.forEach((slide) => {
    slide.classList.remove("active");
});
slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
});

slideNumber++;

if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
}

slides[slideNumber].classList.add("active");
slideIcons[slideNumber].classList.add("active");
});

//image slider previous button
prevBtn.addEventListener("click", () => {
slides.forEach((slide) => {
    slide.classList.remove("active");
});
slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
});

slideNumber--;

if(slideNumber < 0){
    slideNumber = numberOfSlides - 1;
}

slides[slideNumber].classList.add("active");
slideIcons[slideNumber].classList.add("active");
});

//image slider autoplay
var playSlider;

var repeater = () => {
playSlider = setInterval(function(){
    slides.forEach((slide) => {
    slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
}, 4000);
}
repeater();

//stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
clearInterval(playSlider);
});

//start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
repeater();
});