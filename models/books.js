const { sequelize, DataTypes } = require("../db");

module.exports = (sequelize,DataTypes) => {
    const Book = sequelize.define("books",{
        bookName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate(value){
                if(value.length<=1){
                    throw new Error("The name of the book can't be a single letter.")
                }
            }
        },
        isbnNumber:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true,
            validate(value){
                if(value<=0){
                    throw new Error("Value of ISBN Number can't be negative");
                }
            }
        },
        cost:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate(value){
                if(value<=0){
                    throw new Error("Price of a Book can't be negative");
                }
            }
        },
        authorName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate(value){
                if(value.length<=1){
                    throw new Error("The name of the Author can't be a single letter.")
                }
            }
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate(value){
                if(value<0){
                    throw new Error("Number of books can't be negative.")
                }
            }
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false,
            validate(value){
                if(value.length()<0){
                    throw new Error("Genre of the movie can't be a single word");
                }
            }
        }
    });

    return Book;
}