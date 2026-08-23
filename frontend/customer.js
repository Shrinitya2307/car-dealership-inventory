const API_URL = "http://127.0.0.1:5000/api/cars";


// Load and filter available cars
async function loadAvailableCars() {

    try {

        const response = await fetch(API_URL);

        const cars = await response.json();


        // Get filter values
        const searchText =
            document.getElementById("search")
                .value
                .toLowerCase();

        const maxPrice =
            document.getElementById("max-price")
                .value;

        const minYear =
            document.getElementById("min-year")
                .value;


        // Filter cars
        const filteredCars = cars.filter(car => {

            // Only available cars
            if (car.status !== "Available") {
                return false;
            }


            // Search make/model
            const matchesSearch =
                car.make.toLowerCase()
                    .includes(searchText)

                ||

                car.model.toLowerCase()
                    .includes(searchText);


            // Maximum price
            const matchesPrice =
                maxPrice === ""
                ||
                Number(car.price) <= Number(maxPrice);


            // Minimum year
            const matchesYear =
                minYear === ""
                ||
                Number(car.year) >= Number(minYear);


            return (
                matchesSearch &&
                matchesPrice &&
                matchesYear
            );

        });


        displayCars(filteredCars);


    } catch (error) {

        console.error(
            "Error loading cars:",
            error
        );

    }

}


// Display cars
function displayCars(cars) {

    const container =
        document.getElementById("cars-container");

    container.innerHTML = "";


    if (cars.length === 0) {

        container.innerHTML =
            "<p>No matching cars found.</p>";

        return;

    }


    cars.forEach(car => {

        const carCard =
            document.createElement("div");


        carCard.innerHTML = `

            <h2>
                ${car.make} ${car.model}
            </h2>

            <p>
                Year: ${car.year}
            </p>

            <p>
                Price: ₹${car.price}
            </p>

            <p>
                Color: ${car.color}
            </p>

            <p>
                Mileage: ${car.mileage} km
            </p>

            <p>
                Status: ${car.status}
            </p>

            <button
                onclick="viewCar(${car.id})">
                View Details
            </button>

        `;


        container.appendChild(carCard);

    });

}


// View individual car
function viewCar(id) {

    window.location.href =
        `car-details.html?id=${id}`;

}


// Clear filters
function clearFilters() {

    document.getElementById("search").value = "";

    document.getElementById("max-price").value = "";

    document.getElementById("min-year").value = "";

    loadAvailableCars();

}


// Load cars when page opens
loadAvailableCars();