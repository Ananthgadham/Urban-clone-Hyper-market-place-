import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      try {
        // Check if user exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        // If not found, check if email already exists (manual sign up)
        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            // Link googleId to existing user
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create new Google user
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Store user ID in session (cookie)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user from session ID
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
