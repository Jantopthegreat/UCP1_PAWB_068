require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing body dan mendukung methodOverride
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // Atur layout default
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Untuk menangani DELETE dan PUT
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json()); // Untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Untuk parsing form data

// Koneksi ke database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database");
});

// Routes
const tanamanRoutes = require("./routes/tanaman");
const pupukRoutes = require("./routes/pupuk");

app.use("/tanaman", tanamanRoutes);
app.use("/pupuk", pupukRoutes);

// Route utama
app.get("/", (req, res) => {
  res.render("index", {
    title: "Sistem Informasi Pertanian",
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
