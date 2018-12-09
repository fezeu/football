
module.exports = function(app){
  var poule = require('./controllers/poule');
    app.post('/poule_all',poule.findAll);
    app.post('/poule',poule.add);
    app.get('/poule',poule.findAllT);
    app.get('/poule/:id', poule.findById);
    app.put('/poule/:id', poule.update);
    app.delete('/poule/:id', poule.delete);

    var tournois = require('./controllers/tournois');
    app.post('/basique_info',tournois.intit);
    app.post('/tournois_create',tournois.generate);
    app.get('/tournois/status/:id',tournois.status);
    app.get('/tournois',tournois.findAll);
    app.get('/tournois/:id', tournois.findById);

    var match = require('./controllers/match');
    app.get('/match_equipes/:id',match.equipesMatch);
    app.get('/match', match.findAll);
    app.get('/match/:id', match.findById);
    app.get('/match_poule/:id',match.findAllPoule);
    app.put('/match:id', match.update);

    var user = require('./controllers/utilisateur');
    app.get('/user', user.findAll);
    app.get('/user/:id', user.findById);
    app.get('/logout', user.logout);
    app.post('/user', user.add);
    app.post('/login', user.login);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.delete);

    var arbitre = require('./controllers/arbitre');
    app.get('/arbitre', arbitre.findAll);
    app.get('/arbitre/:id', arbitre.findById);
    app.post('/arbitre', arbitre.add);
    app.put('/arbitre/:id', arbitre.update);
    app.delete('/arbitre/:id', arbitre.delete);

    var carton = require('./controllers/carton');
    app.get('/carton', carton.findAll);
    app.get('/carton/:id', carton.findById);
    app.post('/carton', carton.add);
    app.put('/carton/:id', carton.update);
    app.delete('/carton/:id', carton.delete);

    var equipe = require('./controllers/equipe');
    app.get('/equipe', equipe.findAll);
    app.get('/equipe/:id', equipe.findById);
    app.post('/equipe', equipe.add);
    app.put('/equipe/:id', equipe.update);
    app.delete('/equipe/:id', equipe.delete);

    var terrain = require('./controllers/terrain');
    app.get('/terrain', terrain.findAll);
    app.get('/terrain/:id', terrain.findById);
    app.post('/terrain', terrain.add);
    app.put('/terrain/:id', terrain.update);
    app.delete('/terrain/:id', terrain.delete);

    var joueur = require('./controllers/joueur');
    app.get('/joueur', joueur.findAll);
    app.get('/joueur/:id', joueur.findById);
    app.post('/joueur', joueur.add);
    app.put('/joueur/:id', joueur.update);
    app.delete('/joueur/:id', joueur.delete);

    app.get('/debut',function(req,res){
        if(typeof(req.session.auth) == 'undefined'){
          res.send({'status':'false'})
        }else{
          res.send({'status':true})
        }
      })
}