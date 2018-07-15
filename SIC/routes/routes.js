var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');


router.get('/api/', function (request, response) {
  response.send('Servidor Rodando');
});

router.get('/', controllers.HomeController.index);

router.get('/dicas', controllers.ServicesController.getDicas);

router.get('/estatisticas', controllers.ServicesController.getEstatisticas);

router.get('/investidor', controllers.ServicesController.getInvestidores);

router.get('/novo', controllers.ServicesController.getNovoInvestidor);

router.post('/novoInvestidor', controllers.ServicesController.postNovoInvestidor);

router.post('/apagarInvestidor', controllers.ServicesController.apagarInvestidor);

router.get('/modificar/:id', controllers.ServicesController.getModificarInvestidor);

router.post('/modificarInvestidor', controllers.ServicesController.postModificarInvestidor);

module.exports = router;
