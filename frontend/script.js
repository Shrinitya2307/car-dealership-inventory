const API_URL = "http://127.0.0.1:5000/api/cars";


// =========================
// GET ALL CARS
// =========================

async function loadCars() {

    try {

        const response = await fetch(API_URL);

        const cars = await response.json();

        const container = document.getElementById("cars-container");

        container.innerHTML = "";

        cars.forEach(car => {

            const carCard = document.createElement("div");

            carCard.innerHTML = `
                <h2>${car.make} ${car.model}</h2>

                <p>Year: ${car.year}</p>
                <p>Price: ₹${car.price}</p>
                <p>Color: ${car.color}</p>
                <p>Mileage: ${car.mileage} km</p>
                <p>Status: ${car.status}</p>

                <button onclick="editCar(${car.id})">
                    ✏️ Edit
                </button>

                <button onclick="deleteCar(${car.id})">
                    🗑️ Delete
                </button>
            `;

            container.appendChild(carCard);

        });

    } catch (error) {

        console.error("Error loading cars:", error);

    }

}


// =========================
// ADD CAR
// =========================

document
    .getElementById("car-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const car = {

            make: document.getElementById("make").value,

            model: document.getElementById("model").value,

            year: Number(
                document.getElementById("year").value
            ),

            price: Number(
                document.getElementById("price").value
            ),

            color: document.getElementById("color").value,

            mileage: Number(
                document.getElementById("mileage").value
            ),

            status: document.getElementById("status").value

        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(car)

            });


            if (!response.ok) {

                throw new Error("Failed to add car");

            }


            alert("Car added successfully!");

            document
                .getElementById("car-form")
                .reset();

            loadCars();

        } catch (error) {

            console.error("Error adding car:", error);

            alert("Failed to add car");

        }

    });


// =========================
// DELETE CAR
// =========================

async function deleteCar(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error("Failed to delete car");

        }


        alert("Car deleted successfully!");

        loadCars();

    } catch (error) {

        console.error("Error deleting car:", error);

        alert("Failed to delete car");

    }

}


// =========================
// EDIT CAR
// =========================

async function editCar(id) {

    const make = prompt("Enter car make:");

    if (make === null) return;


    const model = prompt("Enter car model:");

    if (model === null) return;


    const year = prompt("Enter year:");

    if (year === null) return;


    const price = prompt("Enter price:");

    if (price === null) return;


    const color = prompt("Enter color:");

    if (color === null) return;


    const mileage = prompt("Enter mileage:");

    if (mileage === null) return;


    const status = prompt(
        "Enter status (Available/Sold):"
    );

    if (status === null) return;


    const updatedCar = {

        make: make,

        model: model,

        year: Number(year),

        price: Number(price),

        color: color,

        mileage: Number(mileage),

        status: status

    };


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedCar)

            }
        );


        if (!response.ok) {

            throw new Error("Failed to update car");

        }


        alert("Car updated successfully!");

        loadCars();

    } catch (error) {

        console.error("Error updating car:", error);

        alert("Failed to update car");

    }

}


// Load cars when page opens
loadCars();
// =========================
// LOAD CUSTOMER ENQUIRIES
// =========================

async function loadEnquiries() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/enquiries"
        );

        if (!response.ok) {

            throw new Error(
                "Failed to load enquiries"
            );

        }

        const enquiries =
            await response.json();

        const container =
            document.getElementById(
                "enquiries-container"
            );

        container.innerHTML = "";


        if (enquiries.length === 0) {

            container.innerHTML =
                "<p>No customer enquiries yet.</p>";

            return;
        }


        enquiries.forEach(enquiry => {

            const enquiryCard =
                document.createElement("div");

            enquiryCard.innerHTML = `

                <hr>

                <h3>
                    👤 ${enquiry.name}
                </h3>

                <p>
                    <strong>Email:</strong>
                    ${enquiry.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${enquiry.phone || "Not provided"}
                </p>

                <p>
                    <strong>Car:</strong>
                    ${enquiry.make}
                    ${enquiry.model}
                    (${enquiry.year})
                </p>

                <p>
                    <strong>Message:</strong>
                    ${enquiry.message || "No message"}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${enquiry.created_at}
                </p>

            `;

            container.appendChild(
                enquiryCard
            );

        });

    } catch (error) {

        console.error(
            "Error loading enquiries:",
            error
        );

    }

}