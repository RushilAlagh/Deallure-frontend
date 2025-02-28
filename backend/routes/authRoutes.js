const express = require("express");
const { signupUser } = require("../services/userOperations");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const message = await signupUser(req.body);
    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;