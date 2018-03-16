/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var skill_dal = require('../dal/skill_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    skill_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('skill/skill_view', {skill: result});
        }

    })
});

module.exports = router;

/**
 * Created by student on 3/15/18.
 */
