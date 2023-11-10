const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Load environment variables (for local development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Use environment variables for database configuration
const sequelize = new Sequelize(process.env.DB_NAME || process.env.JAWSDB_URL, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost', // You can add a DB_HOST environment variable as well
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


