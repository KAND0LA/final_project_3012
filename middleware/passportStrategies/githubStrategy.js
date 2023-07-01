"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_github2_1 = require("passport-github2");
const userModel_1 = require("../../models/userModel");
const githubStrategy = new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: "http://localhost:8000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    let user = userModel_1.userModel.findById(profile.id);
    if (!user) {
        user = {
            id: profile.id,
            name: profile.displayName,
            email: '',
            password: '', // Assuming that your user model has a password field, you may want to populate it properly
        };
        userModel_1.database.push(user);
    }
    return done(null, user);
});
const passportGitHubStrategy = {
    name: 'github',
    strategy: githubStrategy,
};
exports.default = passportGitHubStrategy;
