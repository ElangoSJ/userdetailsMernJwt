const { wallet } = require("../models");
const db = require("../models");
const Wallet = db.wallet;
const TransDetail = db.transactiondetails;

exports.createNewWallet = (req, res) => {
    Wallet.count().then((walletCount) => {
        const wallet = new Wallet({
            walletid: `WL00${walletCount+1}`,
            name: req.body.walletDetail.name,
            email: req.body.walletDetail.email,
            balance: req.body.walletDetail.balance
        });
        wallet.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(wallet);
        })
    })
}

exports.getWalletDetail = (req, res) => {
    Wallet.find({email:req.params.emailid.trim()}, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    });
}

exports.userTransactions = (req, res) => {
    Wallet.updateOne({
        walletid: req.body.transDetail.walletid
    }, {
        $set: {
            balance: req.body.transDetail.balance
        }
    }).then(data => {
        const transDetail = new TransDetail({
            walletid: req.body.transDetail.walletid,
            amount: req.body.transDetail.amount,
            balance: req.body.transDetail.balance,
            description: req.body.transDetail.description,
            type: req.body.transDetail.type
        });

        transDetail.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(data);
        });
    }, err => {
        res.status(500).send({ message: err });
    })
}

exports.getTransactiondetails = (req, res) => {
    TransDetail.find({ walletid: req.params.walletid.trim() }, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    })
}