const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./Route/userRoute");
const templeteRoutes = require("./Route/templeteRoute");
const favoriteRoutes = require("./Route/favoriteRoute");

const cors=require('cors')
const app = express();
connectDB();

app.use(cors({
  origin:process.env.FRONTEND_URL|| "http://localhost:5173"
}));

app.use(express.json());




app.use("/api/user", userRoutes);
app.use("/api/templetes", templeteRoutes);
app.use("/api/favorite", favoriteRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running 5000");
});
