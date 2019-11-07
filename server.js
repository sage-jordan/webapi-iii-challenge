const express = require('express');
const server = express();
server.use(express.json());
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const nodemon = require('nodemon');
// const path = require('path');
server.use('/post',  postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} to ${req.url}. Data: ${req.post}`);
  next();
};

server.use(logger);

server.use('/', (req, res) => {
  res.status(200).send('Express Running');
})

server.listen(5000, () => {
  console.log(`=== Server listening on port 5000 ===`);
}) 

module.exports = server;
