var https = require('https');
var BlinkTradeRest = require("blinktrade").BlinkTradeRest;

var gExchangesCompra = {'mercadobitcoin': {},
                       'foxbit': {},
                       'kraken':{},
                       'bittrex': {},
                       'bitstamp':{},
                       'bitfinex': {},
                       'cex': {},
                       'chilebit': {},
                       'surbitcoin':{},
                       'urdubit': {},
                       'vbtc': {}
                      };
var gExchangesVenda = {'mercadobitcoin': {},
                       'foxbit': {},
                       'kraken':{},
                       'bittrex': {},
                       'bitstamp':{},
                       'bitfinex':{},
                       'cex': {},
                       'chilebit': {},
                       'surbitcoin':{},
                       'urdubit': {},
                       'vbtc': {}
                      };

setInterval(function(){
  mercadoBitcoinOrderBook();
  krakenOrderbok();
  bittrexOrderbok();
  bitstampOrderbok();
  bitfinexOrderbok();
  cexOrderbok();
  //gerarEstatisticasCompra();
}, 3000);
foxBitOrderBook();

module.exports = {
  gExchangesCompra: function (request, response,next) {
    response.json(gExchangesCompra);
  },
  gExchangesVenda: function (request, response,next) {
    response.json(gExchangesVenda);
  }
}

//------------------------------------------------------------------------------
/*
Gerar Estatísticas no Servidor

function gerarEstatisticasCompra(){
  var mediaCompra = 0;
  var maiorValorExchange = {};
  var qntExchange = 0
  Object.keys(gExchangesCompra).forEach(function(key) {

    qntExchange ++;
    maiorValorExchange = gExchangesCompra[key].maiorCompraValor;
    if(typeof maiorValorExchange === 'undefined') maiorValorExchange = 0;

    mediaCompra += maiorValorExchange;
  });
  gExchangesCompra.mediaCompra = mediaCompra / (qntExchange - 1); //retirando o atributo da mediaCompra
}*/

function mercadoBitcoinOrderBook(){
  var HOST = 'mercadobitcoin.net';
  var ENDPOINT = '/api/BTC/orderbook/';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();
        //console.log(orderbook);
      //conjunto de todas as ofertas de compra.
        var ordemBids = orderbook["bids"];
        var exchange = 'Mercado Bitcoin';
        var siglaPais = 'BRA';
        var pais = 'Brasil';
        var linkExchange = 'https://www.mercadobitcoin.com.br/';
        var codCompra = 'mbtCodCompra';
        var codVenda = 'mbtCodVenda';

        var compraTopoMaiorValor = ordemBids[0][0];
        var compraTopoMaiorValorEmBTC = ordemBids[0][1];
        var somaBidsBtcMbt = 0;
        var mbtBidsValor = [];
        var mbtBidsBTC = [];
        for(var j = 0; j < ordemBids.length; j++){
            mbtBidsValor.push(ordemBids[j][0]);
            mbtBidsBTC.push(ordemBids[j][1]);
            somaBidsBtcMbt += parseFloat(ordemBids[j][1]);
        }
        var compraTopoMaiorValorUSD =  compraTopoMaiorValor * 0.3037667;
        var numCompradoresExchange = mbtBidsValor.length;
        var jsonMercadoBitcoinMaiorValorCompra = serializarJsonCompra(codCompra, exchange, compraTopoMaiorValor, compraTopoMaiorValorUSD, compraTopoMaiorValorEmBTC, somaBidsBtcMbt, numCompradoresExchange + '/1000', siglaPais, pais,  linkExchange);
        gExchangesCompra.mercadobitcoin = jsonMercadoBitcoinMaiorValorCompra;

        //conjunto de todas as ofertas de venda (MODIFICAR)
        var ordemAsks = orderbook["asks"];
        var vendaTopoMenorValor = ordemAsks[0][0];
        var vendaTopoMenorValorEmBTC = ordemAsks[0][1];
        var somaAsksBtcMbt = 0;
        var mbtAsksValor = [];
        var mbtAsksBTC = [];
        for(var j = 0; j < ordemAsks.length; j++){
            mbtAsksValor.push(ordemAsks[j][0]);
            mbtAsksBTC.push(ordemAsks[j][1]);
            somaAsksBtcMbt += parseFloat(ordemAsks[j][1]);
        }
        var vendaTopoMenorValorUSD =  vendaTopoMenorValor * 0.3037667;
        var numVendedoresExchange = mbtAsksValor.length;
        var jsonMercadoBitcoinMenorValorVenda = serializarJsonVenda(codVenda, exchange, vendaTopoMenorValor, vendaTopoMenorValorUSD, vendaTopoMenorValorEmBTC, somaAsksBtcMbt, numVendedoresExchange + '/1000', siglaPais, pais, linkExchange);
        gExchangesVenda.mercadobitcoin = jsonMercadoBitcoinMenorValorVenda;
  });
}

