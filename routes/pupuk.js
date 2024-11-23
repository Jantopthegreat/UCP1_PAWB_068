const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Pastikan Anda menggunakan file koneksi database dengan benar

// Tampilkan daftar pupuk
router.get("/", (req, res) => {
  db.query("SELECT * FROM Pupuk", (err, results) => {
    if (err) throw err;
    res.render("pupuk/index", { pupuk: results });
  });
});

// Form tambah pupuk
router.get("/tambah", (req, res) => {
  res.render("pupuk/tambah");
});

// Proses tambah pupuk
router.post("/tambah", (req, res) => {
  const { nama_pupuk, jenis_pupuk, komposisi, kegunaan } = req.body;
  db.query(
    "INSERT INTO Pupuk (nama_pupuk, jenis_pupuk, komposisi, kegunaan) VALUES (?, ?, ?, ?)",
    [nama_pupuk, jenis_pupuk, komposisi, kegunaan],
    (err) => {
      if (err) throw err;
      res.redirect("/pupuk");
    }
  );
});

// Form edit pupuk
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Pupuk WHERE id_pupuk = ?", [id], (err, results) => {
    if (err) throw err;
    res.render("pupuk/edit", { pupuk: results[0] });
  });
});

// Proses edit pupuk
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { nama_pupuk, jenis_pupuk, komposisi, kegunaan } = req.body;
  db.query(
    "UPDATE Pupuk SET nama_pupuk = ?, jenis_pupuk = ?, komposisi = ?, kegunaan = ? WHERE id_pupuk = ?",
    [nama_pupuk, jenis_pupuk, komposisi, kegunaan, id],
    (err) => {
      if (err) throw err;
      res.redirect("/pupuk");
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Pupuk WHERE id_pupuk = ?", [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal menghapus data.");
    } else {
      res.status(200).send("Data berhasil dihapus.");
    }
  });
})

module.exports = router;
