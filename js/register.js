// <!-- ========== Global Part ========== -->
const inputs = document.querySelectorAll("input")
const btn = document.getElementById("btnRegister")
const formInfo = document.querySelector("form")
const mode = document.getElementById("mode");
let isValid = false;
// <!-- ========== Start Part ========== -->
if (localStorage.getItem("theme") != null) {
    const themeData = localStorage.getItem("theme");

    if (themeData === "light") {
        mode.classList.replace("fa-sun", "fa-moon");
    } else {
        mode.classList.replace("fa-moon", "fa-sun");
    }

    document.querySelector("html").setAttribute("data-theme", themeData);
}
// <!-- ========== Events Part ========== -->
formInfo.addEventListener("submit", function (e) { // submit btkhly el user lma yfill el form momkn y click 3la el button 2w enter 
    e.preventDefault();
    if (isValid) {
        setForm();
    }
    else{
        Swal.fire({
            icon: 'error',
            text: 'You have to fill the form first!',
        });
    }
    

})

formInfo.addEventListener("input", function () {
    if (validationName(inputs[0]) && validationName(inputs[1]) && validationEmail() && validationPassword() && validationAge()) {
        isValid = true
    }
    else {
        isValid = false;
    }
})
mode.addEventListener("click", function (e) {
    if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme", "light");
        mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

        localStorage.setItem("theme", "light");
    } else {
        mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});
// <!-- ========== Functions Part ========== -->
function setForm() {
    const user = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        age: inputs[4].value
    }
    registerForm(user)
}


async function registerForm(userData) {
    const api = await fetch('https://movies-api.routemisr.com/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const response = await api.json()
    if (response.message === 'success') {
        location.href = './index.html'
    }
    else {
        document.getElementById('msg').innerHTML = response.errors?.email.message
    }
}

// <!-- ========== Validation Part ========== -->

function validationName(input) {
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/

    if (regexStyle.test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")
        return true
    }
    else {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        return false
    }
}

function validationEmail() {
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if (regexStyle.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid")
        inputs[2].classList.remove("is-invalid")
        return true
    }
    else {
        inputs[2].classList.add("is-invalid")
        inputs[2].classList.remove("is-valid")
        return false
    }
}

function validationPassword() {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (regexStyle.test(inputs[3].value)) {
        inputs[3].classList.add("is-valid")
        inputs[3].classList.remove("is-invalid")
        return true
    }
    else {
        inputs[3].classList.add("is-invalid")
        inputs[3].classList.remove("is-valid")
        return false
    }
}

function validationAge() {
    const regexStyle = /^([1-7][0-9]|80)$/

    if (regexStyle.test(inputs[4].value)) {
        inputs[4].classList.add("is-valid")
        inputs[4].classList.remove("is-invalid")
        return true
    }
    else {
        inputs[4].classList.add("is-invalid")
        inputs[4].classList.remove("is-valid")
        return false
    }
}