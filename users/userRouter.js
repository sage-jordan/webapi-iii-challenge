const express = require('express');

const router = express.Router();

const db = require('./userDb');

router.post('/', (req, res) => {
    
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json({ success: true, users });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    db.getById(id)
        .then(user => {
            if(user){
                res.status(200).json({ success: true, user });
            } else {
                res.status(404).json({ success: false, message: `There is no user with id ${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;
    db.getUserPosts(id)
        .then(user => {
            res.status(200).json({ success: true, user })
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(() => {
            res.status(204).json({ success: true, message: `User with id ${id} has successfully been deleted.`})
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        })
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    console.log(id);
    db.getById(id)
        .then(user => {
            console.log(user);
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(404).json({ message: "invalid user id" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved.", err });
        });
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
