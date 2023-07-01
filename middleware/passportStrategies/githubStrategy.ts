import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { userModel, database } from '../../models/userModel';

const githubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  function(accessToken: any, refreshToken: any, profile: any, done: any) {
    let user = userModel.findById(profile.id);
    if (!user) {
      user = { 
        id: profile.id, 
        name: profile.displayName, 
        email: '',  // Assuming that your user model has an email field, you may want to populate it properly
        password: '', // Assuming that your user model has a password field, you may want to populate it properly
      };
      database.push(user);
    }
    return done(null, user);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;