const { user, role } = require("../models");
const db = require("../models");
const Role = require("../models/role.model");
const User = db.user;

exports.adduser = (req, res) => {
    console.log(req.body);
    if (req.body.userObj.id) {
        User.find({ _id: req.body.userObj.id })
            .exec((err, users) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                User.updateOne({
                    _id: req.body.userObj.id
                }, {
                    $set: {
                        username: req.body.userObj.name,
                        email: req.body.userObj.username,
                        roles: req.body.userObj.role
                    }
                }).then(res=>{
                    console.log(res);
                },err=>{
                    console.log(err);
                })
                res.status(200).send(users);
            })
    } else {
        const user = new User({
            username: req.body.userObj.username,
            email: req.body.userObj.email,
            roles: req.body.userObj.role
        });
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(user);
        })
    }
};

exports.userBoard = (req, res) => {
    User.aggregate([{
        $lookup: {
            from: 'roles',
            localField: 'role[0]',
            foreignField: '_id',
            as: 'userdetails'
        }
    }]).exec((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        res.status(200).send(data);
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.deleteUser = (req, res) => {
    const userId = req.params._id.trim();
    User.deleteOne({
            _id: userId
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found, Unable to delete." });
            }
            res.status(200).send(user);
        })
}

exports.getRoleList = (req, res) => {
    Role.find({})
        .exec((err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(data);
        })
}