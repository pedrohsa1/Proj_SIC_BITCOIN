var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/routes');
var bitcoinApi = require('./api/bitcoin');
var helmet = require('helmet');

var app = express();
/*teste*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

//APIs Bitcoin -------------------------------------------------------------------------------------
app.get('/api/', function (request, response) {
  response.send('Servidor Rodando...');
});
app.get('/api/lista/exchanges/maioresOfertasDeCompra', bitcoinApi.gExchangesCompra);
app.get('/api/lista/exchanges/menoresOfertasDeVenda', bitcoinApi.gExchangesVenda);
//----------------------------------------------------------------------------------------------------

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
console.log('Servidor Rodando...');
module.exports = app;
