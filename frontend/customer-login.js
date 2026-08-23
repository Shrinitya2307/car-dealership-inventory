const API_URL = "http://127.0.0.1:5000";

document
    .getElementById("customer-login-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("message");

        try {

            const response = await fetch(
                `${API_URL}/api/customer/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            const result =
                await response.json();

            if (response.ok) {

                // Save logged-in customer
                localStorage.setItem(
                    "customer",
                    JSON.stringify(result.customer)
                );

                message.textContent =
                    "Login successful!";

                message.style.color =
                    "green";

                // Open customer dashboard
                setTimeout(function() {

                    window.location.href =
                        "customer-dashboard.html";

                }, 700);

            } else {

                message.textContent =
                    result.error ||
                    "Invalid username or password.";

                message.style.color =
                    "red";

            }

        } catch (error) {

            console.error(
                "Customer login error:",
                error
            );

            message.textContent =
                "Unable to connect to server.";

            message.style.color =
                "red";
        }

    });
    function togglePassword() {

    const password =
        document.getElementById("password");

    const eye =
        document.querySelector(".eye-btn");


    if (password.type === "password") {

        password.type = "text";

        eye.textContent = "🙈";

    } else {

        password.type = "password";

        eye.textContent = "👁️";

    }

}