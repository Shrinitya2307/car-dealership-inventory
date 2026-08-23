const API_URL = "http://127.0.0.1:5000";

const form = document.getElementById("customer-register-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords

    if (password !== confirmPassword) {

        message.textContent =
            "❌ Passwords do not match.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/customer/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                })
            }
        );


        const result = await response.json();


        if (response.ok) {

            message.textContent =
                "✅ Customer registered successfully!";


            form.reset();


            // Go to customer login

            setTimeout(function() {

                window.location.href =
                    "customer-login.html";

            }, 1500);


        } else {

            message.textContent =
                "❌ " +
                (
                    result.error ||
                    "Registration failed."
                );

        }


    } catch (error) {

        console.error(
            "Customer registration error:",
            error
        );


        message.textContent =
            "❌ Unable to connect to server.";

    }

});