function foxBitOrderBook(){
  var BlinkTradeFox = new BlinkTradeRest({
    prod: true,
    currency: "BRL",
  });
    BlinkTradeFox.orderbook().then(function(orderbook) {
      setTimeout(chileBitOrderBook, 3000);
      orderbook.data = new Date();

    var ordemBidsFox = orderbook["bids"];
        var exchangeFox = 'Foxbit';
        var siglaPais = 'BRA';
        var pais = 'Brasil';
        var linkExchange = 'https://foxbit.com.br/';
        var codCompra = 'foxCodCompra';
        var codVenda = 'foxCodVenda';

        var compraTopoMaiorValorFox = ordemBidsFox[0][0];
        var compraTopoMaiorValorEmBTCFox = ordemBidsFox[0][1];
        var foxBidsBTC = [];
        var foxBidsValor = [];
        var somaBidsBtcFox = 0;
        for(var i = 0; i < ordemBidsFox.length; i++){
          foxBidsBTC.push(ordemBidsFox[i][0]);
          foxBidsValor.push(ordemBidsFox[i][1]);
          somaBidsBtcFox += parseFloat(ordemBidsFox[i][1]);
        }
        var compraTopoMaiorValorFoxUSD = compraTopoMaiorValorFox * 0.3037667;
        var numCompradoresExchange = foxBidsBTC.length;
        var jsonFoxbitMaiorValorCompra = serializarJsonCompra(codCompra, exchangeFox, compraTopoMaiorValorFox, compraTopoMaiorValorFoxUSD, compraTopoMaiorValorEmBTCFox, somaBidsBtcFox, numCompradoresExchange + '/100' , siglaPais, pais, linkExchange);
        gExchangesCompra.foxbit = jsonFoxbitMaiorValorCompra;

        //conjunto de todas as ofertas de venda (Modificar)
        var ordemAsksFox = orderbook["asks"];
        var vendaTopoMenorValorFox = ordemAsksFox[0][0];
        var vendaTopoMenorValorEmBTCFox = ordemAsksFox[0][1];
        var foxAsksBTC = [];
        var foxAsksValor = [];
        var somaAsksBtcFox = 0;
        for(var i = 0; i < ordemAsksFox.length; i++){
            foxAsksBTC.push(ordemAsksFox[i][0]);
            foxAsksValor.push(ordemAsksFox[i][1]);
            somaAsksBtcFox += parseFloat(ordemAsksFox[i][1]);
        }
        var vendaTopoMenorValorFoxUSD = vendaTopoMenorValorFox * 0.3037667;
        var numVendedoresExchange = foxAsksBTC.length;
        var jsonFoxbitMenorValorVenda = serializarJsonVenda(codVenda, exchangeFox, vendaTopoMenorValorFox, vendaTopoMenorValorFoxUSD, vendaTopoMenorValorEmBTCFox, somaAsksBtcFox, numVendedoresExchange + '/100', siglaPais, pais, linkExchange);
        gExchangesVenda.foxbit = jsonFoxbitMenorValorVenda;
    }).catch(function(failure){
      console.log(failure);
    });
}

function krakenOrderbok(){
  var HOST = 'api.kraken.com';
  var ENDPOINT = '/0/public/Depth?pair=XBTUSD';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();
      //conjunto de todas as ofertas de compra.
      var ordemBidsKraken = orderbook.result.XXBTZUSD.bids;
      var exchangeKraken = "Kraken";
      var siglaPais = 'USA';
      var pais = 'Estados Unidos';
      var linkExchange = 'https://www.kraken.com/';
      var codCompra = 'kraCodCompra';
      var codVenda = 'kraCodVenda';

      var compraTopoMaiorValorKrakenUSD = ordemBidsKraken[0][0];
      var compraTopoMaiorValorEmBTCKraken = ordemBidsKraken[0][1];
      var krakenBidsBTC = [];
      var krakenBidsValor = [];
      var somaBidsBtcKraken = 0;
      for(var i = 0; i < ordemBidsKraken.length; i++){
          krakenBidsBTC.push(ordemBidsKraken[i][0]);
          krakenBidsValor.push(ordemBidsKraken[i][1]);
          somaBidsBtcKraken += parseFloat(ordemBidsKraken[i][1]);
      }
      var compraTopoMaiorValorKrakenBRL = compraTopoMaiorValorKrakenUSD * 3.2920001;
      var numCompradoresExchange = krakenBidsBTC.length;
      var jsonKrakenMaiorValorCompra = serializarJsonCompra(codCompra, exchangeKraken, compraTopoMaiorValorKrakenBRL, compraTopoMaiorValorKrakenUSD, compraTopoMaiorValorEmBTCKraken, somaBidsBtcKraken, numCompradoresExchange + '/100', siglaPais, pais, linkExchange);
      gExchangesCompra.kraken = jsonKrakenMaiorValorCompra;

      //conjunto de todas as ofertas de venda
      var ordemAsksKraken = orderbook.result.XXBTZUSD.asks;
      var vendaTopoMenorValorKrakenUSD = ordemAsksKraken[0][0];
      var vendaTopoMenorValorEmBTCKraken = ordemAsksKraken[0][1];
      var krakenAsksBTC = [];
      var krakenAsksValor = [];
      var somaAsksBtcKraken = 0;
      for(var i = 0; i < ordemAsksKraken.length; i++){
          krakenAsksBTC.push(ordemAsksKraken[i][0]);
          krakenAsksValor.push(ordemAsksKraken[i][1]);
          somaAsksBtcKraken += parseFloat(ordemAsksKraken[i][1]);
      }
      var vendaTopoMenorValorKrakenBRL = vendaTopoMenorValorKrakenUSD * 3.2920001;
      var numVendedoresExchange = krakenAsksBTC.length;
      var jsonKrakenMenorValorVenda = serializarJsonVenda(codVenda, exchangeKraken,vendaTopoMenorValorKrakenBRL, vendaTopoMenorValorKrakenUSD, vendaTopoMenorValorEmBTCKraken, somaAsksBtcKraken, numVendedoresExchange + '/100', siglaPais, pais, linkExchange);
      gExchangesVenda.kraken = jsonKrakenMenorValorVenda;
  });
}

