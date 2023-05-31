document.querySelector("#Customer").addEventListener("click", e => {
    e.preventDefault();
    window.location.assign("login.html");
});
document.querySelector("#Supplier").addEventListener("click", e => {
    e.preventDefault();
    window.location.assign("loginSupplier.html");
});