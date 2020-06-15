require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const actToken = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(actToken, process.env.JSON_WEB_TOKEN_SECRET);
        // console.log(decoded);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": actToken,
        });

        if (!user) {
            throw new Error();
        }

        req.token = actToken;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" });
    }
};

module.exports = auth;
