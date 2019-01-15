const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Handlebars
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');



// Middlewares
app.use(morgan('dev'));
    // Sirve para extender la funcionalidad de formularios
app.use(express.urlencoded({extended: false}));
    // para usar json
app.use(express.json());


// Global variables
app.use((req, res, next) => {
    next();
})


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('links', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server

app.listen(app.get('port'), () => {
    console.log("Server on in", app.get('port'));
});

