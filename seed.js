const mongoose = require('mongoose');
const db = require('./server/models/index.js');

require('dotenv').config();

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost/hododash';

mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
	process.exit(1);
});

const houseSeed = [
  {
    'house': 'Gestalt',
    'head': 'Dishanta',
    'points': 0,
    'weekpoints': 0,
    'owl': false,
    'image': 'gestalt.png',
    'hex': 'D54D49'
  },
  {
    'house': 'Context',
    'head': 'Adriana',
    'points': 0,
    'weekpoints': 0,
    'owl': false,
    'image': 'context.png',
    'hex': '7A52E0'
  },
  {
    'house': 'Heuristics',
    'head': 'Devin',
    'points': 0,
    'weekpoints': 0,
    'owl': false,
    'image': 'heuristics.png',
    'hex': '009478'
  }
];

db.House.create(houseSeed)
  .then(result => {
    console.log('Success!');
    console.log('------------');
    console.log(result);
    process.exit(1);
  })
  .catch(err => {
    console.log('There\'s been an error');
    console.log('------------');
    console.log(err);
    process.exit(1);
  });