function chileBitOrderBook(){
  setTimeout(surBitcoinOrderBook, 3000);
  var BlinkTrademChileBit = new BlinkTradeRest({
      prod: true,
      currency: "CLP",
  });
    BlinkTrademChileBit.orderbook().then(function(orderbook) {
      orderbook.data = new Date();
      //conjunto de todas as ofertas de compra.
    var ordemBidsCLP = orderbook["bids"];
        var exchangeCLP = 'ChileBit';
        var siglaPais = 'CHL';
        var pais = 'Chile';
        var linkExchange = 'https://chilebit.net/';
        var codCompra = 'chiCodCompra';
        var codVenda = 'chiCodVenda';

        var compraTopoMaiorValorCLP = ordemBidsCLP[0][0];
        var compraTopoMaiorValorEmBTCCLP = ordemBidsCLP[0][1];
        var clpBidsBTC = [];
        var clpBidsValor = [];
        var somaBidsBtcCLP = 0;
        for(var i = 0; i < ordemBidsCLP.length; i++){
            clpBidsBTC.push(ordemBidsCLP[i][0]);
            clpBidsValor.push(ordemBidsCLP[i][1]);
            somaBidsBtcCLP += parseFloat(ordemBidsCLP[i][1]);
        }
        var compraTopoMaiorValorCLPBRL = compraTopoMaiorValorCLP   * 0.005182;
        var compraTopoMaiorValorCLPUSD = compraTopoMaiorValorCLP * 0.0015743;
        var numCompradoresExchange = clpBidsBTC.length;
        var jsonClpMaiorValorCompra = serializarJsonCompra(codCompra, exchangeCLP, compraTopoMaiorValorCLPBRL, compraTopoMaiorValorCLPUSD, compraTopoMaiorValorEmBTCCLP, somaBidsBtcCLP, numCompradoresExchange + '/100', siglaPais, pais, linkExchange);
        gExchangesCompra.chilebit = jsonClpMaiorValorCompra;

        //conjunto de todas as ofertas de venda
        var ordemAsksCLP = orderbook["asks"];
        var exchangeVendaCLP = 'ChileBit';
        var vendaTopoMenorValorCLP = ordemAsksCLP[0][0];
        var vendaTopoMenorValorEmBTCCLP = ordemAsksCLP[0][1];
        var clpAsksBTC = [];
        var clpAsksValor = [];
        var somaAsksBtcCLP = 0;
        for(var i = 0; i < ordemAsksCLP.length; i++){
            clpAsksBTC.push(ordemAsksCLP[i][0]);
            clpAsksValor.push(ordemAsksCLP[i][1]);
            somaAsksBtcCLP += parseFloat(ordemAsksCLP[i][1]);
        }
        var vendaTopoMenorValorCLPBRL = vendaTopoMenorValorCLP * 0.005182;
        var vendaTopoMenorValorCLPUSD = vendaTopoMenorValorCLP * 0.0015743;
        var numVendedoresExchange = clpAsksBTC.length;
        var jsonClpMenorValorVenda = serializarJsonVenda(codVenda, exchangeCLP, vendaTopoMenorValorCLPBRL, vendaTopoMenorValorCLPUSD, vendaTopoMenorValorEmBTCCLP, somaAsksBtcCLP, numVendedoresExchange + '/100', siglaPais, pais, linkExchange);
        gExchangesVenda.chilebit = jsonClpMenorValorVenda;
    }).catch(function(failure){
      console.log(failure);
    });
}

