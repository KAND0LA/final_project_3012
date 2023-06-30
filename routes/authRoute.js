"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const checkAuth_1 = require("../middleware/checkAuth");
const router = express_1.default.Router();
router.get("/github", passport_1.default.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport_1.default.authenticate("github", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});
router.get("/login", checkAuth_1.forwardAuthenticated, (req, res) => {
    // req.session.messages = [];
    // @ts-ignore
    const error = req.session.messages || "";
    res.render("login", { error });
});
// router.get('/login', (req, res) => {res.render('login', {messages: req.session.messages})});
// let errorMessage = ""
router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true, // req.session.messages
}));
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            console.log(err);
    });
    res.redirect("/auth/login");
});
// Add the following routes for GitHub authentication
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/auth/login' }), function (req, res) {
    // Successful authentication, redirect to dashboard.
    res.redirect('/dashboard');
});
exports.default = router;
