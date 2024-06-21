const express = require("express");
const { rentBook, returnBookById } = require("../controllers/issuedBooksController");
const { auth } = require("../middleware/auth");

const issuedRouter = express.Router();

issuedRouter.post("/rent",auth, rentBook);
issuedRouter.delete("/return/:id",auth, returnBookById);

module.exports = {issuedRouter};