function surBitcoinOrderBook(){
  setTimeout(urdubitOrderbook, 3000);
  var BlinkTradeSurBitcoin = new BlinkTradeRest({
    prod: true,
    currency: "VEF",
  });
  BlinkTradeSurBitcoin.orderbook().then(function(orderbook) {
    orderbook.data = new Date();
        //conjunto de todas as ofertas de compra.
        var ordemBidsVEF = orderbook["bids"];
        var exchangeVEF = 'SurBitcoin';
        var siglaPais = 'VEN';
        var pais = 'Venezuela';
        var linkExchange = 'https://surbitcoin.com/pt_BR/';
        var codCompra = 'surCodCompra';
        var codVenda = 'surCodVenda';

        var compraTopoMaiorValorVEF = ordemBidsVEF[0][0];
        var compraTopoMaiorValorEmBTCVEF = ordemBidsVEF[0][1];
        var vefBidsBTC = [];
        var vefBidsValor = [];
        var somaBidsBtcVEF = 0;
        for(var i = 0; i < ordemBidsVEF.length; i++){
            vefBidsBTC.push(ordemBidsVEF[i][0]);
            vefBidsValor.push(ordemBidsVEF[i][1]);
            somaBidsBtcVEF += parseFloat(ordemBidsVEF[i][1]);
        }
        var compraTopoMaiorValorVEFBRL = (compraTopoMaiorValorVEF / 1000) * 0.3291;
        var compraTopoMaiorValorVEFUSD = (compraTopoMaiorValorVEF / 1000) * 0.1000;
        var numCompradoresExchange = vefBidsBTC.length;
        var jsonVefMaiorValorCompra = serializarJsonCompra(codCompra, exchangeVEF, compraTopoMaiorValorVEFBRL, compraTopoMaiorValorVEFUSD, compraTopoMaiorValorEmBTCVEF, somaBidsBtcVEF, numCompradoresExchange, siglaPais, pais, linkExchange);
        gExchangesCompra.surbitcoin = jsonVefMaiorValorCompra;

        //conjunto de todas as ofertas de venda
        var ordemAsksVEF = orderbook["asks"];
        var vendaTopoMenorValorVEF = ordemAsksVEF[0][0];
        var vendaTopoMenorValorEmBTCVEF = ordemAsksVEF[0][1];
        var vefAsksBTC = [];
        var vefAsksValor = [];
        var somaAsksBtcVEF = 0;
        for(var i = 0; i < ordemAsksVEF.length; i++){
            vefAsksBTC.push(ordemAsksVEF[i][0]);
            vefAsksValor.push(ordemAsksVEF[i][1]);
            somaAsksBtcVEF += parseFloat(ordemAsksVEF[i][1]);
        }
        var vendaTopoMenorValorVEFBRL = (vendaTopoMenorValorVEF / 1000) * 0.3291;
        var vendaTopoMenorValorVEFUSD = (vendaTopoMenorValorVEF / 1000) * 0.1000;
        var numVendedoresExchange = vefAsksBTC.length;
        var jsonVefMenorValorVenda = serializarJsonVenda(codVenda, exchangeVEF, vendaTopoMenorValorVEFBRL, vendaTopoMenorValorVEFUSD, vendaTopoMenorValorEmBTCVEF, somaAsksBtcVEF, numVendedoresExchange, siglaPais, pais, linkExchange);
        gExchangesVenda.surbitcoin = jsonVefMenorValorVenda;
  }).catch(function(failure){
      console.log(failure);
    });
}

