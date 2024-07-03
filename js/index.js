// <!-- ========== Global Part ========== -->
const inputs = document.querySelectorAll("input")
const btn = document.getElementById("btnLogin")
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
            text: 'you have to fill the form first!',
        });
    }
  
})

formInfo.addEventListener("input", function () {
    if (validationEmail() && validationPassword()) {
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
        email: inputs[0].value,
        password: inputs[1].value
    }
    registerForm(user)
}


async function registerForm(userData) {
    const api = await fetch('https://movies-api.routemisr.com/signin', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const response = await api.json()
    if(response.message === 'success'){
        localStorage.setItem("uToken" , response.token)
        location.href = './home.html'
    }
    else{
        document.getElementById('msg').innerHTML = response.message
    }
}

// <!-- ========== Validation Part ========== -->

function validationEmail() {
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if (regexStyle.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid")
        inputs[0].classList.remove("is-invalid")
        return true
    }
    else {
        inputs[0].classList.add("is-invalid")
        inputs[0].classList.remove("is-valid")
        return false
    }
}

function validationPassword() {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (regexStyle.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid")
        inputs[1].classList.remove("is-invalid")
        return true
    }
    else {
        inputs[1].classList.add("is-invalid")
        inputs[1].classList.remove("is-valid")
        return false
    }
}

