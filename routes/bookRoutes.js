const express = require("express");
const multer = require("multer");
const { addBook, getBooks, deleteBook, updateBook } = require("../controllers/bookController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/get-books", getBooks);
router.post("/add-book", upload.array("images", 2), addBook);
router.delete("/delete-book/:id", deleteBook);
router.put("/update-book/:id", upload.array("images", 2), updateBook);

module.exports = router;
