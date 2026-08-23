const API_URL = "http://127.0.0.1:5000";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    loadCars();

    // Add Car Form
    const addCarForm =
        document.getElementById("addCarForm");

    if (addCarForm) {
        addCarForm.addEventListener(
            "submit",
            handleAddCar
        );
    }


    // Edit Car Form
    const editCarForm =
        document.getElementById("editCarForm");

    if (editCarForm) {
        editCarForm.addEventListener(
            "submit",
            handleEditCar
        );
    }


    // Change Password Form
    const changePasswordForm =
        document.getElementById(
            "changePasswordForm"
        );

    if (changePasswordForm) {
        changePasswordForm.addEventListener(
            "submit",
            handleChangePassword
        );
    }

});


// ========================================
// FORMAT PRICE IN INDIAN RUPEES
// ========================================

function formatPrice(price) {

    const number =
        Number(price);

    if (isNaN(number)) {
        return "₹0";
    }

    return "₹" +
        number.toLocaleString("en-IN");
}


// ========================================
// FORMAT MILEAGE
// ========================================

function formatMileage(mileage) {

    const number =
        Number(mileage);

    if (isNaN(number)) {
        return "0 km";
    }

    return number.toLocaleString("en-IN") +
        " km";
}


// ========================================
// LOAD ALL CARS
// ========================================

