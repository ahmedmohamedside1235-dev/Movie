let form = document.querySelector("#Login form"),
    formInputs = form.querySelectorAll("input"),
    inputEmail = form.querySelector("input[type='email']"),
    inputpassword = form.querySelector("input[type='password']"),
    alertError = form.querySelector(".alert"),
    users = [],
    token = null;


(function () {
    if (localStorage.getItem("users") === null) {
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        users = JSON.parse(localStorage.getItem("users"));
        token = localStorage.getItem("token")
    }
})();

if (token) {
    window.location.href = "./Home/index.html";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    userName = checkUserAndGetName(inputEmail.value, inputpassword.value);
    if (userName) {
        alertError.classList.remove("alert-danger", "d-none");
        alertError.classList.add("alert-success");
        alertError.textContent = "Login successfuly";
        setTimeout(() => {
            loginSuccess(userName);
        }, 500);
    } else {
        alertError.classList.remove("alert-success", "d-none"); 
        alertError.classList.add("alert-danger");
        alertError.textContent = "Incorrect Email or Password";
    }
});
