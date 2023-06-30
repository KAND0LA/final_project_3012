"use strict";
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import { PassportStrategy } from '../../interfaces/index';
Object.defineProperty(exports, "__esModule", { value: true });
// const githubStrategy: GitHubStrategy = new GitHubStrategy(
//     {
//         clientID: "2c7322fa82e19e6db3aa",
//         clientSecret: "008d24117effe15a6c43119e3686bf5f02f8380e",
//         callbackURL: "http://localhost:8000/auth/github/callback",
//         passReqToCallback: true,
//     },
//     /* FIX ME 😭 */
//     async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {},
// );
// const passportGitHubStrategy: PassportStrategy = {
//     name: 'github',
//     strategy: githubStrategy,
// };
// export default passportGitHubStrategy;
const passport_github2_1 = require("passport-github2");
const githubStrategy = new passport_github2_1.Strategy({
    clientID: "fe591319a37ddfd0c519",
    clientSecret: "02ab37719b2d302ddf7a030c0162d8776051554b",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
}, function (req, accessToken, refreshToken, profile, done) {
    // Here you could potentially find or create a user in your database
    // For the sake of simplicity, we're just returning the profile
    done(null, profile);
});
const passportGitHubStrategy = {
    name: 'github',
    strategy: githubStrategy,
};
exports.default = passportGitHubStrategy;
