document.querySelector("#validate").addEventListener("click", e => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    var confirm = document.getElementById("Confirm").value;
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name==""){
        alert("enter name");
    }
    else if (surname==""){
        alert("enter surname");
    }
    else if (!regexp.test(String(username).toLowerCase())){
        alert("invalide email");
    }
    else if (password.length<6){
        alert("Password must be at least 6 characters in length");
    }
    else if (password!=confirm){
        alert("confirmation password does not match with password");
    }
    else {
        //here is where you will insert the username and password variables into the database
        window.location.assign("login.html");
    }
});