function urdubitOrderbook(){
  setTimeout(vtbcOrderbook, 3000);
  var BlinkTradeUrduBit = new BlinkTradeRest({
      prod: true,
      currency: "PKR",
  });
  BlinkTradeUrduBit.orderbook().then(function(orderbook) {
    orderbook.data = new Date();
        //conjunto de todas as ofertas de compra.
        var ordemBidsPKR = orderbook["bids"];
        var exchangePKR = 'UrduBit';
        var siglaPais = 'PAK';
        var pais = 'Paquistão';
        var linkExchange = 'https://urdubit.com/';
        var codCompra = 'urdCodCompra';
        var codVenda = 'urdCodVenda';

        var compraTopoMaiorValorPKR = ordemBidsPKR[0][0];
        var compraTopoMaiorValorEmBTCPKR = ordemBidsPKR[0][1];
        var pkrBidsBTC = [];
        var pkrBidsValor = [];
        var somaBidsBtcPKR = 0;
        for(var i = 0; i < ordemBidsPKR.length; i++){
            pkrBidsBTC.push(ordemBidsPKR[i][0]);
            pkrBidsValor.push(ordemBidsPKR[i][1]);
            somaBidsBtcPKR += parseFloat(ordemBidsPKR[i][1]);
        }
        var compraTopoMaiorValorPKRBRL = compraTopoMaiorValorPKR * 0.03123;
        var compraTopoMaiorValorPKRUSD = compraTopoMaiorValorPKR * 0.0094877;
        var numCompradoresExchange = pkrBidsBTC.length;
        var jsonPkrMaiorValorCompra = serializarJsonCompra(codCompra, exchangePKR, compraTopoMaiorValorPKRBRL, compraTopoMaiorValorPKRUSD, compraTopoMaiorValorEmBTCPKR, somaBidsBtcPKR, numCompradoresExchange, siglaPais, pais,  linkExchange);
        gExchangesCompra.urdubit = jsonPkrMaiorValorCompra;

        //conjunto de todas as ofertas de venda
        var ordemAsksPKR = orderbook["asks"];
        var vendaTopoMenorValorPKR = ordemAsksPKR[0][0];
        var vendaTopoMenorValorEmBTCPKR = ordemAsksPKR[0][1];
        var pkrAsksBTC = [];
        var pkrAsksValor = [];
        var somaAsksBtcPKR = 0;
        for(var i = 0; i < ordemAsksPKR.length; i++){
            pkrAsksBTC.push(ordemAsksPKR[i][0]);
            pkrAsksValor.push(ordemAsksPKR[i][1]);
            somaAsksBtcPKR += parseFloat(ordemAsksPKR[i][1]);
        }
        var vendaTopoMenorValorPKRBRL = vendaTopoMenorValorPKR * 0.03123;
        var vendaTopoMenorValorPKRUSD = vendaTopoMenorValorPKR * 0.0094877;
        var numVendedoresExchange = pkrAsksBTC.length;
        var jsonPkrMenorValorVenda = serializarJsonVenda(codVenda, exchangePKR, vendaTopoMenorValorPKRBRL, vendaTopoMenorValorPKRUSD, vendaTopoMenorValorEmBTCPKR, somaAsksBtcPKR, numVendedoresExchange, siglaPais, pais,  linkExchange);
        gExchangesVenda.urdubit = jsonPkrMenorValorVenda;
  }).catch(function(failure){
      console.log(failure);
    });
}

function vtbcOrderbook(){
  setTimeout(foxBitOrderBook, 3000);
  var BlinkTradeVTBC = new BlinkTradeRest({
      prod: true,
      currency: "VND",
  });
  BlinkTradeVTBC.orderbook().then(function(orderbook) {
    orderbook.data = new Date();
        //conjunto de todas as ofertas de compra.
        var ordemBidsVND = orderbook["bids"];
        var exchangeVND = 'VBTC';
        var siglaPais = 'VNM';
        var pais = 'Vietnã';
        var linkExchange = 'https://vbtc.exchange/pt_BR/';
        var codCompra = 'vtbCodCompra';
        var codVenda = 'vtbCodVenda';

        var compraTopoMaiorValorVND = ordemBidsVND[0][0];
        var compraTopoMaiorValorEmBTCVND = ordemBidsVND[0][1];
        var vndBidsBTC = [];
        var vndBidsValor = [];
        var somaBidsBtcVND = 0;
        for(var i = 0; i < ordemBidsVND.length; i++){
            vndBidsBTC.push(ordemBidsVND[i][0]);
            vndBidsValor.push(ordemBidsVND[i][1]);
            somaBidsBtcVND += parseFloat(ordemBidsVND[i][1]);
        }
        var compraTopoMaiorValorVNDBRL = compraTopoMaiorValorVND * 0.0001449;
        var compraTopoMaiorValorVNDUSD = compraTopoMaiorValorVND * 0.000044;
        var numCompradoresExchange = vndBidsBTC.length;
        var jsonVndMaiorValorCompra = serializarJsonCompra(codCompra, exchangeVND, compraTopoMaiorValorVNDBRL, compraTopoMaiorValorVNDUSD, compraTopoMaiorValorEmBTCVND, somaBidsBtcVND, numCompradoresExchange, siglaPais, pais,linkExchange);
        gExchangesCompra.vbtc = jsonVndMaiorValorCompra;

        //conjunto de todas as ofertas de venda
        var ordemAsksVND = orderbook["asks"];
        var vendaTopoMenorValorVND = ordemAsksVND[0][0];
        var vendaTopoMenorValorEmBTCVND = ordemAsksVND[0][1];
        var vndAsksBTC = [];
        var vndAsksValor = [];
        var somaAsksBtcVND = 0;
        for(var i = 0; i < ordemAsksVND.length; i++){
            vndAsksBTC.push(ordemAsksVND[i][0]);
            vndAsksValor.push(ordemAsksVND[i][1]);
            somaAsksBtcVND += parseFloat(ordemAsksVND[i][1]);
        }
        vendaTopoMenorValorVNDBRL = vendaTopoMenorValorVND * 0.0001449;
        vendaTopoMenorValorVNDUSD = vendaTopoMenorValorVND * 0.000044;
        var numVendedoresExchange = vndAsksBTC.length;
        var jsonVndMenorValorVenda = serializarJsonVenda(codVenda, exchangeVND,vendaTopoMenorValorVNDBRL, vendaTopoMenorValorVNDUSD, vendaTopoMenorValorEmBTCVND, somaAsksBtcVND, numVendedoresExchange, siglaPais, pais, linkExchange);
        gExchangesVenda.vbtc = jsonVndMenorValorVenda;
  }).catch(function(failure){
      console.log(failure);
    });
}

