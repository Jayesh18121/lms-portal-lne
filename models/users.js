const { sequelize, DataTypes, users } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Json } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw new Error("Password should be at least 8 characters long !!");
          }
        },
        isNotPassword(value) {
          if (value.toLowerCase() === "password") {
            throw new Error('Password cannot be "password !!"');
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Admin", "Librarian", "Subscriber"]],
          msg: "Please select role from Admin, Librarian, Subscriber",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\+(?:[0-9]●?){6,14}[0-9]$/,
          msg: "Invalid phone number format.",
        },
      },
    },
    tokens: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
      allowNull: false,
    },
  });

  Users.beforeCreate(async (users, option) => {
    users.username = users.username.trim();
    users.email = users.email.trim();
    users.password = users.password.trim();
    users.password = await bcrypt.hash(users.password, 8);
    users.token = JSON.stringify([]);
  });

  Users.beforeUpdate(async (users, option) => {
    if (users.changed("password")) {
      users.password = users.password.trim();
      users.password = await bcrypt.hash(users.password, 8);
    }
  });

  Users.prototype.generateToken = async () => {
    let user = this;

    const token = jwt.sign(
      {
        id: user.id.toString(),
        username: user.username,
        role: user.role,
        email: user.email,
      },
      "secretKey"
    );

    let tokens = JSON.parse(user.tokens || "[]");
    tokens.push({ token });

    user.tokens = JSON.stringify(tokens);

    await user.save();

    return token;
  };

  Users.findByCredentials = async (username, password, email) => {
    try {
      const user = await Users.findOne({
        where: {
          username,
          email,
        },
      });

      if (!user) {
        throw new Error("there are no user with this username and email!");
      }

      const isMatch = await bcrypt.compare(user.password, password);
      if (!isMatch) {
        throw new Error("Unable to login !!");
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  return Users;
};
