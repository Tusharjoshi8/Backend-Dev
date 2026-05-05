import express from "express";

const router = express.Router();

// Basic route for testing
router.get("/", (req, res) => {
  res.status(200).json({ message: "Login route working" });
});

export default router;
