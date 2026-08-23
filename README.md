# 🚗 Car Dealership Inventory Management System

A full-stack web application for managing car dealership inventory, customers, and customer enquiries.

The system provides separate interfaces for **Administrators** and **Customers**. Administrators can manage the vehicle inventory, customers, enquiries, and account settings, while customers can browse available cars, view car details, register/login, and submit enquiries.


# 📖 Project Overview

The **Car Dealership Inventory Management System** is a web-based application designed to digitize and simplify car dealership operations.

The application uses a **Node.js + Express backend**, **PostgreSQL database**, and **HTML/CSS/JavaScript frontend**.

The system allows administrators to maintain the dealership's vehicle inventory and monitor customer activity.

Customers can register, log in, browse cars, view detailed information, and send enquiries about vehicles.

---

# ✨ Features

## 👨‍💼 Administrator Features

* Admin registration
* Admin login
* Admin logout
* Admin forgot-password functionality
* Admin password change
* Dashboard statistics
* View total cars
* View available cars
* View total customers
* View total enquiries
* Add new cars
* View all cars
* Edit car information
* Delete cars
* Search cars
* View registered customers
* View customer enquiries
* View enquiry date and time
* View car associated with an enquiry

## 👤 Customer Features

* Customer registration
* Customer login
* Customer logout
* Customer forgot-password functionality
* Browse available cars
* View car information
* View car details
* View price in Indian Rupees
* View mileage
* View vehicle status
* Submit enquiries
* View enquiry information

## 🚗 Car Inventory Features

Each vehicle contains:

* Car ID
* Make
* Model
* Year
* Price
* Color
* Mileage
* Availability status
* Creation date

The application formats prices using the Indian numbering system.

Example:

```text
25000     → ₹25,000
2500000   → ₹25,00,000
```

Mileage is also formatted using the Indian numbering system.

---

# 👥 User Roles

The application contains two primary user roles.

## Customer

Customers can:

* Register an account
* Login
* Browse cars
* View vehicle details
* Search/browse inventory
* Submit enquiries
* Manage their account

## Administrator

Administrators have management access to:

* Cars
* Customers
* Enquiries
* Dashboard statistics
* Account settings

---

# 👨‍💼 Admin Roles

The administrator is responsible for managing dealership operations.

### Inventory Management

Administrators can:

* Add vehicles
* Edit vehicles
* Delete vehicles
* View vehicle inventory
* Search vehicles
* Update vehicle availability

### Customer Management

Administrators can:

* View registered customers
* View customer information
* Monitor customer registrations

### Enquiry Management

Administrators can:

* View customer enquiries
* View customer contact details
* View the vehicle associated with an enquiry
* View enquiry messages
* View enquiry date/time

### Account Management

Administrators can:

* Change their password
* Use forgot-password functionality
* Logout securely

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* DOM manipulation
* Responsive UI design

## Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

## Database

* PostgreSQL
* pgAdmin 4
* PostgreSQL `pg` Node.js driver

## Development Tools

* Visual Studio Code
* PowerShell
* Git
* GitHub
* Google Chrome
* pgAdmin 4

---

# 📦 Project Dependencies

The backend uses the following major dependencies:

| Dependency  | Purpose                         |
| ----------- | ------------------------------- |
| `express`   | Backend web server and REST API |
| `pg`        | PostgreSQL database connection  |
| `cors`      | Cross-Origin Resource Sharing   |
| `dotenv`    | Environment variable management |
| `bcrypt`    | Password hashing/security       |
| `nodemon`   | Development server auto-restart |
| `jest`      | Testing                         |
| `supertest` | API endpoint testing            |

The exact installed versions are available in:

```text
backend/package.json
```

and

```text
backend/package-lock.json
```

Install dependencies using:

```bash
npm install
```

---

# 💻 Prerequisites

Before running the project, install the following:

### Required Software

