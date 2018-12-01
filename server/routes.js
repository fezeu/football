module.exports = function(app){
    var carton = require('./controllers/carton');
    app.get('/carton', carton.findAll);
    app.get('/carton/:id', carton.findById);
    app.get('/import', carton.import);
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

    var equipe = require('./controllers/equipe');
    app.get('/equipe', equipe.findAll);
    app.get('/equipe/:id', equipe.findById);
    app.post('/equipe', equipe.add);
    app.put('/equipe/:id', equipe.update);
    app.delete('/equipe/:id', equipe.delete);
}