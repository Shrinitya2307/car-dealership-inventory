const API_URL = "http://127.0.0.1:5000/api/cars";
const ENQUIRY_URL = "http://127.0.0.1:5000/api/enquiries";


// Get car ID from URL
const urlParams = new URLSearchParams(
    window.location.search
);

const carId = urlParams.get("id");


// Load car details
async function loadCarDetails() {

    try {

        const response = await fetch(
            `${API_URL}/${carId}`
        );

        if (!response.ok) {
            throw new Error("Car not found");
        }

        const car = await response.json();

        const container =
            document.getElementById("car-details");

        container.innerHTML = `

            <h2>${car.make} ${car.model}</h2>

            <p>
                <strong>Year:</strong>
                ${car.year}
            </p>

            <p>
                <strong>Price:</strong>
                ₹${car.price}
            </p>

            <p>
                <strong>Color:</strong>
                ${car.color}
            </p>

            <p>
                <strong>Mileage:</strong>
                ${car.mileage} km
            </p>

            <p>
                <strong>Status:</strong>
                ${car.status}
            </p>

            <p>
                <strong>Car ID:</strong>
                ${car.id}
            </p>

        `;

    } catch (error) {

        console.error(
            "Error loading car:",
            error
        );

        document.getElementById("car-details")
            .innerHTML =
            "<p>Unable to load car details.</p>";
    }
}


// Show enquiry form
function showEnquiryForm() {

    const container =
        document.getElementById(
            "enquiry-form-container"
        );

    container.innerHTML = `

        <h2>📩 Contact Dealer</h2>

        <form id="enquiry-form">

            <input
                type="text"
                id="name"
                placeholder="Your Name"
                required
            >

            <br><br>

            <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
            >

            <br><br>

            <input
                type="text"
                id="phone"
                placeholder="Your Phone"
            >

            <br><br>

            <textarea
                id="message"
                placeholder="Your Message"
                rows="5"
                cols="30"
            ></textarea>

            <br><br>

            <button type="submit">
                Submit Enquiry
            </button>

        </form>
    `;


    document
        .getElementById("enquiry-form")
        .addEventListener(
            "submit",
            submitEnquiry
        );
}


// Submit enquiry
async function submitEnquiry(event) {

    event.preventDefault();

    const enquiry = {

        car_id: Number(carId),

        name:
            document.getElementById("name").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        message:
            document.getElementById("message").value

    };


    try {

        const response = await fetch(
            ENQUIRY_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(enquiry)
            }
        );


        if (!response.ok) {
            throw new Error(
                "Failed to submit enquiry"
            );
        }


        alert(
            "Your enquiry has been submitted successfully!"
        );


        document
            .getElementById("enquiry-form")
            .reset();


    } catch (error) {

        console.error(
            "Error submitting enquiry:",
            error
        );

        alert(
            "Failed to submit enquiry."
        );
    }
}


// Go back
function goBack() {

    window.location.href =
        "customer.html";
}


// Load details
loadCarDetails();