function checkUserAndGetName(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return user ? user.name : null;
}

function loginSuccess(userName) {
    let token = "user_" + Date.now();
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    window.location.href = `../index.html?userName=${userName}`;
}