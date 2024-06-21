const jwt = require("jsonwebtoken");
const { Op, UnknownConstraintError } = require("sequelize");
const { users } = require("../db");

const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization")?.replace(" Bearer", "");

    if (!token) {
      return res.status(400).json({ message: "Please Authenticate first." });
    }

    const decoded = jwt.verify(token, "secretKey");

    const curUser = await users.findOne({
      where: {
        id: decoded.id,
        tokens: {
          [Op.like]: `%${token}%`,
        },
      },
    });

    if (!curUser) {
      return res.status(400).json({ message: "Please authenticate first." });
    }

    req.token = token;
    req.curUser = curUser;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {auth};
