const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, description } = req.body;

        const contact = new Contact({
            name,
            email,
            phone,
            description
        })
        await contact.save();

        return res.status(201).json({
            message: "contact saved",
            contact: {
                name: contact.name,
                email: contact.email,
                description: contact.description
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Server error", err: err.message });
    }
});

module.exports = router;
