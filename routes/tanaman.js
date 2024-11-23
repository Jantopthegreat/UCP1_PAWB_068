const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Tampilkan daftar tanaman
router.get("/", (req, res) => {
  db.query("SELECT * FROM Tanaman", (err, results) => {
    if (err) throw err;
    res.render("tanaman/index", { tanaman: results });
  });
});

// Form tambah tanaman
router.get("/tambah", (req, res) => {
  res.render("tanaman/tambah");
});

// Proses tambah tanaman
router.post("/tambah", (req, res) => {
  const { nama_tanaman, jenis_tanaman, musim_tanam, deskripsi } = req.body;
  db.query(
    "INSERT INTO Tanaman (nama_tanaman, jenis_tanaman, musim_tanam, deskripsi) VALUES (?, ?, ?, ?)",
    [nama_tanaman, jenis_tanaman, musim_tanam, deskripsi],
    (err) => {
      if (err) throw err;
      res.redirect("/tanaman");
    }
  );
});

// Form edit tanaman
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Tanaman WHERE id_tanaman = ?", [id], (err, results) => {
    if (err) throw err;
    res.render("tanaman/edit", { tanaman: results[0] });
  });
});

// Proses edit tanaman
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { nama_tanaman, jenis_tanaman, musim_tanam, deskripsi } = req.body;
  db.query(
    "UPDATE Tanaman SET nama_tanaman = ?, jenis_tanaman = ?, musim_tanam = ?, deskripsi = ? WHERE id_tanaman = ?",
    [nama_tanaman, jenis_tanaman, musim_tanam, deskripsi, id],
    (err) => {
      if (err) throw err;
      res.redirect("/tanaman");
    }
  );
});

// Hapus tanaman
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Tanaman WHERE id_tanaman = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/tanaman");
  });
});

module.exports = router;
