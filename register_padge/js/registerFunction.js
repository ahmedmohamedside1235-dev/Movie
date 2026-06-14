function checkValidateInput(input) {
    let inputValue = input.value,
        inputName = input.name,
        alertError = input.nextElementSibling,

        //* add regex
        objRegex = {
            name: /^(\s)*[A-Za-z]{3,}(\s){0,1}[A-Za-z]*(\2)*$/,
            email: /^[A-Za-z]+[a-zA-z0-9\.\-_]*@(gmail\.com|yahoo\.com)[\s]*$/,
            password: /^[A-Za-z0-9]{6,}$/
        },
        regex = objRegex[inputName];

    //* if input Not Empty
    if (inputValue !== "") {

        //* check regex
        if (!(regex.test(inputValue))) {
            alertError.classList.remove("d-none");
            input.classList.add("invalid");

            //* if input email
            if (inputName == "email") {
                alertError.textContent = "invalid email (examble@gmail.com)";
            }

            //* if input password
            else if (inputName == "password") {
                alertError.textContent = "invalid password(minimum 6 character or digit)";
            }

            //* if input name
            else {
                alertError.textContent = "invalid Name";
            }

        }

        //* if input valid
        else {
            alertError.classList.add("d-none");
            input.classList.remove("invalid");
        }

    }

    //* if input Empty
    else if (inputValue === "") {
        alertError.textContent = "This input is rquired"
        alertError.classList.remove("d-none");
        input.classList.add("invalid");
    }

    //* if input valid
    else {
        alertError.classList.add("d-none");
        input.classList.remove("invalid");
        flag = true;
    }

    //* check if email an exists
    if (inputName === "email")
        checkAnExistsEmail(inputValue, alertError, input);
}

function getData() {
    let newUser = {};
    formInputs.forEach(input => {
        let inputName = input.name;
        newUser[inputName] = input.value;
    });

    return newUser;
}

function addUser() {
    let userData = getData();
    data.push(userData);

    //* update local storage
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem("users", JSON.stringify(data));
}

function checkEmail(email) {
    return data.some(user => user.email === email);
}

function checkAnExistsEmail(inputValue, alertError, input) {
    //* if email exists
    if (checkEmail(inputValue)) {
        alertError.textContent = "Email is already registered";
        alertError.classList.remove("d-none");
        input.classList.add("invalid");
    }
}