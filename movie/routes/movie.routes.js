module.exports = (app) => {
    const char = require('../controller/movie.controller.js');

    app.post('/chars', char.create);

    app.get('/chars', char.findAll);
    app.get('/charsort', char.findAllSort);

    app.get('/char/:charId', char.findOne);

    app.put('/char/:charId', char.update);

    app.delete('/char/:charId', char.delete);
}