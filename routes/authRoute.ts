import express, { Request, Response, request } from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
import session from "express-session";

const router = express.Router();

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


router.get("/login", forwardAuthenticated, (req, res) => {
  // req.session.messages = [];
  // @ts-ignore
  const error = req.session.messages || "";
  res.render("login", { error });
});

// router.get('/login', (req, res) => {res.render('login', {messages: req.session.messages})});
// let errorMessage = ""

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true, // req.session.messages
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));


router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

export default router;