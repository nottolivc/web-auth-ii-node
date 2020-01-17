const express = require('express');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/dbConfig.js');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'this the secret hash',
  name: 'sessionCookie',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30 * 7,
  }),
};
 
const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
//whitelist domain for cookies

server.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

server.use(express.json());
server.use(session(sessionConfig));

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter);
const usersRouter = require('./users/users-router.js');
server.use('/users', usersRouter);


const PORT = 5000;
server.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`)}
  );