async function loadCars() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/cars`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch cars"
            );

        }


        const cars =
            await response.json();


        displayCars(cars);

        updateStatistics(cars);


    } catch (error) {

        console.error(
            "Error loading cars:",
            error
        );


        const table =
            document.getElementById(
                "carsTable"
            );


        if (table) {

            table.innerHTML = `
                <tr>
                    <td colspan="9">
                        Unable to load cars.
                    </td>
                </tr>
            `;

        }

    }

}


// ========================================
// DISPLAY CARS
// ========================================

function displayCars(cars) {

    const table =
        document.getElementById(
            "carsTable"
        );


    if (!table) {

        console.error(
            "carsTable not found in HTML"
        );

        return;

    }


    table.innerHTML = "";


    if (!cars || cars.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="9">
                    No cars found.
                </td>
            </tr>
        `;

        return;

    }


    cars.forEach(car => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${car.id}
            </td>

            <td>
                ${car.make}
            </td>

            <td>
                ${car.model}
            </td>

            <td>
                ${car.year}
            </td>

            <td>
                ${formatPrice(car.price)}
            </td>

            <td>
                ${car.color}
            </td>

            <td>
                ${formatMileage(car.mileage)}
            </td>

            <td>
                <span class="status">
                    ${car.status}
                </span>
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editCar(${car.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteCar(${car.id})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics(cars) {

    const totalCars =
        document.getElementById(
            "totalCars"
        );


    if (totalCars) {

        totalCars.textContent =
            cars.length;

    }


    const availableCars =
        cars.filter(
            car =>
                car.status &&
                car.status.toLowerCase() ===
                "available"
        ).length;


    const availableElement =
        document.getElementById(
            "availableCars"
        );


    if (availableElement) {

        availableElement.textContent =
            availableCars;

    }

}


// ========================================
// SEARCH CARS
// ========================================

function searchCars() {

    const searchInput =
        document.getElementById(
            "searchCar"
        );


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const rows =
        document.querySelectorAll(
            "#carsTable tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent
                .toLowerCase();


        row.style.display =
            text.includes(search)
                ? ""
                : "none";

    });

}


// ========================================
// OPEN ADD CAR MODAL
// ========================================

function addCar() {

    const modal =
        document.getElementById(
            "addCarModal"
        );


    if (modal) {

        modal.style.display =
            "block";

    }

}


// ========================================
// CLOSE ADD CAR MODAL
// ========================================

function closeAddCar() {

    const modal =
        document.getElementById(
            "addCarModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    const message =
        document.getElementById(
            "addCarMessage"
        );


    if (message) {

        message.textContent =
            "";

    }

}


// ========================================
// ADD CAR
// ========================================

async function handleAddCar(event) {

    event.preventDefault();


    const make =
        document.getElementById(
            "make"
        ).value.trim();


    const model =
        document.getElementById(
            "model"
        ).value.trim();


    const year =
        Number(
            document.getElementById(
                "year"
            ).value
        );


    const price =
        Number(
            document.getElementById(
                "price"
            ).value
        );


    const color =
        document.getElementById(
            "color"
        ).value.trim();


    const mileage =
        Number(
            document.getElementById(
                "mileage"
            ).value
        );


    const status =
        document.getElementById(
            "status"
        ).value;


    const message =
        document.getElementById(
            "addCarMessage"
        );


    const car = {

        make: make,

        model: model,

        year: year,

        price: price,

        color: color,

        mileage: mileage,

        status: status

    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/cars`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(car)

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to add car"
            );

        }


        if (message) {

            message.textContent =
                "Car added successfully!";

        }


        document
            .getElementById(
                "addCarForm"
            )
            .reset();


        setTimeout(() => {

            closeAddCar();

            loadCars();

        }, 700);


    } catch (error) {

        console.error(
            "Add car error:",
            error
        );


        if (message) {

            message.textContent =
                error.message;

        }

    }

}


// ========================================
// DELETE CAR
// ========================================

async function deleteCar(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this car?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/cars/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to delete car"
            );

        }


        alert(
            "Car deleted successfully!"
        );


        loadCars();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            error.message ||
            "Unable to connect to server."
        );

    }

}


// ========================================
// EDIT CAR
// ========================================

async function editCar(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/cars/${id}`
            );


        const car =
            await response.json();


        if (!response.ok) {

            throw new Error(
                "Unable to get car details."
            );

        }


        document.getElementById(
            "editId"
        ).value =
            car.id;


        document.getElementById(
            "editMake"
        ).value =
            car.make;


        document.getElementById(
            "editModel"
        ).value =
            car.model;


        document.getElementById(
            "editYear"
        ).value =
            car.year;


        document.getElementById(
            "editPrice"
        ).value =
            car.price;


        document.getElementById(
            "editColor"
        ).value =
            car.color;


        document.getElementById(
            "editMileage"
        ).value =
            car.mileage;


        document.getElementById(
            "editStatus"
        ).value =
            car.status;


        document.getElementById(
            "editCarModal"
        ).style.display =
            "block";


    } catch (error) {

        console.error(
            "Edit error:",
            error
        );


        alert(
            error.message ||
            "Unable to connect to server."
        );

    }

}


// ========================================
// CLOSE EDIT CAR
// ========================================

function closeEditCar() {

    const modal =
        document.getElementById(
            "editCarModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    const message =
        document.getElementById(
            "editCarMessage"
        );


    if (message) {

        message.textContent =
            "";

    }

}


// ========================================
// UPDATE CAR
// ========================================

async function handleEditCar(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editId"
        ).value;


    const make =
        document.getElementById(
            "editMake"
        ).value.trim();


    const model =
        document.getElementById(
            "editModel"
        ).value.trim();


    const year =
        Number(
            document.getElementById(
                "editYear"
            ).value
        );


    const price =
        Number(
            document.getElementById(
                "editPrice"
            ).value
        );


    const color =
        document.getElementById(
            "editColor"
        ).value.trim();


    const mileage =
        Number(
            document.getElementById(
                "editMileage"
            ).value
        );


    const status =
        document.getElementById(
            "editStatus"
        ).value;


    const message =
        document.getElementById(
            "editCarMessage"
        );


    const updatedCar = {

        make: make,

        model: model,

        year: year,

        price: price,

        color: color,

        mileage: mileage,

        status: status

    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/cars/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedCar
                        )

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to update car"
            );

        }


        if (message) {

            message.textContent =
                "Car updated successfully!";

        }


        setTimeout(() => {

            closeEditCar();

            loadCars();

        }, 700);


    } catch (error) {

        console.error(
            "Update error:",
            error
        );


        if (message) {

            message.textContent =
                error.message;

        }

    }

}


