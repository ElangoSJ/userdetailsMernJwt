const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Profile Detail.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.deleteUser  = (req,res) => {
    User.findOne({
        username: req.params.username.trim()
    })
    .exec((err,user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found, Unable to delete." });
        }

        User.deleteOne({
            _id : req.params.username.trim()
        }).then((data)=>{
            console.log('User deleted Sucessfully' + data);
        })

    })
}