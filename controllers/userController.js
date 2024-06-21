const { users } = require("../db");

const handleSignUp = async(req,res) => {
    try {
        const newUser = await users.create(req.body);
        return res.status(200).json({ "message": "User registered successfully", newUser });
    } catch (error) {
        return res.status(400).json(error);
    }
}

const handleLogin = async(req,res) => {
    try {
        const currUser = await users.findByCredentials(req.body.username, req.body.password, req.body.email);

        if(!currUser){
            return res.status(200).json({ message: "User not found" })
        }

        const token = await currUser.findByCredentials();
        return  res.status(200).send({ "message": "Login successful", token });

    } catch (error) {
        return res.status(400).json(error);
    }
}

const handleLogout = async(req,res) => {
    const curruser = req.curUser;
    const currentTokens = JSON.parse(curruser.tokens);

    const isAvailable = currentTokens.some((ele)=>ele.tokens === req.tokens);

    if(!isAvailable){
        
        return res.status(400).send({ message: "you are already logged out" });
    }

    const filteredTokens = currentTokens.filter((token)=>{
        token.tokens !== req.body.token;
    })

    curruser.tokens = JSON.stringify(filteredTokens);
    await curruser.save();
    return res.status(200).json("Logout successful");

}
module.exports = {handleSignUp, handleLogin, handleLogout};