const express = require('express');
const db = require('../models');

const router = new express.Router();

router.get('/points', (req, res) => {
  db.House.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(`Error retrieving points\n${err}`);
      res.status(500).json(err);
    });
});

router.get('/challenges', (req, res) => {
  db.Challenge.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(`Error retrieving challenges\n${err}`);
      res.status(500).json(err);
    });
});

module.exports = router;
