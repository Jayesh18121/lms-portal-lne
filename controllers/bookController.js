const { Op, where } = require("sequelize");
const { books } = require("../db");

const addBooks = async (req, res) => {
  try {
    const book = await books.create(req.body);
    return res
      .status(200)
      .json({ message: "Product added Successfully", book });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findByPk(id);
    if (!book) {
      return res.status(400).json({ message: "Book with given id not found" });
    }
    const options = Object.keys(req.body);
    options.forEach((option) => {
      book[option] = req.body[option];
    });
    await book.save();
    return res.status(200).json({ message: "Book updated Successfully", book });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findByPk(id);

    if (!book) {
      return res.status(400).json({ message: "Book with given id not found" });
    }
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const {
      name,
      authorName,
      minCost,
      maxCost,
      genre,
      minAmount,
      maxAmount,
      sortBy,
      sortOrder,
    } = req.query;
    const filteredConditions = {};

    if (name) {
      filteredConditions.bookName = { [Op.like]: "%{name}%" };
    }

    if (genre) {
      filteredConditions.genre = genre;
    }

    if(authorName){
        filteredConditions.authorName = {[Op.like]:"%{authorName}%"};
    }

    if (minCost || maxCost) {
      filteredConditions.cost = {};
      if (minCost) {
        filteredConditions.cost[Op.gte] = parseFloat(minCost);
      }
      if (maxCost) {
        filteredConditions.cost[Op.lte] = parseFloat(maxCost);
      }
    }

    if (minAmount || maxAmount) {
      filteredConditions.amount = {};
      if (minAmount) {
        filteredConditions.amount[Op.gte] = parseFloat(minAmount);
      }
      if (maxAmount) {
        filteredConditions.amount[Op.lte] = parseFloat(maxAmount);
      }
    }

    const validSortFeilds = [
      "bookName",
      "authorName",
      "isbnNumber",
      "cost",
      "amount",
      "genre",
    ];

    const order = [];

    if (sortBy && validSortFeilds.includes(sortBy)) {
      order.push([sortBy, sortOrder.toUpperCase()]);
    } else {
      order.push(["createdAt", "ASC"]);
    }

    const bookList = await books.findAll({
      where: filteredConditions,
      order: order,
    });

    return res.status(200).json({ Books: bookList });
  } catch (error) {
    return res.status(400).json(error);
  }
};

 const addBookAmountById = async(req,res) =>{
    try {
        const {id} = req.params;
        const book = await books.findByPk(id);
        book[amount] += req.body[amount];
        await book.save();
        return res.status(200).json({ message: "Book Added Succesfully", book });
    } catch (error) {
        return res.status(400).json(error);
    }
 }

 const deleteBookAmountById = async(req,res) =>{
    const {id} = req.params;
    const book = await books.findByPk(id);
    const originalAmount = book[amount];
    if(originalAmount == 0 || originalAmount-req.body[amount] <=0 ){
        return res.status(400).json({message:"Book Cannot be deleted"});
    }
    else{
        book[amount] -= req.body[amount];
    }

    book.save();
    return res.status(200).json({ message: "Book Deleted Succesfully", book });
 }



module.exports = { addBooks, editBookById, getBookById, getAllBooks, addBookAmountById, deleteBookAmountById };
