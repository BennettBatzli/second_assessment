//the random number gets generated on page load and
// remains the same for every animal submitted,
// couldn't fix it in time



var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var randomNumber = require('./routes/randomNumber')

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl';
} else {
  connectionString = 'postgres://localhost:5432/second_assessment';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var objectNumber = {number: (randomNumber(1,100)).toString()};
//
app.get('/randomNumber', function(req, res){
  console.log('in randomNumber route');


  res.send(objectNumber.number);

  console.log(req.body.number);
});


var results = [];
results.push(objectNumber.number);
console.log('pleeeeaseeee: '+ results);


 //get data route
app.get('/zoo', function(req, res) {


  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('SELECT * FROM zoo ORDER BY id DESC;');
    console.log('queries are fun' + query);

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // close connection
    query.on('end', function () {
      client.end();
      return res.json(results);
    });

    if (err) {
      console.log(err);
    }
  });
  console.log("these are" +results);
});

app.post('/zoo', function(req, res) {
  var addAnimal = {
    id: req.body.id,
    animal_type: req.body.animal_type

  };

  pg.connect(connectionString, function(err, client) {
    client.query("INSERT INTO zoo (animal_type, number_of_animal) VALUES ($1, $2)" +
      " RETURNING id",
      [addAnimal.animal_type, objectNumber.number],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
  });
});


app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});