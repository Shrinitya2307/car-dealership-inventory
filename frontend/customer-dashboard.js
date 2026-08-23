// ========================================
// API
// ========================================

const API_URL = "http://127.0.0.1:5000";


// ========================================
// CURRENT CUSTOMER
// ========================================

let currentCustomer = null;
let allCars = [];


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const savedCustomer =
        localStorage.getItem("customer");

    if (!savedCustomer) {

        alert("Please login first.");

        window.location.href =
            "customer-login.html";

        return;
    }

    try {

        currentCustomer =
            JSON.parse(savedCustomer);

    } catch (error) {

        localStorage.removeItem("customer");

        window.location.href =
            "customer-login.html";

        return;
    }


    // Show customer name

    const customerName =
        document.getElementById("customerName");

    if (customerName) {
        customerName.textContent =
            currentCustomer.name;
    }


    // Profile

    document.getElementById(
        "profileName"
    ).textContent =
        currentCustomer.name || "N/A";


    document.getElementById(
        "profileUsername"
    ).textContent =
        currentCustomer.username || "N/A";


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentCustomer.email || "N/A";


    document.getElementById(
        "profilePhone"
    ).textContent =
        currentCustomer.phone || "N/A";


    // Load data

    loadCars();

    loadMyEnquiries();

});


// ========================================
// HIDE ALL SECTIONS
// ========================================

function hideAllSections() {

    document.getElementById(
        "dashboardSection"
    ).style.display = "none";


    document.getElementById(
        "carsSection"
    ).style.display = "none";


    document.getElementById(
        "myEnquiriesSection"
    ).style.display = "none";


    document.getElementById(
        "profileSection"
    ).style.display = "none";

}


// ========================================
// SHOW DASHBOARD
// ========================================

function showDashboard() {

    hideAllSections();

    document.getElementById(
        "dashboardSection"
    ).style.display = "block";

}


// ========================================
// SHOW CARS
// ========================================

function showCars() {

    hideAllSections();

    document.getElementById(
        "carsSection"
    ).style.display = "block";

    loadCars();

}


// ========================================
// SHOW PROFILE
// ========================================

function showProfile() {

    hideAllSections();

    document.getElementById(
        "profileSection"
    ).style.display = "block";

}


// ========================================
// LOAD CARS
// ========================================

async function loadCars() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/cars`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load cars"
            );

        }


        allCars =
            await response.json();


        displayCars(allCars);


        // Count available cars

        const availableCars =
            allCars.filter(
                car =>
                    car.status === "Available"
            );


        document.getElementById(
            "availableCars"
        ).textContent =
            availableCars.length;


    } catch (error) {

        console.error(
            "Car loading error:",
            error
        );


        document.getElementById(
            "carsContainer"
        ).innerHTML = `

            <div class="empty-message">

                <h3>
                    Unable to load cars
                </h3>

                <p>
                    Please make sure the server
                    is running.
                </p>

            </div>

        `;

    }

}


// ========================================
// DISPLAY CARS
// ========================================

function displayCars(cars) {

    const container =
        document.getElementById(
            "carsContainer"
        );


    container.innerHTML = "";


    if (cars.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    No cars found 🚗
                </h3>

                <p>
                    Try searching for another
                    make or model.
                </p>

            </div>

        `;

        return;
    }


    cars.forEach(car => {

        const card =
            document.createElement("div");


        card.className =
            "car-card";


        // Enquiry button

        let enquiryButton = "";


        if (car.status === "Available") {

            enquiryButton = `

                <button
                    class="enquire-btn"
                    onclick="openEnquiry(
                        ${car.id},
                        '${escapeText(
                            car.make + " " + car.model
                        )}'
                    )">

                    📩 Send Enquiry

                </button>

            `;

        } else {

            enquiryButton = `

                <button
                    class="enquire-btn"
                    disabled>

                    ${car.status}

                </button>

            `;

        }


        card.innerHTML = `

            <div class="car-image">

                🚗

            </div>


            <h3>

                ${escapeHTML(car.make)}
                ${escapeHTML(car.model)}

            </h3>


            <div class="car-details">

                <div>
                    📅 <strong>Year:</strong>
                    ${car.year}
                </div>

                <div>
                    🎨 <strong>Color:</strong>
                    ${escapeHTML(car.color)}
                </div>

                <div>
                    🛣️ <strong>Mileage:</strong>
                    ${Number(car.mileage).toLocaleString("en-IN")}
                    km
                </div>

            </div>


            <div class="car-price">

                ₹${Number(car.price)
                    .toLocaleString("en-IN")}

            </div>


            <span class="status">

                ${escapeHTML(car.status)}

            </span>


            ${enquiryButton}

        `;


        container.appendChild(card);

    });

}