function bittrexOrderbok(){
  var HOST = 'bittrex.com';
  var ENDPOINT = '/api/v1.1/public/getorderbook?market=USDT-BTC&type=both';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();
    
    //conj de todas as ofertas de compra
    var ordemBids = orderbook.result.buy;
    var exchange = 'Bittrex';
    var siglaPais = 'USA';
    var pais = 'Estados Unidos';
    var linkExchange = 'https://bittrex.com/';
    var codCompra = 'bitCodCompra';
    var codVenda = 'bitCodVenda';

    var compraTopoMaiorValor = ordemBids[0].Rate;
    var compraTopoMaiorValorEmBTC = ordemBids[0].Quantity;
    var somaBidsBtc = 0;
    var bidsValor = [];
    var bidsBTC = [];
    for(var j = 0; j < ordemBids.length; j++){
        bidsValor.push(ordemBids[j].Quantity);
        bidsBTC.push(ordemBids[j].Rate);
        somaBidsBtc += parseFloat(ordemBids[j].Rate);
    }

    var compraTopoMaiorValorBRL =  compraTopoMaiorValor * 3.2920001;
    var numCompradoresExchange = bidsValor.length;
    var jsonBittrexMaiorValorCompra = serializarJsonCompra(codCompra, exchange, compraTopoMaiorValorBRL, compraTopoMaiorValor, compraTopoMaiorValorEmBTC, somaBidsBtc, numCompradoresExchange, siglaPais, pais,linkExchange);
    gExchangesCompra.bittrex = jsonBittrexMaiorValorCompra;

    //conjunto de todas as ofertas de venda
    var ordemAsks = orderbook.result.sell;
    var vendaTopoMenorValor = ordemAsks[0].Rate;
    var vendaTopoMenorValorEmBTC = ordemAsks[0].Quantity;
    var somaAsksBtc = 0;
    var asksValor = [];
    var asksBTC = [];
    for(var j = 0; j < ordemAsks.length; j++){
        asksValor.push(ordemAsks[j].Quantity);
        asksBTC.push(ordemAsks[j].Rate);
        somaAsksBtc += parseFloat(ordemAsks[j][1]);
    }
    var vendaTopoMenorValorBRL =  vendaTopoMenorValor * 3.2920001;
    var numVendedoresExchange = asksValor.length;
    var jsonMercadoBitcoinMenorValorVenda = serializarJsonVenda(codVenda, exchange, vendaTopoMenorValorBRL, vendaTopoMenorValor, vendaTopoMenorValorEmBTC, somaAsksBtc, numVendedoresExchange, siglaPais, pais, linkExchange);
    gExchangesVenda.bittrex = jsonMercadoBitcoinMenorValorVenda;

  });
}


