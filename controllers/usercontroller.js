const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// { "user" : { "username" : "user", "password" : "password"}}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM2MTMwNDIzLCJleHAiOjE2MzYyMTY4MjN9.B89T-ov0IPgTAZtsSA7jndU0Ru2E7NGU08nfyAjg61U

// { "user" : { "username2" : "user", "password" : "password"}}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM2MTM2ODI3LCJleHAiOjE2MzYyMjMyMjd9.WYoXyUaMHlOfudCzg2tnQ89Q4EugBh8nCDGzs1Xs3xs

router.post("/register", async (req, res) => {
    let { username, password } = req.body.user;
    try {
        const user = await User.create({
            username,
            passwordhash: bcrypt.hashSync(password, 13)
        });
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        res.status(201).json({
            message: "User successfully created",
            user: user,
            sessionToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: "Error: " + err,
        });
    }
});

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;
    try {
        const loginUser = await User.findOne({
            where: {
                username: username,
            }
        });
        let passwordComparison = await bcrypt.compare(password, loginUser.passwordhash);
        if (passwordComparison) {
            let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: `Login failed --- Error: ${error}`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to log user in. --- Error: ${error}`
        })
    }
});

module.exports = router;