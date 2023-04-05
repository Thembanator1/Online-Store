function nextView() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("confirmation");
    if (form1.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
    } else if (form2.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
    } else {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
    }
}

function prevView() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("confirmation");
    if (form3.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
    } else if (form2.style.display !== "none") {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
    } else {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
    }
}

// var switchButton = document.getElementById("switch-button");
// switchButton.addEventListener("click", toggleForm);


  