// ========================================
// SHOW CARS
// ========================================

function showCars() {

    hideAllSections();


    const carsSection =
        document.querySelector(
            ".cars-section"
        );


    if (carsSection) {

        carsSection.style.display =
            "block";

    }


    const stats =
        document.querySelector(
            ".stats"
        );


    if (stats) {

        stats.style.display =
            "block";

    }


    loadCars();

}


// ========================================
// LOAD CUSTOMERS
// ========================================

async function loadCustomers() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/customers`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch customers"
            );

        }


        const customers =
            await response.json();


        displayCustomers(
            customers
        );


        const totalCustomers =
            document.getElementById(
                "totalCustomers"
            );


        if (totalCustomers) {

            totalCustomers.textContent =
                customers.length;

        }


    } catch (error) {

        console.error(
            "Customer loading error:",
            error
        );

    }

}


// ========================================
// DISPLAY CUSTOMERS
// ========================================

function displayCustomers(customers) {

    const table =
        document.getElementById(
            "customersTable"
        );


    if (!table) {

        console.error(
            "customersTable not found"
        );

        return;

    }


    table.innerHTML = "";


    if (!customers ||
        customers.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No customers found.
                </td>
            </tr>
        `;

        return;

    }


    customers.forEach(customer => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${customer.id}
            </td>

            <td>
                ${customer.name}
            </td>

            <td>
                ${customer.username}
            </td>

            <td>
                ${customer.email}
            </td>

            <td>
                ${customer.phone || "N/A"}
            </td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// SHOW CUSTOMERS
// ========================================

function showCustomers() {

    hideAllSections();


    const customersSection =
        document.querySelector(
            ".customers-section"
        );


    if (customersSection) {

        customersSection.style.display =
            "block";

    }


    const stats =
        document.querySelector(
            ".stats"
        );


    if (stats) {

        stats.style.display =
            "block";

    }


    loadCustomers();

}


// ========================================
// LOAD ENQUIRIES
// ========================================

async function loadEnquiries() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/enquiries`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch enquiries"
            );

        }


        const enquiries =
            await response.json();


        displayEnquiries(
            enquiries
        );


        const totalEnquiries =
            document.getElementById(
                "totalEnquiries"
            );


        if (totalEnquiries) {

            totalEnquiries.textContent =
                enquiries.length;

        }


    } catch (error) {

        console.error(
            "Enquiry loading error:",
            error
        );


        const table =
            document.getElementById(
                "enquiriesTable"
            );


        if (table) {

            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        Unable to load enquiries.
                    </td>
                </tr>
            `;

        }

    }

}


// ========================================
// DISPLAY ENQUIRIES
// ========================================

