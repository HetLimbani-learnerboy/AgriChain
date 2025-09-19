const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AgriChain API Root");
});

// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
