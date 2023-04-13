var next=document.getElementById("next-button");
var prev=document.getElementById("prev-button");
var done=document.getElementById("done");
if(form1.style.display !== "none"){
    prev.style.display="none";
    done.style.display="none";
}
function nextView() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("confirmation");
    if (form1.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        form3.style.display = "none";
        prev.style.display="block";
    } else if (form2.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "none";
        form3.style.display = "block";
        next.style.display="none";
        done.style.display="block";
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
        next.style.display="block";
        done.style.display="none";
    } else if (form2.style.display !== "none") {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
        prev.style.display="none";
    } else {
        form1.style.display = "block";
        form2.style.display = "none";
        form3.style.display = "none";
    }
}
function doneView(){
    window.location.assign("homepage.html");
}

// var switchButton = document.getElementById("switch-button");
// switchButton.addEventListener("click", toggleForm);


  