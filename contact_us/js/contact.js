let starsContainer = document.getElementById('starsContainer'),
    form = document.getElementById('form'),
    textarea = form.querySelector('textarea'),
    timeEl = document.getElementById('time'),
    count = 10;

textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
    }
});

//* show stars
for (let i = 0; i < 400; i++) {
    let star = document.createElement('div');
    star.className = 'star';

    let size = Math.random() * 2.5 + 0.5;

    star.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;  
        --duration:     ${2 + Math.random() * 4}s;
        --delay: -${Math.random() * 4}s;  
    `;
    starsContainer.appendChild(star);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});

form.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        submitForm();
    }
});

function submitForm() {
    //* validation
    let inputs = form.querySelectorAll('.input'),
        bool = false;
    
    inputs.forEach(input => {
        if (input.value == '') {
            input.style.borderColor = 'rgba(220, 50, 50, 0.5)';
            setTimeout(() => input.style.borderColor = '', 2000);
            bool = true;
        }
    });
    if (bool)
        return;

    //* show successful message
    let row = form.querySelector('.row'),
        btn = form.querySelector('.btn-submit'),
        btnHome = form.querySelector('.btn-home'),
        successMsg = document.getElementById('successMsg');
    btn.classList.add('d-none');
    btnHome.classList.add('d-none');
    row.classList.add('d-none');
    successMsg.classList.remove('d-none');

    form.reset();

    //* back to home in 10 second
    timeEl.textContent = count;
    let timer = setInterval(() => {
        count--;
        timeEl.textContent = count;

        if (count <= 0) {
            clearInterval(timer);
            window.location.href = '../index.html';
        }
    }, 1000);
}

function backToHome() {
    window.location.href = '../index.html';
}