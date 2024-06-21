
const { sequelize, DataTypes } = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("reviews",{
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"users",
                key:"id"
            }
        },
        book_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"books",
                key:"id"
            }
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate :{
                isBetween(value){
                    if(value <1 && value >10){
                        throw new Error("Value of rating must be between 1 to 10 .");
                    }
                }
            }
        },
        comment:{
            type: DataTypes.STRING,
        }
    });
    
    return Review;

}