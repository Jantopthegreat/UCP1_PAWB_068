// Tampilkan daftar pupuk
app.get("/pupuk", (req, res) => {
    db.query("SELECT * FROM pupuk", (err, results) => {
      if (err) throw err;
      res.render("pupuk/index", { pupuk: results });
    });
  });
  
  // Form tambah pupuk
  app.get("/pupuk/tambah", (req, res) => {
    res.render("pupuk/tambah");
  });
  
  // Proses tambah pupuk
  app.post("/pupuk/tambah", (req, res) => {
    const { nama, jenis, komposisi, kegunaan } = req.body;
    db.query(
      "INSERT INTO pupuk (nama, jenis, komposisi, kegunaan) VALUES (?, ?, ?, ?)",
      [nama, jenis, komposisi, kegunaan],
      (err) => {
        if (err) throw err;
        res.redirect("/pupuk");
      }
    );
  });
  
  // Form edit pupuk
  app.get("/pupuk/edit/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM pupuk WHERE id = ?", [id], (err, results) => {
      if (err) throw err;
      res.render("pupuk/edit", { pupuk: results[0] });
    });
  });
  
  // Proses edit pupuk
  app.post("/pupuk/edit/:id", (req, res) => {
    const id = req.params.id;
    const { nama, jenis, komposisi, kegunaan } = req.body;
    db.query(
      "UPDATE pupuk SET nama = ?, jenis = ?, komposisi = ?, kegunaan = ? WHERE id = ?",
      [nama, jenis, komposisi, kegunaan, id],
      (err) => {
        if (err) throw err;
        res.redirect("/pupuk");
      }
    );
  });
  
  // Hapus pupuk
  app.delete("/pupuk/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM pupuk WHERE id = ?", [id], (err) => {
      if (err) throw err;
      res.redirect("/pupuk");
    });
  });
  