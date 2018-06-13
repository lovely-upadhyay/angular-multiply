var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var env = app.get('env') == 'development' ? 'development' : app.get('env');
var port = process.env.PORT || 8080;
var host = process.env.HOST || 'localhost';
var config = require('./database.json')[env];


//mysql connection
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

//rest api
var router = express.Router();

router
    .route('/getData')
    .get(function (req, res) {
        console.log( req.method + ' : ' + req.url);
        res.type('json');
        connection.query('select * from myapp_data LIMIT 1', function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            if (results.length > 0) {
                var record = results[0];
                delete record.id;
                res.json(record);
            }
            res.end();
        });
    });

router
    .route('/saveData')
    .post(function (req, res) {
        console.log( req.method + ' : ' + req.url);
        res.type('json');
        var params  = req.body;
        var sql = 'INSERT INTO myapp_data(input1, input2, result) VALUES ( '+ params.input1 + ' , ' + params.input2 + ',' + params.result + ') ON DUPLICATE KEY UPDATE input1 = ' + params.input1 + ', input2 = ' + params.input2 + ', result = ' + params.result;
        connection.query(sql, function (error, results, fields) {
            if (error)  {
                res.status(400);
            }
            res.status(202);
            res.end();
        });
    });


//body-parser configuration
app.use( bodyParser.json() );

// Enabling CORS
app.use(cors());
app.use('/api', router);

//create app server
var server = app.listen(port, host, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Application listening at http://%s:%s", host, port)
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});