function bitstampOrderbok(){
  var HOST = 'www.bitstamp.net'; //se tirar o www não funciona
  var ENDPOINT = '/api/order_book/';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();

    //conj de todas as ofertas de compra
    var ordemBids = orderbook.bids;
    var exchange = 'Bitstamp';
    var siglaPais = 'USA';
    var pais = 'Estados Unidos';
    var linkExchange = 'https://www.bitstamp.net/';
    var codCompra = 'btsCodCompra';
    var codVenda = 'btsCodVenda';

    var compraTopoMaiorValor = ordemBids[0][0];
    var compraTopoMaiorValorEmBTC = ordemBids[0][1];
    var somaBidsBtc = 0;
    var bidsValor = [];
    var bidsBTC = [];
    for(var j = 0; j < ordemBids.length; j++){
        bidsValor.push(ordemBids[j][0]);
        bidsBTC.push(ordemBids[j][1]);
        somaBidsBtc += parseFloat(ordemBids[j][1]);
    }
    var compraTopoMaiorValorBRL =  compraTopoMaiorValor * 3.2920001;
    var numCompradoresExchange = bidsValor.length;
    var jsonbitstampMaiorValorCompra = serializarJsonCompra(codCompra, exchange, compraTopoMaiorValorBRL, compraTopoMaiorValor, compraTopoMaiorValorEmBTC, somaBidsBtc, numCompradoresExchange, siglaPais, pais, linkExchange);
    gExchangesCompra.bitstamp = jsonbitstampMaiorValorCompra;

    //conjunto de todas as ofertas de venda
    var ordemAsks = orderbook.asks;
    var vendaTopoMenorValor = ordemAsks[0][0];
    var vendaTopoMenorValorEmBTC = ordemAsks[0][1];
    var somaAsksBtc = 0;
    var asksValor = [];
    var asksBTC = [];
    for(var j = 0; j < ordemAsks.length; j++){
        asksValor.push(ordemAsks[j][0]);
        asksBTC.push(ordemAsks[j][1]);
        somaAsksBtc += parseFloat(ordemAsks[j][1]);
    }
    var vendaTopoMenorValorBRL =  vendaTopoMenorValor * 3.2920001;
    var numVendedoresExchange = asksValor.length;
    var jsonMercadoBitcoinMenorValorVenda = serializarJsonVenda(codVenda, exchange, vendaTopoMenorValorBRL, vendaTopoMenorValor, vendaTopoMenorValorEmBTC, somaAsksBtc, numVendedoresExchange, siglaPais, pais,  linkExchange);
    gExchangesVenda.bitstamp = jsonMercadoBitcoinMenorValorVenda;

  });
}

function bitfinexOrderbok(){

  var HOST = 'api.bitfinex.com';
  var ENDPOINT = '/v1/book/BTCUSD';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();

    //conj de todas as ofertas de compra
    var ordemBids = orderbook.bids;
    var exchange = 'Bitfinex';
    var siglaPais = 'USA';
    var pais = 'Estados Unidos';
    var linkExchange = 'https://www.bitfinex.com/';
    var codCompra = 'btfCodCompra';
    var codVenda = 'btfCodVenda';

    var compraTopoMaiorValor = ordemBids[0].price;
    var compraTopoMaiorValorEmBTC = ordemBids[0].amount;
    var somaBidsBtc = 0;
    var bidsValor = [];
    var bidsBTC = [];
    for(var j = 0; j < ordemBids.length; j++){
        bidsValor.push(ordemBids[j].price);
        bidsBTC.push(ordemBids[j].amount);
        somaBidsBtc += parseFloat(ordemBids[j].amount);
    }
    var compraTopoMaiorValorBRL =  compraTopoMaiorValor * 3.2920001;
    var numCompradoresExchange = bidsValor.length;
    var jsonbitstampMaiorValorCompra = serializarJsonCompra(codCompra, exchange, compraTopoMaiorValorBRL, compraTopoMaiorValor, compraTopoMaiorValorEmBTC, somaBidsBtc, numCompradoresExchange + '/25', siglaPais, pais, linkExchange);
    gExchangesCompra.bitfinex = jsonbitstampMaiorValorCompra;

    //conjunto de todas as ofertas de venda
    var ordemAsks = orderbook.asks;
    var vendaTopoMenorValor = ordemAsks[0].price;
    var vendaTopoMenorValorEmBTC = ordemAsks[0].amount;
    var somaAsksBtc = 0;
    var asksValor = [];
    var asksBTC = [];
    for(var j = 0; j < ordemAsks.length; j++){
        asksValor.push(ordemAsks[j].price);
        asksBTC.push(ordemAsks[j].amount);
        somaAsksBtc += parseFloat(ordemAsks[j].amount);
    }
    var vendaTopoMenorValorBRL =  vendaTopoMenorValor * 3.2920001;
    var numVendedoresExchange = asksValor.length;
    var jsonMercadoBitcoinMenorValorVenda = serializarJsonVenda(codVenda, exchange, vendaTopoMenorValorBRL, vendaTopoMenorValor, vendaTopoMenorValorEmBTC, somaAsksBtc, numVendedoresExchange + '/25', siglaPais, pais, linkExchange);
    gExchangesVenda.bitfinex = jsonMercadoBitcoinMenorValorVenda;
  });

}

