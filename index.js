const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute");
const connectDb = require("./config/connectDb");

//dotenv conig
dotenv.config();
connectDb();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

//server Api test
app.get("/", async (req, res) => {
  res.send("server running");
});

//port
const PORT = process.env.PORT || 8080;
//listen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