* Node.js
* npm
* PostgreSQL
* pgAdmin 4
* Git
* Web browser

Recommended:

* Visual Studio Code
* PowerShell

Check Node.js:

```powershell
node --version
```

Check npm:

```powershell
npm --version
```

Check Git:

```powershell
git --version
```

---

# 📁 Project Structure

```text
car-dealership-inventory/
│
├── backend/
│   │
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── frontend/
│   │
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   │
│   ├── admin-dashboard.html
│   ├── admin-dashboard.js
│   ├── admin-login.html
│   ├── admin-login.js
│   ├── admin-register.html
│   ├── admin-register.js
│   ├── admin-forgot-password.html
│   ├── admin-forgot-password.js
│   │
│   ├── customer.html
│   ├── customer.js
│   ├── customer-dashboard.html
│   ├── customer-dashboard.js
│   ├── customer-login.html
│   ├── customer-login.js
│   ├── customer-register.html
│   ├── customer-register.js
│   ├── customer-forgot-password.html
│   ├── customer-forgot-password.js
│   │
│   ├── car-details.html
│   ├── car-details.js
│   └── ...
│
├── assests/
│   └── project screenshots and images
│
├── .gitignore
├── README.md
└── ...
```

> Note: The folder is currently named `assests`. If desired, it can later be renamed to the conventional spelling `assets`.

---

# 🔐 Environment Variables

The backend uses environment variables to protect database configuration.

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=car_dealership
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
```

### Explanation

| Variable      | Description              |
| ------------- | ------------------------ |
| `PORT`        | Port used by the backend |
| `DB_USER`     | PostgreSQL username      |
| `DB_HOST`     | PostgreSQL server host   |
| `DB_NAME`     | Database name            |
| `DB_PASSWORD` | PostgreSQL password      |
| `DB_PORT`     | PostgreSQL port          |

### ⚠️ Security

The `.env` file should **not be uploaded to GitHub**.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

Never publish real database passwords or authentication credentials.

---

# 🗄️ Database Setup

The project uses PostgreSQL.

Create a database:

```text
car_dealership
```

The main database contains tables for managing:

* Cars
* Customers
* Administrators
* Enquiries

The `cars` table contains fields such as:

```text
id
make
model
year
price
color
mileage
status
created_at
```

Example vehicle:

```text
Make: Toyota
Model: Camry
Year: 2024
Price: ₹25,000
Color: Black
Mileage: 15,000 km
Status: Available
```

---

# ⚙️ Installation and Setup

## Step 1 — Clone the Repository

```bash
git clone https://github.com/Shrinitya2307/car-dealership-inventory.git
```

Move into the project:

```bash
cd car-dealership-inventory
```

---

## Step 2 — Install Backend Dependencies

```bash
cd backend
```

Then:

```bash
npm install
```

---

## Step 3 — Configure PostgreSQL

Create the database:

```text
car_dealership
```

Configure the `.env` file with your PostgreSQL credentials.

---

## Step 4 — Start the Backend

From the `backend` directory:

```bash
node server.js
```

The backend runs on:

```text
http://127.0.0.1:5000
```

---

## Step 5 — Open the Frontend

Open the required HTML file from the `frontend` folder using a browser or a local development server.

For example:

```text
frontend/index.html
```

The frontend communicates with the backend through:

```text
http://127.0.0.1:5000
```

---

# 🔌 API Documentation

Base URL:

```text
http://127.0.0.1:5000
```

---

## Cars API

### Get All Cars

```http
GET /api/cars
```

Returns all cars.

Example:

```json
[
  {
    "id": 1,
    "make": "Toyota",
    "model": "Camry",
    "year": 2024,
    "price": "25000.00",
    "color": "Black",
    "mileage": 15000,
    "status": "Available"
  }
]
```

---

### Get Car by ID

```http
GET /api/cars/:id
```

Example:

```text
GET /api/cars/1
```

---

### Add Car

```http
POST /api/cars
```

Example request:

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2024,
  "price": 25000,
  "color": "Black",
  "mileage": 15000,
  "status": "Available"
}
```

