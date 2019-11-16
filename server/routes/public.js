const express = require('express');

const router = new express.Router();

router.get('/points', (req, res) => {
  res.status(200).json({
    message: "Points"
  });
});

router.get('/challenges', (req, res) => {
  res.status(200).json({
    message: "Challenges"
  });
});

module.exports = router;
