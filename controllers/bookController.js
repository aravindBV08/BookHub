const Book = require("../models/Book");

// ADD BOOK
exports.addBook = async (req, res) => {
  try {
    const { name, author, subtitle, description, mrp, salePrice, offerPrice } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const newBook = new Book({
      name,
      author,
      subtitle,
      description,
      mrp: Number(mrp),
      salePrice: Number(salePrice),
      offerPrice: Number(offerPrice),
      images
    });

    await newBook.save();
    res.json({ success: true, message: "Book Added Successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add book" });
  }
};

// GET BOOKS
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE BOOK
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Book Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed!" });
  }
};

// UPDATE BOOK - FIXED VERSION
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if book exists
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const { name, author, subtitle, description, mrp, salePrice, offerPrice } = req.body;
    
    const updatedData = {
      name,
      author,
      subtitle,
      description,
      mrp: Number(mrp),
      salePrice: Number(salePrice),
      offerPrice: Number(offerPrice)
    };

    // Handle file uploads if new images are provided
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(file => file.filename);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id, 
      updatedData, 
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: "Book Updated Successfully!", 
      book: updatedBook 
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Update failed: " + err.message });
  }
};