// ========================================
// SEARCH CARS
// ========================================

function searchCars() {

    const search =
        document.getElementById(
            "searchCar"
        ).value
        .toLowerCase()
        .trim();


    const filteredCars =
        allCars.filter(car => {

            const make =
                String(car.make)
                    .toLowerCase();


            const model =
                String(car.model)
                    .toLowerCase();


            const year =
                String(car.year)
                    .toLowerCase();


            return (
                make.includes(search) ||
                model.includes(search) ||
                year.includes(search)
            );

        });


    displayCars(filteredCars);

}


// ========================================
// OPEN ENQUIRY
// ========================================

function openEnquiry(carId, carName) {

    document.getElementById(
        "enquiryCarId"
    ).value =
        carId;


    document.getElementById(
        "selectedCar"
    ).textContent =
        `Enquiry for: ${carName}`;


    document.getElementById(
        "enquiryMessage"
    ).value = "";


    document.getElementById(
        "enquiryResult"
    ).textContent = "";


    document.getElementById(
        "enquiryModal"
    ).style.display =
        "block";

}


// ========================================
// CLOSE ENQUIRY
// ========================================

function closeEnquiry() {

    document.getElementById(
        "enquiryModal"
    ).style.display =
        "none";

}


// ========================================
// SUBMIT ENQUIRY
// ========================================

document
    .getElementById("enquiryForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!currentCustomer) {

                alert(
                    "Please login first."
                );

                return;

            }


            const carId =
                document.getElementById(
                    "enquiryCarId"
                ).value;


            const message =
                document.getElementById(
                    "enquiryMessage"
                ).value.trim();


            if (!message) {

                document.getElementById(
                    "enquiryResult"
                ).textContent =
                    "Please enter a message.";

                return;

            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/enquiries`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    car_id:
                                        carId,

                                    name:
                                        currentCustomer.name,

                                    email:
                                        currentCustomer.email,

                                    phone:
                                        currentCustomer.phone,

                                    message:
                                        message

                                })

                        }
                    );


                const result =
                    await response.json();


                if (response.ok) {

                    document.getElementById(
                        "enquiryResult"
                    ).textContent =
                        "✅ Enquiry submitted successfully!";


                    document.getElementById(
                        "enquiryForm"
                    ).reset();


                    await loadMyEnquiries();


                    setTimeout(
                        closeEnquiry,
                        1200
                    );


                } else {

                    document.getElementById(
                        "enquiryResult"
                    ).textContent =
                        result.error ||
                        "Failed to submit enquiry.";

                }


            } catch (error) {

                console.error(
                    "Enquiry error:",
                    error
                );


                document.getElementById(
                    "enquiryResult"
                ).textContent =
                    "Unable to connect to server.";

            }

        }
    );


// ========================================
// LOAD MY ENQUIRIES
// ========================================

async function loadMyEnquiries() {

    if (!currentCustomer) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/enquiries`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load enquiries"
            );

        }


        const enquiries =
            await response.json();


        const myEnquiries =
            enquiries.filter(
                enquiry =>
                    enquiry.email ===
                    currentCustomer.email
            );


        displayMyEnquiries(
            myEnquiries
        );


        document.getElementById(
            "myEnquiryCount"
        ).textContent =
            myEnquiries.length;


    } catch (error) {

        console.error(
            "Enquiry loading error:",
            error
        );

    }

}


// ========================================
// DISPLAY MY ENQUIRIES
// ========================================

function displayMyEnquiries(
    enquiries
) {

    const table =
        document.getElementById(
            "myEnquiriesTable"
        );


    table.innerHTML = "";


    if (enquiries.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="3">

                    You have not submitted
                    any enquiries yet.

                </td>

            </tr>

        `;

        return;

    }


    enquiries.forEach(
        enquiry => {

            const row =
                document.createElement(
                    "tr"
                );


            const carName =
                `${enquiry.make}
                 ${enquiry.model}
                 (${enquiry.year})`;


            const date =
                new Date(
                    enquiry.created_at
                ).toLocaleString(
                    "en-IN"
                );


            row.innerHTML = `

                <td>

                    ${escapeHTML(carName)}

                </td>


                <td>

                    ${escapeHTML(
                        enquiry.message
                    )}

                </td>


                <td>

                    ${date}

                </td>

            `;


            table.appendChild(row);

        }
    );

}


// ========================================
// SHOW MY ENQUIRIES
// ========================================

function showMyEnquiries() {

    hideAllSections();

    document.getElementById(
        "myEnquiriesSection"
    ).style.display =
        "block";


    loadMyEnquiries();

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "customer"
    );


    window.location.href =
        "customer-login.html";

}


// ========================================
// SECURITY HELPERS
// ========================================

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeText(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

}