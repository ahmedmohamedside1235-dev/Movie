let form = document.querySelector("#Register form"),
    formInputs = form.querySelectorAll("input"),
    data = [],
    token = null;
(function () {
    if (localStorage.getItem("users") === null) {
        updateLocalStorage();
    } else {
        data = JSON.parse(localStorage.getItem("users"));
        token = localStorage.getItem("token");
    }
})();

if (token) {
    window.location.href = "../index.html";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let focusInput = form.querySelector("input:focus") ?? undefined;
    focusInput?.blur();

    let check = document.querySelector("input.invalid");

    if (check !== null) {
        return;
    } else {
        addUser();
        form.reset();
        window.location.replace("../index.html")
    }
});

formInputs.forEach(input => {
    input.addEventListener("blur", () => {
        checkValidateInput(input);
    });
});