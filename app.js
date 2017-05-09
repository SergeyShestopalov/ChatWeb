var express = require('./node_modules/express');
var http = require('http');
var path = require('path');
var config = require('./config/config');
var sqlite3 = require('./node_modules/sqlite3').verbose();
//************************
var routes = require('./routes');
var favicon = require('./node_modules/serve-favicon');
var logger = require('morgan');
var methodOverride = require('./node_modules/method-override');
var session = require('./node_modules/express-session');
var bodyParser = require('./node_modules/body-parser');
var multer = require('./node_modules/multer');
var cookieParser = require('./node_modules/cookie-parser');
var engine = require('ejs-mate');
//************************

var app = express();
app.set('port', config.port);
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port: '+ app.get('port'));
});
var io = require('./node_modules/socket.io')(server);

app.set('views', __dirname + '/template');
app.set('view engine', "ejs");
app.engine('ejs', require("./node_modules/ejs-mate"));
//app.use(favicon);
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
//app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, "public")));
app.get('/', function (req, res, next) {
   res.render("login");
});
require("./routes")(app);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

module.exports = app;