---

### Update Car

```http
PUT /api/cars/:id
```

Example:

```text
PUT /api/cars/1
```

---

### Delete Car

```http
DELETE /api/cars/:id
```

Example:

```text
DELETE /api/cars/1
```

---

# 👤 Customer API

### Get Customers

```http
GET /api/customers
```

Returns registered customer information.

---

# 📩 Enquiry API

### Get Enquiries

```http
GET /api/enquiries
```

Returns customer enquiries.

Enquiry information includes:

* ID
* Customer name
* Email
* Phone
* Car
* Message
* Date/time

---

# 🔑 Authentication APIs

## Admin Login

```http
POST /api/admin/login
```

## Admin Registration

```http
POST /api/admin/register
```

## Admin Forgot Password

```http
POST /api/admin/forgot-password
```

## Admin Change Password

```http
PUT /api/admin/change-password
```

## Customer Login

```http
POST /api/customer/login
```

## Customer Registration

```http
POST /api/customer/register
```

## Customer Forgot Password

```http
POST /api/customer/forgot-password
```

---

# 🧪 Testing and TDD

Testing was used to verify that the backend APIs and application functionality work correctly.

## API Testing

The REST API can be tested using:

* Browser
* PowerShell
* Postman
* Supertest/Jest where configured

Example:

```powershell
Invoke-RestMethod http://127.0.0.1:5000/api/cars
```

The response should return the available cars.

### CRUD Testing

The following operations were tested:

```text
GET     → Retrieve cars
POST    → Add car
PUT     → Update car
DELETE  → Delete car
```

### Manual Functional Testing

The following application functions were tested:

* Admin login
* Admin registration
* Customer registration
* Customer login
* Adding cars
* Editing cars
* Deleting cars
* Searching cars
* Viewing customers
* Viewing enquiries
* Password change
* Forgot password
* Logout

## TDD

Test-Driven Development can be incorporated using:

```text
Jest
Supertest
```

A typical TDD workflow is:

```text
1. Write test
2. Run test
3. Implement functionality
4. Run test again
5. Fix failures
6. Refactor
```

---

# 📸 Application Screenshots

Screenshots are stored in:

```text
assests/
```

Recommended screenshots to include:

## Home Page

![Home Page](assests/home-page.png)

## Admin Login

![Admin Login](assests/admin-login.png)

## Admin Dashboard

![Admin Dashboard](assests/admin-dashboard.png)

## Car Inventory

![Car Inventory](assests/car-inventory.png)

## Add Car

![Add Car](assests/add-car.png)

## Edit Car

![Edit Car](assests/edit-car.png)

## Customer Registration

![Customer Registration](assests/customer-register.png)

## Customer Dashboard

![Customer Dashboard](assests/customer-dashboard.png)

## Car Details

![Car Details](assests/car-details.png)

## Customer Enquiry

![Customer Enquiry](assests/customer-enquiry.png)

## Admin Enquiries

![Admin Enquiries](assests/admin-enquiries.png)

> Replace the example image filenames above with the **actual filenames in your `assests` folder**.

---

# 🖥️ Application Screenshots

The application provides separate interfaces for administrators and customers.

### Admin Interface

The administrator dashboard provides:

* Inventory management
* Customer management
* Enquiry management
* Statistics
* Account settings

### Customer Interface

The customer interface provides:

* Vehicle browsing
* Vehicle details
* Customer registration
* Customer login
* Enquiry submission

---

# 🌿 Git and Version Control

Git was used for source-code version control and GitHub was used for remote repository hosting.

## Initialize Repository

```bash
git init
```

## Check Repository Status

```bash
git status
```

## Add Files

```bash
git add .
```

## Commit Changes

