var Link = require('../models/links.model.js');

exports.list = function(req, res) {
    var query = Link.find();

    query.sort({ title: 'desc'})
        .limit(12)
        .exec(function(err, results){
            res.json(results);
        });

};