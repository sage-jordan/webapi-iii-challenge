// Server Setup
const express = require('express');
require('dotenv').config();
const server = express();
const port = process.env.PORT;
server.use(express.json());

// Routers 
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

// const path = require('path');
server.use('/post',  postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// Custom Middleware

function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} to ${req.url}.`);
  next();
};

server.use(logger);

server.use('/', (req, res) => {
  res.status(200).send('Express Running');
})

server.listen(port, () => {
  console.log(`=== Server listening on port ${port} ===`);
}) 

module.exports = server;
