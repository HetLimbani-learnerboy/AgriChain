const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const signupRoute = require("./routes/signupRoutes");
const signinRoute = require("./routes/signinRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);

connectDB().then(() => {
  app.listen(process.env.PORT || 3021, () =>
    console.log(`✅ Server running on port ${process.env.PORT || 3021}`)
  );
});

app.get("/", (req, res) => {
  res.send("AgriChain API Root");
});
