
exports.post = function (req, res, next) {
    res.render('login');
    req.render('');
};

exports.get = function(req, res, next) {
    res.render('login');
};
