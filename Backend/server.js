const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const signupRoute = require("./routes/signupRoute");
const signinRoute = require("./routes/signinRoute");
const contactRoute = require("./routes/contactRoute");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/contact", contactRoute);

connectDB().then(() => {
  app.listen(process.env.PORT || 3021, () =>
    console.log(`✅ Server running on port ${process.env.PORT || 3021}`)
  );
});

app.get("/", (req, res) => {
  res.send("AgriChain API Root");
});
