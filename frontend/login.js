const API_URL = "http://127.0.0.1:5000";

document
    .getElementById("login-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        try {

            const response = await fetch(
                `${API_URL}/api/admin/login`,
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

                document.getElementById("message").textContent =
                    "Login successful!";

                // Go to admin dashboard
                window.location.href = "index.html";

            } else {

                document.getElementById("message").textContent =
                    result.error;

            }

        } catch (error) {

            console.error("Login error:", error);

            document.getElementById("message").textContent =
                "Unable to connect to server.";

        }

    });