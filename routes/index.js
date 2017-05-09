module.exports = function(app) {

    app.get('/chat', require('./chat').get);

    app.post('/chat', require('./chat').post);

/*    app.get('/chat', function (req, res) {
        res.render("chat");
    });*/


    app.get('/', require('./login').get);

    app.post('/', require('./login').post);

/*    app.get('/', function (req, res) {
        res.render("login");
    });*/

};