```bash
git commit -m "Complete car dealership inventory project"
```

## Add Remote Repository

```bash
git remote add origin https://github.com/Shrinitya2307/car-dealership-inventory.git
```

## Rename Branch

```bash
git branch -M main
```

## Push to GitHub

```bash
git push -u origin main
```

The project repository is available on GitHub:

https://github.com/Shrinitya2307/car-dealership-inventory

---

# 🤖 AI Usage

AI tools were used as a **development assistance tool**, not as a replacement for understanding or testing the project.

AI assistance was used for:

* Understanding programming concepts
* Debugging JavaScript errors
* Debugging API communication
* Understanding PostgreSQL integration
* Improving code structure
* Generating initial code suggestions
* Explaining Git and GitHub commands
* Troubleshooting authentication issues
* Improving README documentation

The developer reviewed, modified, tested, and integrated the generated suggestions into the project.

### Level of AI Usage

The project used AI at a **moderate development-assistance level**.

AI was primarily used for:

```text
Concept Explanation
        ↓
Code Assistance
        ↓
Debugging
        ↓
Documentation
        ↓
Developer Testing
        ↓
Final Integration
```

The final application was tested and adjusted manually to match the project's requirements.

---

# 📋 Assessment Requirements

The project demonstrates the following full-stack development requirements:

| Requirement               | Implementation                   |
| ------------------------- | -------------------------------- |
| Frontend                  | HTML, CSS, JavaScript            |
| Backend                   | Node.js + Express                |
| Database                  | PostgreSQL                       |
| CRUD                      | Cars inventory                   |
| Authentication            | Admin and Customer login         |
| Authorization/roles       | Admin and Customer functionality |
| REST API                  | Express API endpoints            |
| Database connectivity     | PostgreSQL using `pg`            |
| Environment configuration | `.env`                           |
| Validation                | Form/API validation              |
| Error handling            | API and frontend error handling  |
| Testing                   | API and functional testing       |
| Version Control           | Git + GitHub                     |
| Documentation             | README                           |
| Screenshots               | Project screenshots              |
| AI disclosure             | AI usage documented              |

---

# 🔒 Security Considerations

The application follows basic security practices such as:

* Environment variables for database configuration
* Password hashing where implemented
* Avoiding hard-coded database passwords
* `.env` excluded from version control
* Input validation
* HTTP status-code handling
* Separate administrator and customer functionality

For a production deployment, additional security measures should be implemented, including:

* HTTPS
* JWT/session-based authentication
* Stronger authorization middleware
* Rate limiting
* Input sanitization
* CSRF protection where applicable
* Secure password reset tokens
* Production database security

---

# 🚀 Future Enhancements

Possible future improvements include:

* JWT-based authentication
* Advanced role-based authorization
* Vehicle image upload
* Advanced car filtering
* Sorting by price/year/mileage
* Pagination
* Car comparison
* Online booking
* Payment integration
* Email notifications
* Admin analytics dashboard
* Cloud deployment
* Automated CI/CD pipeline
* Automated unit and integration testing
* Docker support

---

# 🎯 Conclusion

The **Car Dealership Inventory Management System** demonstrates a complete full-stack web application using **HTML, CSS, JavaScript, Node.js, Express.js, and PostgreSQL**.

The system provides separate customer and administrator workflows and supports vehicle inventory management, customer management, enquiries, authentication, CRUD operations, REST APIs, database integration, testing, and GitHub-based version control.

The project demonstrates practical knowledge of:

```text
Frontend Development
        +
Backend Development
        +
REST APIs
        +
Database Management
        +
Authentication
        +
CRUD Operations
        +
Testing
        +
Git/GitHub
        +
Documentation
```

---

# 👩‍💻 Author

**Shrinitya**

GitHub:

https://github.com/Shrinitya2307

Project Repository:

https://github.com/Shrinitya2307/car-dealership-inventory
