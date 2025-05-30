const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const validator = require("validator");
const middlewareAdmin = require("../middleware/middlewareAdmin");

const router = express.Router();

const User = require("../model/user");
const Admin = require("../model/admin")

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, login: user.login, role: "user" }, // payload
        process.env.JWT_SECRET,             // секретный ключ
        { expiresIn: process.env.JWT_EXPIRES_IN } // время жизни токена
    );
};

const generateTokenAdmin = (user) => {
    return jwt.sign(
        { id: user.id, login: user.login, role: "admin" }, // payload
        process.env.JWT_SECRET,             // секретный ключ
        { expiresIn: process.env.JWT_EXPIRES_IN } // время жизни токена
    );
};

router.get("/register", async (req, res) => {
    res.render("register", {error: null});
});

// Регистрация
router.post('/register', async (req, res) => {
    const {login, email, password,confirmPassword} = req.body;
    if (!login || !email || !password || !confirmPassword) {
        return res.render("register", {error: "All fields are required"});
    }
    if (!validator.isEmail(email)) {
        return res.render("register", {error: "Invalid email format"});
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.render("register", {error: "Password must be at least 6 characters long"});
    }
    
    if (password !== confirmPassword) {
        return res.render("regiter", {error: "password not matching"})
    }
    let user = await User.findOne({email: email})

    if (user) {
        return res.render("register", {error: "email is used"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
        email: email,
        login: login,
        password: hashedPassword
    });

    await user.save();   
    const token = generateToken(user);
    res.cookie('token', token);
    res.redirect("/")
});

router.post('/adminRegister', middlewareAdmin, async (req, res) => {
    const {login, email, password} = req.body;
    if (!login || !email || !password) {
        return res.render("register", {error: "All fields are required"});
    }
    if (!validator.isEmail(email)) {
        return res.render("register", {error: "Invalid email format"});
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.render("register", {error: "Password must be at least 6 characters long"});
    }
    
    let admin = await Admin.findOne({email: email})

    if (admin) {
        return res.status(403).send("email is already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({
        email: email,
        login: login,
        password: hashedPassword
    });

    await admin.save();   
    const token = generateTokenAdmin(admin);
    res.cookie('token', token);
    res.redirect("/")
});

router.get("/login", async (req, res) => {
    res.render("login", {error: null});
});

// Вход в систему
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.render("login", {error: "email or password is incorrect"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login", {error: "email or password is incorrect"})
    }

    const token = generateToken(user);
    res.cookie('token', token);
    res.redirect("/");
});

router.get("/loginAdmin", async (req, res) => {
    res.render("loginAdmin", {error: null});
});

router.post('/loginAdmin', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.render("login", {error: "email or password is incorrect"})
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.render("login", {error: "email or password is incorrect"})
    }

    const token = generateTokenAdmin(admin);
    res.cookie('token', token);
    res.redirect("/");
});

// COOKIE DESTROY
router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
});

module.exports = router;
