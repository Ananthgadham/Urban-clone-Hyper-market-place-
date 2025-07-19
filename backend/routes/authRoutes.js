// import express from 'express';
// import { logoutUser, registerUser } from '../controllers/authController.js';
// import { loginUser } from '../controllers/authController.js';
// import authMiddleware from '../middleware/authMiddleware.js';
// import adminMiddleware from '../middleware/adminMiddleware.js';
// const router = express.Router();


// router.get("/me", authMiddleware, (req, res) => {
//   res.status(200).json({ user: req.user });
// });


// router.get('/verify', authMiddleware,adminMiddleware, (req, res) => {
//   res.status(200).json({ message: 'User is authenticated and authorized' });
// });
// // Route: POST /api/auth/register
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/logout', logoutUser);
// export default router;

 
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { logoutUser, registerUser, loginUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.redirect("http://localhost:5173/auth/callback");
  }
);

export default router;
