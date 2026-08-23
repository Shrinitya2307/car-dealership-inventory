const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

console.log("LOADED THIS SERVER.JS FILE");


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// TEST ROUTE
// ========================================

app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKS");
});


// ========================================
// ADMIN LOGIN
// ========================================

app.post("/api/admin/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM admins
             WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        const admin = result.rows[0];

        if (admin.password !== password) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        res.json({
            message: "Login successful",
            username: admin.username
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            error: "Login failed"
        });
    }
});


// ========================================
// ADMIN REGISTRATION
// ========================================

app.post("/api/admin/register", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        const existingAdmin = await pool.query(
            `SELECT *
             FROM admins
             WHERE username = $1`,
            [username]
        );

        if (existingAdmin.rows.length > 0) {
            return res.status(409).json({
                error: "Username already exists"
            });
        }

        const result = await pool.query(
            `INSERT INTO admins
            (username, password)
            VALUES ($1, $2)
            RETURNING id, username`,
            [username, password]
        );

        res.status(201).json({
            message: "Admin registered successfully",
            admin: result.rows[0]
        });

    } catch (error) {

        console.error(
            "Admin registration error:",
            error
        );

        res.status(500).json({
            error: "Admin registration failed"
        });
    }
});


// ========================================
// ADMIN FORGOT PASSWORD
// ========================================

app.put("/api/admin/forgot-password", async (req, res) => {

    try {

        const {
            username,
            newPassword
        } = req.body;

        if (!username || !newPassword) {
            return res.status(400).json({
                error:
                    "Username and new password are required"
            });
        }

        const adminResult = await pool.query(
            `SELECT id
             FROM admins
             WHERE username = $1`,
            [username]
        );

        if (adminResult.rows.length === 0) {
            return res.status(404).json({
                error: "Admin username not found"
            });
        }

        await pool.query(
            `UPDATE admins
             SET password = $1
             WHERE username = $2`,
            [newPassword, username]
        );

        res.json({
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error(
            "Admin forgot password error:",
            error
        );

        res.status(500).json({
            error: "Failed to reset password"
        });
    }
});


// ========================================
// CHANGE ADMIN PASSWORD
// ========================================

app.put("/api/admin/change-password", async (req, res) => {

    try {

        const {
            username,
            currentPassword,
            newPassword
        } = req.body;

        if (!username || !currentPassword || !newPassword) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM admins
             WHERE username = $1
             AND password = $2`,
            [username, currentPassword]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Current password is incorrect"
            });
        }

        await pool.query(
            `UPDATE admins
             SET password = $1
             WHERE username = $2`,
            [newPassword, username]
        );

        res.json({
            message: "Password changed successfully"
        });

    } catch (error) {

        console.error(
            "Change password error:",
            error
        );

        res.status(500).json({
            error: "Failed to change password"
        });
    }
});


// ========================================
// CUSTOMER REGISTRATION
// ========================================

app.post("/api/customer/register", async (req, res) => {

    try {

        const {
            name,
            username,
            email,
            phone,
            password
        } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                error:
                    "Name, username, email and password are required"
            });
        }

        const existingCustomer = await pool.query(
            `SELECT *
             FROM customers
             WHERE username = $1
             OR email = $2`,
            [username, email]
        );

        if (existingCustomer.rows.length > 0) {
            return res.status(409).json({
                error:
                    "Username or email already exists"
            });
        }

        const result = await pool.query(
            `INSERT INTO customers
            (
                name,
                username,
                email,
                phone,
                password
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING
                id,
                name,
                username,
                email,
                phone`,
            [
                name,
                username,
                email,
                phone,
                password
            ]
        );

        res.status(201).json({
            message:
                "Customer registered successfully",
            customer:
                result.rows[0]
        });

    } catch (error) {

        console.error(
            "Customer registration error:",
            error
        );

        res.status(500).json({
            error:
                "Customer registration failed"
        });
    }
});


// ========================================
// CUSTOMER LOGIN
// ========================================

app.post("/api/customer/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error:
                    "Username and password are required"
            });
        }

        const result = await pool.query(
            `SELECT
                id,
                name,
                username,
                email,
                phone
             FROM customers
             WHERE username = $1
             AND password = $2`,
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error:
                    "Invalid username or password"
            });
        }

        res.json({
            message:
                "Customer login successful",
            customer:
                result.rows[0]
        });

    } catch (error) {

        console.error(
            "Customer login error:",
            error
        );

        res.status(500).json({
            error:
                "Customer login failed"
        });
    }
});


// ========================================
// CUSTOMER FORGOT PASSWORD
// ========================================

app.put("/api/customer/forgot-password", async (req, res) => {

    try {

        const {
            username,
            newPassword
        } = req.body;

        if (!username || !newPassword) {
            return res.status(400).json({
                error:
                    "Username and new password are required"
            });
        }

        // Check whether customer exists

        const customerResult = await pool.query(
            `SELECT id
             FROM customers
             WHERE username = $1`,
            [username]
        );

        if (customerResult.rows.length === 0) {
            return res.status(404).json({
                error:
                    "Customer username not found"
            });
        }

        // Update customer password

        await pool.query(
            `UPDATE customers
             SET password = $1
             WHERE username = $2`,
            [newPassword, username]
        );

        res.json({
            message:
                "Password reset successfully"
        });

    } catch (error) {

        console.error(
            "Customer forgot password error:",
            error
        );

        res.status(500).json({
            error:
                "Failed to reset customer password"
        });
    }
});


// ========================================
// GET ALL CUSTOMERS
// ========================================

app.get("/api/customers", async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                id,
                name,
                username,
                email,
                phone
             FROM customers
             ORDER BY id ASC`
        );

        res.json(result.rows);

    } catch (error) {

        console.error(
            "Error fetching customers:",
            error
        );

        res.status(500).json({
            error:
                "Failed to fetch customers"
        });
    }
});


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {

    res.json({
        message:
            "Car Dealership Inventory Backend is running!"
    });

});


// ========================================
// GET ALL CARS
// ========================================

app.get("/api/cars", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM cars ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(
            "Error fetching cars:",
            error
        );

        res.status(500).json({
            error:
                "Failed to fetch cars"
        });
    }
});


