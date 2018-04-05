/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.update = function(params, callback) {
    var query = 'UPDATE skill SET skill_name = ? WHERE skill_id = ?';
    var queryData = [params.skill_name, params.skill_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.getinfo = function(skill_id, callback) {
    var query = 'CALL skill_getinfo(?)';
    var queryData = [skill_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};


exports.getAll = function(callback) {
    var query = 'CALL skill_getall();';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
/**
 * Created by student on 3/15/18.
 */
exports.insert = function(params, callback) {

    var query = 'INSERT INTO skill (skill_name, description) VALUES (?, ?)';
    var queryData = [params.skill_name, params.description];

    connection.query(query, queryData, function(err, result) {
        if(err || params.skill_name === undefined) {
            console.log(err);
            callback(err, result);
        } else {
            var skill_id = result.insertId;
            var query = 'INSERT INTO skill (skill_id, skill_name, description) VALUES ?';
            var skillData = [];
            if (params.skill_id.constructor === Array) {
                for (var i =0; i< params.skill_id.length; i++) {
                    skillData.push([skill_id, params.skill_id[i]]);
                }
            } else {
                skillData.push([skill_id, params.skill_id]);
            }

            connection.query(query, [skillData], function(err, result) {
                callback(err, result);
            });
        }

    });
};