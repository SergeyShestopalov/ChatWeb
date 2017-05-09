var sqlite3 = require('../node_modules/sqlite3').verbose();
var db = new sqlite3.Database('dbchat.sqlite3');


exports.post = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    db.get("SELECT login, password FROM Users WHERE login= '"+email.toString()+"'", function(err, result) {
        if(!result) {
            db.run("INSERT INTO Users VALUES ('"+email.toString()+"','"+password.toString()+"')");
            res.render('chat');
        }else {
            if (password == result.password) {
             res.render('chat');
             } else {
                res.render("login");
               /* res.render("404");*/
                //TODO просьба ввести правильный пароль
             }
        }
    });

};

exports.get = function(req, res, next) {
    res.render('chat');
};
