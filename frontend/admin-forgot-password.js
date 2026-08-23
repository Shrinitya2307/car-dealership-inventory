const API_URL = "http://127.0.0.1:5000";


// ========================================
// ADMIN FORGOT PASSWORD
// ========================================

const form =
    document.getElementById(
        "admin-forgot-form"
    );


const message =
    document.getElementById(
        "message"
    );


form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const newPassword =
            document
                .getElementById("newPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        // ========================================
        // CHECK PASSWORD MATCH
        // ========================================

        if (
            newPassword !==
            confirmPassword
        ) {

            message.textContent =
                "❌ Passwords do not match.";

            return;

        }


        // ========================================
        // SEND REQUEST
        // ========================================

        try {

            const response =
                await fetch(
                    `${API_URL}/api/admin/forgot-password`,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                username:
                                    username,

                                newPassword:
                                    newPassword

                            })

                    }
                );


            const result =
                await response.json();


            // ========================================
            // SUCCESS
            // ========================================

            if (response.ok) {

                message.textContent =
                    "✅ Password reset successfully!";


                form.reset();


                setTimeout(function() {

                    window.location.href =
                        "admin-login.html";

                }, 1500);


            }


            // ========================================
            // ERROR
            // ========================================

            else {

                message.textContent =
                    "❌ " +
                    (
                        result.error ||
                        "Password reset failed."
                    );

            }


        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );


            message.textContent =
                "❌ Unable to connect to server.";

        }

    }
);


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (
        input.type ===
        "password"
    ) {

        input.type = "text";

        button.textContent =
            "🙈";

    }


    else {

        input.type =
            "password";

        button.textContent =
            "👁️";

    }

}