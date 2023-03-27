document.querySelector("#validate").addEventListener("click", e => {
    e.preventDefault();
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;

    //var pass = "return the password where the email is equal to the username above"
    var pass = "felo";

    if (username==""){
        alert("incorrect email");
    }
    else if (password!=pass){
        alert("incorrect password");
    }
    else {
        window.location.assign("homepage.html");
    }
});
