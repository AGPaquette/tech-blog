const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables (for local development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Use environment variables for database configuration
const sequelize = new Sequelize(process.env.JAWSDB_URL || process.env.LOCAL_DB_URL, {
  dialect: 'mysql',
  logging: false,
});

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Handlebars configuration
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware and static assets
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./controllers/'));

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  
  // Sync Sequelize models with the database
  sequelize.sync({ force: false });
});

