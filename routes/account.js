/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var account_dal = require('../dal/account_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    account_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('account/account_view_all', {account: result});
        }

    })
});

module.exports = router;

