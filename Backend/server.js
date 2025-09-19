const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- CORS Configuration ---
// Define the allowed origin. 
// IMPORTANT: Change 'http://localhost:3000' to the actual address of your frontend app.
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
};

// --- Middlewares ---
app.use(cors(corsOptions)); // Use the specific CORS options
app.use(express.json());   // Body parser for JSON format

// API Routes
app.use("/api/auth", authRoutes);

// Simple root route for testing
app.get("/", (req, res) => {
  res.send("Agrichain API is running...");
});

const PORT = process.env.PORT || 5022;

app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

