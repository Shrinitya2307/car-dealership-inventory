const API_URL = "http://127.0.0.1:5000";

const form = document.getElementById("customer-forgot-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        message.textContent =
            "❌ Passwords do not match.";
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/api/customer/forgot-password`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    newPassword: newPassword
                })
            }
        );

        const result = await response.json();

        if (response.ok) {

            message.textContent =
                "✅ Password reset successfully!";

            form.reset();

            setTimeout(function () {
                window.location.href =
                    "customer-login.html";
            }, 1500);

        } else {

            message.textContent =
                "❌ " +
                (result.error ||
                 "Failed to reset password.");
        }

    } catch (error) {

        console.error(
            "Customer forgot password error:",
            error
        );

        message.textContent =
            "❌ Unable to connect to server.";
    }
});

function togglePassword(inputId, button) {

    const password =
        document.getElementById(inputId);

    if (password.type === "password") {

        password.type = "text";
        button.textContent = "🙈";

    } else {

        password.type = "password";
        button.textContent = "👁️";
    }
}next