const express = require('express');
const db = require('../models');

const router = new express.Router();

router.put('/points', (req, res) => {
  db.House.find({ house: req.body.house })
    .then(result => {
      const currentTotalPoints = parseInt(result[0].points);
      const pointsToAdd = parseInt(req.body.points);
      const newTotalPointsValue = currentTotalPoints + pointsToAdd;

      const currentWeekPoints = parseInt(result[0].weekpoints);
      const newWeekPointsValue = currentWeekPoints + pointsToAdd;

      db.House.updateOne({ house: req.body.house }, { points: newTotalPointsValue, weekpoints: newWeekPointsValue })
        .then(result => {
          res.status(200).json({
            message: 'Success'
          });
        })
        .catch(err => {
          console.log(`Error updating house points\n${err}`);
          res.status(500).json({
            message: 'Error updating house points',
            error: err
          });
        });
    })
    .catch(err => {
      console.log(`Error finding house\n${err}`);
      res.status(500).json({
        message: 'Error finding house',
        error: err
      });
    });
});

router.put('/weekreset', (req, res) => {
  db.House.updateMany({ }, { weekpoints: 0 })
    .then(result => {
      res.status(200).json({
        message: 'Success'
      });
    })
    .catch(err => {
      console.log(`Error reseting weekly house points\n${err}`);
      res.status(500).json({
        message: 'Error reseting weekly house points',
        error: err
      });
    });
});

router.put('/giveowl', (req, res) => {
  db.House.updateMany({ }, { owl: false })
    .then(result => {
      db.House.updateOne({ house: req.body.house }, { owl: true })
        .then(result => {
          res.status(200).json({
            message: 'Success'
          });
        })
        .catch(err => {
          console.log(`Error updating house\n${err}`);
          res.status(500).json({
            message: 'Error updating house',
            error: err
          });
        });
    })
    .catch(err => {
      console.log(`Error removing owl from all houses\n${err}`);
      res.status(500).json({
        message: 'Error removing owl from all houses',
        error: err
      });
    });
});

module.exports = router;
