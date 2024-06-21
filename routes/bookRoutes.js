const express = require("express");
const { addBooks, editBookById, getBookById, getAllBooks, addBookAmountById, deleteBookAmountById} = require("../controllers/bookController");
const { auth } = require("../middleware/auth");
const bookRouter = express.Router();


// route for adding a new book
bookRouter.post("/",auth,addBooks);
bookRouter.patch("/:id",auth,editBookById);
bookRouter.get("/:id",auth,getBookById);
bookRouter.get("/",auth,getAllBooks);
bookRouter.patch("/add/:id",auth,addBookAmountById);
bookRouter.patch("/delete/:id",auth,deleteBookAmountById)



module.exports = {bookRouter};