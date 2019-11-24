const mongoose = require('mongoose');
const db = require('./server/models/index.js');

const houseSeed = require('./seed/houseSeed.json');
const challengeSeed = require('./seed/challengeSeed.json');

require('dotenv').config();

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost/hododash';

mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
	process.exit(1);
});

db.House.create(houseSeed)
  .then(result => {
    console.log('House Seed: Success!');
    console.log('------------');
    console.log(result);
  })
  .catch(err => {
    console.log('House Seed: There\'s been an error');
    console.log('------------');
    console.log(err);
  });

db.Challenge.create(challengeSeed)
  .then(result => {
    console.log('Challenge Seed: Success!');
    console.log('------------');
    console.log(result);
  })
  .catch(err => {
    console.log('Challenge Seed: There\'s been an error');
    console.log('------------');
    console.log(err);
  });