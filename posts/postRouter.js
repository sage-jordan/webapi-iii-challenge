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
    const id = req.params.id;
    db.remove(id)
        .then(() => {
            res.status(204).json({ success: true, message: `Post with id ${id} has successfully been deleted.`})
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        })
});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    console.log(id);
    db.getById(id)
        .then(post => {
            console.log(post);
            if(post) {
                req.post = post;
                next();
            } else {
                res.status(404).json({ message: "invalid post id" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved.", err });
        });
};

module.exports = router;