function displayEnquiries(enquiries) {

    const table =
        document.getElementById(
            "enquiriesTable"
        );


    if (!table) {

        console.error(
            "enquiriesTable not found"
        );

        return;

    }


    table.innerHTML = "";


    if (!enquiries ||
        enquiries.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No enquiries found.
                </td>
            </tr>
        `;

        return;

    }


    enquiries.forEach(enquiry => {

        const row =
            document.createElement("tr");


        const carName =
            `${enquiry.make || ""}
             ${enquiry.model || ""}
             (${enquiry.year || ""})`;


        const date =
            enquiry.created_at
                ? new Date(
                    enquiry.created_at
                  ).toLocaleString(
                    "en-IN"
                  )
                : "N/A";


        row.innerHTML = `

            <td>
                ${enquiry.id}
            </td>

            <td>
                ${enquiry.name}
            </td>

            <td>
                ${enquiry.email}
            </td>

            <td>
                ${enquiry.phone || "N/A"}
            </td>

            <td>
                ${carName}
            </td>

            <td>
                ${enquiry.message || "No message"}
            </td>

            <td>
                ${date}
            </td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// SHOW ENQUIRIES
// ========================================

function showEnquiries() {

    hideAllSections();


    const enquiriesSection =
        document.querySelector(
            ".enquiries-section"
        );


    if (enquiriesSection) {

        enquiriesSection.style.display =
            "block";

    }


    const stats =
        document.querySelector(
            ".stats"
        );


    if (stats) {

        stats.style.display =
            "block";

    }


    loadEnquiries();

}


// ========================================
// HIDE ALL DASHBOARD SECTIONS
// ========================================

function hideAllSections() {

    const carsSection =
        document.querySelector(
            ".cars-section"
        );


    const customersSection =
        document.querySelector(
            ".customers-section"
        );


    const enquiriesSection =
        document.querySelector(
            ".enquiries-section"
        );


    const stats =
        document.querySelector(
            ".stats"
        );


    const settingsSection =
        document.getElementById(
            "settingsSection"
        );


    const dashboardSection =
        document.getElementById(
            "dashboardSection"
        );


    if (carsSection) {

        carsSection.style.display =
            "none";

    }


    if (customersSection) {

        customersSection.style.display =
            "none";

    }


    if (enquiriesSection) {

        enquiriesSection.style.display =
            "none";

    }


    if (stats) {

        stats.style.display =
            "none";

    }


    if (settingsSection) {

        settingsSection.style.display =
            "none";

    }


    if (dashboardSection) {

        dashboardSection.style.display =
            "none";

    }

}


// ========================================
// ADMIN SETTINGS
// ========================================

function showSettings() {

    hideAllSections();


    const settingsSection =
        document.getElementById(
            "settingsSection"
        );


    if (settingsSection) {

        settingsSection.style.display =
            "block";

    }


    const adminData =
        localStorage.getItem(
            "admin"
        );


    if (adminData) {

        try {

            const admin =
                JSON.parse(
                    adminData
                );


            const username =
                document.getElementById(
                    "settingsUsername"
                );


            if (username) {

                username.textContent =
                    admin.username ||
                    "Admin";

            }

        } catch (error) {

            console.error(
                "Admin data error:",
                error
            );

        }

    }

}


// ========================================
// CHANGE ADMIN PASSWORD
// ========================================

async function handleChangePassword(event) {

    event.preventDefault();


    const currentPassword =
        document.getElementById(
            "currentPassword"
        ).value;


    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    const message =
        document.getElementById(
            "passwordMessage"
        );


    // Check passwords match

    if (
        newPassword !==
        confirmPassword
    ) {

        message.textContent =
            "New passwords do not match.";

        return;

    }


    // Check empty passwords

    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {

        message.textContent =
            "Please fill all password fields.";

        return;

    }


    // Get logged-in admin

    const adminData =
        localStorage.getItem(
            "admin"
        );


    if (!adminData) {

        message.textContent =
            "Admin session not found. Please login again.";

        return;

    }


    let admin;


    try {

        admin =
            JSON.parse(
                adminData
            );

    } catch (error) {

        message.textContent =
            "Invalid admin session.";

        return;

    }


    if (!admin.username) {

        message.textContent =
            "Admin username not found.";

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/admin/change-password`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            username:
                                admin.username,

                            currentPassword:
                                currentPassword,

                            newPassword:
                                newPassword

                        })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to change password."
            );

        }


        message.textContent =
            "Password changed successfully!";


        document
            .getElementById(
                "changePasswordForm"
            )
            .reset();


    } catch (error) {

        console.error(
            "Password change error:",
            error
        );


        message.textContent =
            error.message ||
            "Unable to connect to server.";

    }

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "admin"
    );


    window.location.href =
        "admin-login.html";

}