var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace('.', '_' + Date.now()+'.') )
  }
})
var upload = multer({ storage: storage });
mongoose = require('mongoose'),
fs = require('fs');
var csrf = require('csurf') // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var session = require('cookie-session'); // Charge le middleware de sessions




var Keygrip = require('keygrip')
var cookieParser = require('cookie-parser')
var mongoUri = 'mongodb://localhost/footappbase';

mongoose.connect(mongoUri,{ autoIndex: false, useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});
// supprimer la db
/*db.dropDatabase('footappbase',function(err){
  console.log(err)
})*/


// create express app
var app = express()

// create api router
var api = createApiRouter()

// mount api before csrf is appended to the app stack

app.use('/api', api)
.use(morgan('combined'))
.use(express.static(__dirname + '/vue'))
.use(express.static(__dirname + '/images',{
  maxAge: '1d',
  
}))
.use(favicon(__dirname + '/vue/favicon.ico'))

// now add csrf and other middlewares, after the "/api" was mounted
//pour lire le json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(session({secret: 'dsgghjh'}))
 //app.use(cookieParser())
 //app.use(csrf({ cookie: true }))

require('./models/default')
require('./models/arbitre')
require('./models/tournois')
require('./models/match'); 
require('./models/classement_joueur'); 
require('./models/classement_equipe'); 
require('./models/calendrier');
require('./models/utilisateur');
require('./models/carton');
require('./models/equipe');
require('./models/joueur');
require('./models/terrain');
require('./models/organisateur');
require('./models/poule');
require('./models/programme');
require('./models/statistiques_match');
app.post('/photoequipe', upload.single('equipe'), function (req, res, next) {
  // req.file is the `avatar` file
  
   if(req.file)return res.send({status:true,name:req.file.filename})
  
});
app.get('/images/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/images/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});
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
