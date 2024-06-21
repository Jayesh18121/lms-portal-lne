const { issuedBooks, books } = require("../db");

const rentBook = async(req,res) => {
   try {
    const issueBook = await issuedBooks.create(req.body);
    const book = await books.findByPk(req.body[bookId]);
    book[amount] = book[amount] - 1;
    await book.save();
    return res.status(200).json({issuedBook:issueBook});
   } catch (error) {
    return res.status(400).json(error);
   }
}

const returnBookById = async(req,res) => {
    try {
        const {id} = req.params;
        const issuedBook = await issuedBooks.findByPk(id);
        const bookId = issuedBook[bookId];
        await issuedBook.destroy();
        const book = await books.findByPk(bookId);
        book[amount] = book[amount] + 1;
        return res.status(200).json({message:"Book returned successfully"});
    } catch (error) {
        return res.status(400).json(error);
    }
}


module.exports = {rentBook, returnBookById}