function cexOrderbok(){
  var HOST = 'cex.io';
  var ENDPOINT = '/api/order_book/BTC/USD';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();

       //conj de todas as ofertas de compra
    var ordemBids = orderbook.bids;
    var exchange = 'CEX';
    var siglaPais = 'ENG';
    var pais = "Inglaterra";
    var linkExchange = 'https://cex.io/';
    var codCompra = 'cexCodCompra';
    var codVenda = 'cexCodVenda';

    var compraTopoMaiorValor = ordemBids[0][0];
    var compraTopoMaiorValorEmBTC = ordemBids[0][1];
    var somaBidsBtc = 0;
    var bidsValor = [];
    var bidsBTC = [];
    for(var j = 0; j < ordemBids.length; j++){
        bidsValor.push(ordemBids[j][0]);
        bidsBTC.push(ordemBids[j][1]);
        somaBidsBtc += parseFloat(ordemBids[j][1]);
    }
    var compraTopoMaiorValorBRL =  compraTopoMaiorValor * 3.2920001;
    var numCompradoresExchange = bidsValor.length;
    var jsonbitstampMaiorValorCompra = serializarJsonCompra(codCompra, exchange, compraTopoMaiorValorBRL, compraTopoMaiorValor, compraTopoMaiorValorEmBTC, somaBidsBtc, numCompradoresExchange, siglaPais, pais, linkExchange);
    gExchangesCompra.cex = jsonbitstampMaiorValorCompra;

    //conjunto de todas as ofertas de venda
    var ordemAsks = orderbook.asks;
    var vendaTopoMenorValor = ordemAsks[0][0];
    var vendaTopoMenorValorEmBTC = ordemAsks[0][1];
    var somaAsksBtc = 0;
    var asksValor = [];
    var asksBTC = [];
    for(var j = 0; j < ordemAsks.length; j++){
        asksValor.push(ordemAsks[j][0]);
        asksBTC.push(ordemAsks[j][1]);
        somaAsksBtc += parseFloat(ordemAsks[j][1]);
    }
    var vendaTopoMenorValorBRL =  vendaTopoMenorValor * 3.2920001;
    var numVendedoresExchange = asksValor.length;
    var jsonMercadoBitcoinMenorValorVenda = serializarJsonVenda(codVenda, exchange, vendaTopoMenorValorBRL, vendaTopoMenorValor, vendaTopoMenorValorEmBTC, somaAsksBtc, numVendedoresExchange, siglaPais, pais, linkExchange);
    gExchangesVenda.cex = jsonMercadoBitcoinMenorValorVenda;

  });
}

/*bitcoinToYouOrderbok();
function bitcoinToYouOrderbok(){
  var HOST = 'www.bitcointoyou.com';
  var ENDPOINT = '/API/orderbook.aspx';
  performRequest(HOST, ENDPOINT, 'GET', function (orderbook) {
    orderbook.data = new Date();

    console.log(orderbook);

  });
}*/

//------------------------------------------------------------------------------

function serializarJsonCompra(
                              cod,
                              exchange,
                              maiorCompraValor,
                              maiorCompraValorUSD,
                              maiorCompraBTC,
                              volComprarExchange,
                              numCompradoresExchange,
                              siglaPais,
                              pais,
                              linkExchange){
   maiorCompraValor = (typeof maiorCompraValor !== 'undefined') ? maiorCompraValor : 0;
    return {
              'codCompra' : cod,
              'exchange': exchange,
              'maiorCompraValor': maiorCompraValor,
              'maiorCompraValorUSD': maiorCompraValorUSD,
              'maiorCompraBTC':maiorCompraBTC,
              'volComprarExchange': volComprarExchange,
              'numCompradoresExchange': numCompradoresExchange,
              'siglaPais':siglaPais,
              'pais': pais,
              'linkExchange': linkExchange,
            };
}
function serializarJsonVenda(
                             cod,
                             exchange,
                             menorVendaValor,
                             menorVendaValorUSD,
                             menorVendaBTC,
                             volVendaExchange,
                             numVendedoresExchange,
                             siglaPais,
                             pais,
                             linkExchange){
  return {
              'codVenda' : cod,
              'exchange': exchange,
              'menorVendaValor': menorVendaValor,
              'menorVendaValorUSD': menorVendaValorUSD,
              'menorVendaBTC':menorVendaBTC,
              'volVendaExchange': volVendaExchange,
              'numVendedoresExchange': numVendedoresExchange,
              'siglaPais': siglaPais,
              'pais' : pais,
              'linkExchange': linkExchange,
          };
}

function performRequestJsonDirect(host, endpoint, method, success) {
  var headers = {};
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function (res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function (data) {
      responseString += data;
    });

    res.on('end', function () {
      if(responseString) {
        try {
          success(responseString);
        } catch(e) {
            console.log("Erro na variável responseString" + e);
        }
      }
    });
  });

  // enviar algo
  // req.write(dataString);
  req.end();
}

function performRequest(host, endpoint, method, success) {

  var headers = {};
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

var req = https.request(options, function (res) {
  res.setEncoding('utf-8');
  var responseString = '';
  res.on('data', function (data) {
    responseString += data;
  });
  res.on('end', function () {
    if(responseString) {
      try {
          var responseObject = JSON.parse(responseString);
          success(responseObject);
      } catch(e) {
          console.log("Erro ao transformar String em JSON" + e);
      }
    }
  });
});

req.end();

}

