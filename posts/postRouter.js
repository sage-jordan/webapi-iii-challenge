const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json({ success: true, posts })
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        });
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    db.getById(id)
        .then(post => {
            if(post){
                res.status(200).json({ success: true, post });
            } else {
                res.status(404).json({ success: false, message: `There is no post with id ${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

router.delete('/:id', validatePostId, (req, res) => {

});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    db.get()
        .then(posts => {
            posts.map(post => {
                if(post.id === req.params.id){
                    next();
                }
                res.status(404).json({ success: false, message: `id ${req.params.id} does not match an existing post`})
            })
        })
        .catch(err => {
            res.status(500).json({ success: false, err})
        })
};

module.exports = router;