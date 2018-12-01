var express = require('express'),
mongoose = require('mongoose'),
fs = require('fs');
var csrf = require('csurf') // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres


var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser')
var mongoUri = 'mongodb://localhost/footappbase';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

// create express app
var app = express()

// create api router
var api = createApiRouter()

// mount api before csrf is appended to the app stack
app.use('/api', api)

// now add csrf and other middlewares, after the "/api" was mounted
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))


require('./models/carton');
require('./models/equipe');
require('./models/joueur');
require('./models/terrain');
require('./routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');

function createApiRouter () {
    var router = new express.Router()
  
    router.post('/getProfile', function (req, res) {
      res.send('no csrf to get here')
    })
  
    return router
  }