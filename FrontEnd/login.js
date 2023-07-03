

let submit = document.querySelector("form input[type=submit]");

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = document.querySelector("input[type='email']").value;
    let password = document.querySelector("input[type='password']").value;
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email,
        password,
        }),
    });
    let data = await response.json();
    console.log(data);
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location = "index.html";
    } else {
        alert("Combinaison email/mot de passe incorrecte");
    }
    }
    );
