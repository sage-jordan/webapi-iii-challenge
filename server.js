const express = require('express');

const server = express();
const postRouter = require('./posts/postRouter');

server.use('/post',  postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

server.use('/', () => {
  res.status(200).send('Express Running');
})

server.listen(5000, () => {
  console.log(`=== Server listening on port 5000 ===`);
}) 

module.exports = server;
