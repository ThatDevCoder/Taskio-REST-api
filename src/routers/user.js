const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
    dest: "avatars",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            // console.log(req);
            // console.log(file);
            cb(undefined, true);
        } else {
            cb(new Error("Please upload pic with extension on jpg,jpeg,png"));
        }
    },
});

router.post(
    "/users/me/avatar",
    upload.single("avatars"),
    (req, res) => {
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.send(500).send();
    }
});

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (isValidOperation === false) {
        return res.status(400).send({ error: "Invalid Updates" });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.send(500).send();
    }
});

module.exports = router;
