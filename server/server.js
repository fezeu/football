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


// mount api before csrf is appended to the app stack

app.use(morgan('combined'))


// now add csrf and other middlewares, after the "/api" was mounted
//pour lire le json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(session({secret: 'dsgghjh@kFGFG087656jk<'}))
 .use(express.static(__dirname + '/vue'))
.use(express.static(__dirname + '/images',{
  maxAge: '1d',
}))
.use(favicon(__dirname + '/vue/favicon.ico'))
 //app.use(cookieParser())
 //app.use(csrf({ cookie: true }))
 app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})
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
        'x-sent': true,
        'maxAge':'1d'
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
app.get('/resultat',function(req,res){
  res.redirect('/')
})
app.get('/competition',function(req,res){
  res.redirect('/')
})
app.get('/classement',function(req,res){
  res.redirect('/')
})
app.get('/connexion',function(req,res){
  res.redirect('/')
})
require('./routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');


  