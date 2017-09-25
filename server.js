require("babel-register");
const express = require('express');
const bodyParser = require('body-parser');

const Controller = require('./api/controllers/controller');
const loki = require('lokijs');
const app = express();

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

var db = new loki('data.json', {autosave: true, autoload: true, throttledSaves: true});

const adddRoute = (app, controller) => {
    app.route(`/api/${controller.collection}`)
        .get(controller.get_all)
        .post(controller.create);

    app.route(`/api/${controller.collection}/:id`)
        .get(controller.get)
};

adddRoute(app, Controller.bind(db, 'books'));
adddRoute(app, Controller.bind(db, 'authors'));

app.listen(app.get('port'), () => {
    console.log(`You can retrieve your books at: http://localhost:${app.get('port')}/api/books`);
});



