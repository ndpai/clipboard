const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sqlite3 = require('sqlite3').verbose();
const jwt = require("jsonwebtoken");
const config = process.env;

let db = new sqlite3.Database("./dev.sqlite");

router.post("/add", (req, res) => {
    try{
        User.create(req.body).then(() => {
            res.status(200).json('User added');
        });
    }
    catch(e) {
        res.status(500).json('Internal Server Error');
    }
});

router.post("/login", (req, res) => {
    try {
        const {
            email, password
        } = req.body;

        let usersQuery = `SELECT * FROM users`;

        db.all(usersQuery, (err, users) => {
            err && console.log(err);
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === email && users[i].password === password) {
                        const payload = {
                            user: {
                                id: users[i].id,
                                email: users[i].email,
                                type: "user"
                            }
                        };
                        jwt.sign(
                            payload,
                            "token",
                            {
                                expiresIn: Math.floor(Date.now() / 1000) + (31535966)
                            },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    token,
                                });
                            }
                        );
                        break;
                    } else {
                        res.status(404).json('No user found');
                    }
                }
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
