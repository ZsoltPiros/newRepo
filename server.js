var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kutule0915',
  database: 'TODOS',
});
app.use(bodyParser.json());
connection.connect();

// Define the port to run on and serve html
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'frontend')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
});

app.get('/todos', function(req, res) {
  connection.query('SELECT * FROM TODOS', function(error, rows){
    if(error) {
      res.send(error.toString());
    }
    res.send(rows);
  });
});

app.post('/todos', function(req, res) {
  connection.query('INSERT INTO TODOS (name) VALUES("'+ req.body.name +'")', function(error, rows){
    if(error) {
      res.send(error.toString());
    }
    res.send(rows);
  });
});

app.put('/todos', function(req, res) {
  connection.query('UPDATE TODOS SET done = (CASE done WHEN 1 THEN 0 ELSE 1 END) WHERE id='+ req.body.id,function(error, rows){
    if(error) {
      res.send(error.toString());
    }
    res.send(rows);
  });
});

app.delete('/todos', function(req, res) {
  connection.query('DELETE FROM TODOS WHERE id='+ req.body.id, function(error, rows) {
    if(error) {
      res.send(error.toString());
    }
  });
});
