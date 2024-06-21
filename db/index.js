const {DataTypes, Sequelize} = require('sequelize');

const sequelize = new Sequelize("lms-portal","root","",{
    host:"localhost",
    port: '3308',
    dialect: 'mysql',
    logging: false
})


sequelize.authenticate().then(()=>{
    console.log("connected to database");
}).catch((e)=>{console.log(e);});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;


db.books = require("../models/books")(sequelize,DataTypes);
db.users = require("../models/users")(sequelize, DataTypes);
db.issuedBooks = require("../models/issuedBooks")(sequelize, DataTypes);
db.reviews = require("../models/reviews")(sequelize,DataTypes);

db.issuedBooks.belongsTo(db.users,{foreignKey:"userId"});
db.issuedBooks.belongsTo(db.books,{foreignKey:"bookId"});

db.reviews.belongsTo(db.users, {foreignKey:"userId"});
db.reviews.belongsTo(db.books,{foreignKey:"bookId"});


db.books.sync().then(() => { console.log("resyncing books model") }).catch((err) => { console.log("err while books", err) });
db.users.sync().then(() => { console.log("resyncing users model") }).catch((err) => { console.log("err while users", err) });
db.issuedBooks.sync().then(() => { console.log("resyncing issuedBooks model") }).catch((err) => { console.log("err while issuedBooks", err) });
db.reviews.sync().then(() => { console.log("resyncing reviews model") }).catch((err) => { console.log("err while reviews", err) });


module.exports = db;