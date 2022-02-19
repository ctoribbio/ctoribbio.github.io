const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const printError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const printSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

form.addEventListener('submit', e => {
    e.preventDefault();

    validateForm();
});

const validateForm = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        printError(username, 'El nombre de usuario es obligatorio');
    } else {
        printSuccess(username);
    }

    if(emailValue === '') {
        printError(email, 'El email es obligatorio');
    } else if (!isValidEmail(emailValue)) {
        printError(email, 'El formato de email no es correcto');
    } else {
        printSuccess(email);
    }

    if(passwordValue === '') {
        printError(password, 'La contraseña es obligatoria');
    } else if (passwordValue.length < 8 ) {
        printError(password, 'La contraseña debe tener al menos 8 caracteres')
    } else {
        printSuccess(password);
    }

    if(password2Value === '') {
        printError(password2, 'Por favor, confirma tu contraseña');
    } else if (password2Value !== passwordValue) {
        printError(password2, "Las contraseñas no coinciden");
    } else {
        printSuccess(password2);
    }
    
};

function isValidEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input.trim()).toLowerCase());
}

function validValue(length,value) {
    var error;
    if(value.trim()=='') {
        error = 1;
    }else if(value.trim().length<length) {
        error = 2;
    }else{
        error = 0;
    }
    return error
}

function isChecked(input) {
   return input.checked;
}