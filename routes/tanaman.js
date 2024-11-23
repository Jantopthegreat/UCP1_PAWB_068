const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const methodOverride = require("method-override");

// Middleware untuk mendukung metode PUT dan DELETE via HTML forms
router.use(methodOverride("_method"));

// Koneksi ke database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 1. Tampilkan daftar tanaman
router.get("/", (req, res) => {
  db.query("SELECT * FROM Tanaman", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengambil data tanaman");
    }
    res.render("tanaman/index", { tanaman: results });
  });
});

// 2. Form tambah tanaman
router.get("/tambah", (req, res) => {
  res.render("tanaman/tambah");
});

// 3. Proses tambah tanaman (POST)
router.post("/tambah", (req, res) => {
  const { nama_tanaman, jenis_tanaman, musim_tanam, deskripsi } = req.body;
  db.query(
    "INSERT INTO Tanaman (nama_tanaman, jenis_tanaman, musim_tanam, deskripsi) VALUES (?, ?, ?, ?)",
    [nama_tanaman, jenis_tanaman, musim_tanam, deskripsi],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal menambahkan data tanaman");
      }
      res.redirect("/tanaman");
    }
  );
});

// 4. Form edit tanaman
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Tanaman WHERE id_tanaman = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengambil data untuk diedit");
    }
    res.render("tanaman/edit", { tanaman: results[0] });
  });
});

// 5. Proses edit tanaman (PUT)
router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { nama_tanaman, jenis_tanaman, musim_tanam, deskripsi } = req.body;
  db.query(
    "UPDATE Tanaman SET nama_tanaman = ?, jenis_tanaman = ?, musim_tanam = ?, deskripsi = ? WHERE id_tanaman = ?",
    [nama_tanaman, jenis_tanaman, musim_tanam, deskripsi, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal memperbarui data tanaman");
      }
      res.status(200).send({ message: "Data berhasil diperbarui" });
    }
  );
});

// Hapus tanaman berdasarkan ID
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Tanaman WHERE id_tanaman = ?", [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal menghapus data.");
    } else {
      res.status(200).send("Data berhasil dihapus.");
    }
  });
});


module.exports = router;