// ========================================
// GET ONE CAR
// ========================================

app.get("/api/cars/:id", async (req, res) => {

    try {

        const {
            id
        } = req.params;

        const result = await pool.query(
            "SELECT * FROM cars WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error:
                    "Car not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(
            "Error fetching car:",
            error
        );

        res.status(500).json({
            error:
                "Failed to fetch car"
        });
    }
});


// ========================================
// ADD NEW CAR
// ========================================

app.post("/api/cars", async (req, res) => {

    try {

        const {
            make,
            model,
            year,
            price,
            color,
            mileage,
            status
        } = req.body;

        const result = await pool.query(
            `INSERT INTO cars
            (
                make,
                model,
                year,
                price,
                color,
                mileage,
                status
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                make,
                model,
                year,
                price,
                color,
                mileage,
                status || "Available"
            ]
        );

        res.status(201).json(
            result.rows[0]
        );

    } catch (error) {

        console.error(
            "Error adding car:",
            error
        );

        res.status(500).json({
            error:
                "Failed to add car"
        });
    }
});


// ========================================
// UPDATE CAR
// ========================================

app.put("/api/cars/:id", async (req, res) => {

    try {

        const {
            id
        } = req.params;

        const {
            make,
            model,
            year,
            price,
            color,
            mileage,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE cars
             SET
                make = $1,
                model = $2,
                year = $3,
                price = $4,
                color = $5,
                mileage = $6,
                status = $7
             WHERE id = $8
             RETURNING *`,
            [
                make,
                model,
                year,
                price,
                color,
                mileage,
                status,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error:
                    "Car not found"
            });
        }

        res.json(
            result.rows[0]
        );

    } catch (error) {

        console.error(
            "Error updating car:",
            error
        );

        res.status(500).json({
            error:
                "Failed to update car"
        });
    }
});


// ========================================
// DELETE CAR
// ========================================

app.delete("/api/cars/:id", async (req, res) => {

    try {

        const {
            id
        } = req.params;

        const result = await pool.query(
            "DELETE FROM cars WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error:
                    "Car not found"
            });
        }

        res.json({
            message:
                "Car deleted successfully",
            car:
                result.rows[0]
        });

    } catch (error) {

        console.error(
            "Error deleting car:",
            error
        );

        res.status(500).json({
            error:
                "Failed to delete car"
        });
    }
});


// ========================================
// SUBMIT CUSTOMER ENQUIRY
// ========================================

app.post("/api/enquiries", async (req, res) => {

    try {

        const {
            car_id,
            name,
            email,
            phone,
            message
        } = req.body;

        const result = await pool.query(
            `INSERT INTO enquiries
            (
                car_id,
                name,
                email,
                phone,
                message
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                car_id,
                name,
                email,
                phone,
                message
            ]
        );

        res.status(201).json(
            result.rows[0]
        );

    } catch (error) {

        console.error(
            "Error submitting enquiry:",
            error
        );

        res.status(500).json({
            error:
                "Failed to submit enquiry"
        });
    }
});


// ========================================
// GET ALL CUSTOMER ENQUIRIES
// ========================================

app.get("/api/enquiries", async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT
                enquiries.id,
                enquiries.name,
                enquiries.email,
                enquiries.phone,
                enquiries.message,
                enquiries.created_at,
                cars.make,
                cars.model,
                cars.year

            FROM enquiries

            JOIN cars
                ON enquiries.car_id = cars.id

            ORDER BY enquiries.id DESC

        `);

        res.json(
            result.rows
        );

    } catch (error) {

        console.error(
            "Error fetching enquiries:",
            error
        );

        res.status(500).json({
            error:
                "Failed to fetch enquiries"
        });
    }
});


// ========================================
// START SERVER
// ========================================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);