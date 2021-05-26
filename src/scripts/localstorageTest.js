const button = document.querySelector('.register');
const login = document.querySelector('.login');

button.addEventListener('click', click => {
    localStorage.setItem('nome', 'pedro');
});

login.addEventListener('click', click => {
    alert(localStorage.getItem('nome'));
});
