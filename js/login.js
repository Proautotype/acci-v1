const loginForm = document.getElementById("login-form");
const userInputID = document.getElementById("user-input-id");
const userInputPword = document.getElementById("user-input-password");

function onInit() {
    loginForm.addEventListener('submit', login, true)
}

async function login(event) {
    event.preventDefault();
    try {
        const {status} =  await fetch(
            "https://acci-church-v1.herokuapp.com/user/login", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contact: userInputID.value,
                password: userInputPword.value
            })
        })
        if(status === 201){
            window.location.href = 'Dashboard.html'
        }else{
            alert('Username or password cannot be authenticated')
        }
    } catch (error) {
        console.log(error)
    }
}

onInit();