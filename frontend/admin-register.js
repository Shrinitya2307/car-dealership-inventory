const API_URL = "http://127.0.0.1:5000";

const form = document.getElementById("admin-register-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "❌ Passwords do not match.";
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/api/admin/register`,
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

        const result = await response.json();

        if (response.ok) {

            message.textContent =
                "✅ Admin registered successfully!";

            form.reset();

            setTimeout(function() {
                window.location.href = "admin-login.html";
            }, 1500);

        } else {

            message.textContent =
                "❌ " + (result.error || "Registration failed.");

        }

    } catch (error) {

        console.error("Registration error:", error);

        message.textContent =
            "❌ Unable to connect to server.";

    }

});