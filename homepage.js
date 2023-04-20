
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

/**************************************
 * Cart Button Script
 *************************************/
		var cartLink = document.getElementById("cartLink");
		var modal = document.getElementById("myModal");
		var close = document.getElementsByClassName("close")[0];

		cartLink.onclick = function() {
			modal.style.display = "block";
		}

		close.onclick = function() {
			modal.style.display = "none";
		}

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}


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
        sumElem.textContent += sum;
        console.log(sum);


