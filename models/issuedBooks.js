const { sequelize, DataTypes } = require("../db");

module.exports = (sequelize,DataTypes) => {
    const IssuedBook = sequelize.define("issuedBooks",{
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"id"
            }
        },
        bookId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"books",
                key:"id"
            }
        },
        issue_date:{
            type : DataTypes.DATEONLY,
            allowNull : false,
        },
        return_date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });
    return IssuedBook;
}