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

router.post('/modificarInvestidor/:id', controllers.ServicesController.postModificarInvestidor);

router.post('/modificar', controllers.ServicesController.postModificarProduto);

module.exports = router;
