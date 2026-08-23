const API_URL = "http://127.0.0.1:5000";


// ========================================
// ADMIN LOGIN
// ========================================

document
    .getElementById("admin-login-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const message =
            document.getElementById("message");


        try {

            const response =
                await fetch(
                    `${API_URL}/api/admin/login`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                username: username,

                                password: password

                            })

                    }
                );


            const result =
                await response.json();


            console.log(
                "Admin login response:",
                result
            );


            if (response.ok) {

                message.textContent =
                    "✅ Login successful!";


                localStorage.setItem(
                    "admin",
                    JSON.stringify(
                        result.admin || result
                    )
                );


                setTimeout(function() {

                    window.location.href =
                        "admin-dashboard.html";

                }, 700);


            } else {

                message.textContent =
                    "❌ " +
                    (
                        result.error ||
                        "Invalid username or password."
                    );

            }

        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );


            message.textContent =
                "❌ Unable to connect to server.";

        }

    });


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

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