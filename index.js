const express = require("express");
const cors = require("cors");
const { bookRouter } = require("./routes/bookRoutes");
const { issuedRouter } = require("./routes/issuedBooksRoutes");
const { userRouter } = require("./routes/userRoutes");

require("./db/index");

const app = express();


app.use(express.json());
app.use(cors());
app.use("/books",bookRouter);
app.use("/issue",issuedRouter)
app.use("/user",userRouter);
app.listen(5002,()=>{
    console.log("server is live on port 5002");
})