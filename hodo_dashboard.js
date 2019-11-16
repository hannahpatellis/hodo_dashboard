const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost/hododash';

mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
	process.exit(1);
});

app.use(logger('dev'));

// Serve the React build folder as static if the NODE_ENV is set to production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Load Passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Pass the authenticaion checker middleware -- require authentication for private API routes
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Auth routes for Passport
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// Private API routes
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

// Public API routes (doesn't require authentication)
const publicRoutes = require('./server/routes/public');
app.use('/public', publicRoutes);

// Send every request not met in routes to the React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎  Server now on port ${PORT}!`);
});
