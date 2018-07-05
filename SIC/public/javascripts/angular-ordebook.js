function getNodeHost() {
    var port = ":3000";
    return window.location.protocol + "//" + window.location.hostname + port +  "/api";
    //return window.location.protocol + "//" + window.location.hostname +  "/api";
};

var app = angular.module("bitcoinAnalise", []);
app.controller("bitcoinAnaliseController", function ($scope, $http, $interval){

$scope.checkedAtivadoOfertaCompra = {};
var objDesativarSelecionadosCompra = $scope.checkedAtivadoOfertaCompra;

$scope.checkedAtivadoOfertaVenda = {};
var objDesativarSelecionadosVenda = $scope.checkedAtivadoOfertaVenda

$scope.selectValorVenda = 0;
$scope.selectValorCompra = 0;
$scope.margemDiferenca = 0;

$scope.selectExchangeVenda = function(valor){
  $scope.selectValorVenda = valor.menorVendaValor;
  $scope.exchangeVenda = valor.exchange;

};
$scope.selectExchangeCompra = function(valor){
  $scope.selectValorCompra = valor.maiorCompraValor;
  $scope.exchangeCompra = " / " + valor.exchange;
};

var listaMaiorOfertasDeCompra = {};

var exchangeMaiorOfertaDeCompra = {};
var mediaMelhoresOfertaDeCompra = 0;

var listaMenorOfertasDeVenda = {};

var exchangeMenorOfertaDeVenda = {};
var mediaMelhoresOfertaDeCVenda = 0;

var diferencaCompraEVenda = 0;
var percentualCompraEVenda = 0;


$interval(function(){
  listaCompra();
  listaVenda();
  estatisticasCompraEVenda();
},2000);

var tempObjCompra;
function listaCompra(){
  $http.get(getNodeHost() + "/lista/exchanges/maioresOfertasDeCompra").then(function(response){
      mediaMelhoresOfertaDeCompra = 0;
      listaMaiorOfertasDeCompra = response.data;
      var cont = 1;
      var contDesativos = 1;

      var tempMaiorValor = 0;

      for(var objeto in listaMaiorOfertasDeCompra){
        for (var exchangeSelecinada in objDesativarSelecionadosCompra) {
          if(exchangeSelecinada === listaMaiorOfertasDeCompra[objeto].codCompra  && objDesativarSelecionadosCompra[exchangeSelecinada] === true)
          {
            listaMaiorOfertasDeCompra[objeto].maiorCompraValor = 0;
            listaMaiorOfertasDeCompra[objeto].maiorCompraValorUSD = 0;
            listaMaiorOfertasDeCompra[objeto].maiorCompraBTC = 0;
            listaMaiorOfertasDeCompra[objeto].volComprarExchange = 0;
            listaMaiorOfertasDeCompra[objeto].numCompradoresExchange = 0;
            contDesativos++;
          }
        }
      }

      for(var objeto in listaMaiorOfertasDeCompra){
        cont++;
        if(listaMaiorOfertasDeCompra.hasOwnProperty(objeto)){
          if(listaMaiorOfertasDeCompra[objeto].maiorCompraValor > tempMaiorValor){
              tempMaiorValor = listaMaiorOfertasDeCompra[objeto].maiorCompraValor;
              exchangeMaiorOfertaDeCompra = listaMaiorOfertasDeCompra[objeto];
              tempObjCompra = objeto;
          }
          mediaMelhoresOfertaDeCompra += listaMaiorOfertasDeCompra[objeto].maiorCompraValor;
        }
      }

      listaMaiorOfertasDeCompra[tempObjCompra].iconRanking = true;
      mediaMelhoresOfertaDeCompra = mediaMelhoresOfertaDeCompra / (cont - contDesativos);
  });
}
var tempObjVenda;
function listaVenda(){
  $http.get(getNodeHost() + "/lista/exchanges/menoresOfertasDeVenda").then(function(response){
    var cont = 1;
    mediaMelhoresOfertaDeCVenda = 0;
    listaMenorOfertasDeVenda = response.data;

    var tempMenorValor = 100000000;

    var contDesativos = 1;
    for(var objeto in listaMenorOfertasDeVenda){
      for (var exchangeSelecinada in objDesativarSelecionadosVenda) {
        if(exchangeSelecinada === listaMenorOfertasDeVenda[objeto].codVenda  && objDesativarSelecionadosVenda[exchangeSelecinada] === true)
        {
          listaMenorOfertasDeVenda[objeto].menorVendaValor = 0;
          listaMenorOfertasDeVenda[objeto].menorVendaValorUSD = 0;
          listaMenorOfertasDeVenda[objeto].menorVendaBTC = 0;
          listaMenorOfertasDeVenda[objeto].volVendaExchange = 0;
          listaMenorOfertasDeVenda[objeto].numVendedoresExchange = 0;
          contDesativos++;
        }
      }
    }

    for(var objeto in listaMenorOfertasDeVenda){
      cont++;
      if(listaMenorOfertasDeVenda.hasOwnProperty(objeto)){
        if(listaMenorOfertasDeVenda[objeto].menorVendaValor < tempMenorValor && listaMenorOfertasDeVenda[objeto].menorVendaValor != 0){
          tempMenorValor = listaMenorOfertasDeVenda[objeto].menorVendaValor;
          exchangeMenorOfertaDeVenda = listaMenorOfertasDeVenda[objeto];
          tempObjVenda = objeto;
        }
        mediaMelhoresOfertaDeCVenda += listaMenorOfertasDeVenda[objeto].menorVendaValor;
      }
    }

    listaMenorOfertasDeVenda[tempObjVenda].iconRanking = true;
    mediaMelhoresOfertaDeCVenda = mediaMelhoresOfertaDeCVenda / (cont - contDesativos);
  });
}

function estatisticasCompraEVenda(){
  percentualCompraEVenda = 0;


  $scope.ordemExchangesCompra = listaMaiorOfertasDeCompra;
  $scope.exchangeMaiorOfertaDeCompra = exchangeMaiorOfertaDeCompra;

  $scope.ordemExchangesVenda = listaMenorOfertasDeVenda;
  $scope.exchangeMenorOfertaDeVenda = exchangeMenorOfertaDeVenda;

  diferencaCompraEVenda = exchangeMaiorOfertaDeCompra.maiorCompraValor - exchangeMenorOfertaDeVenda.menorVendaValor;
  $scope.diferencaCompraEVenda = diferencaCompraEVenda;

  percentualCompraEVenda = (diferencaCompraEVenda * 100) / exchangeMenorOfertaDeVenda.menorVendaValor;
  $scope.percentualCompraEVenda = percentualCompraEVenda;

  $scope.mediaMelhoresOfertaDeCVenda = mediaMelhoresOfertaDeCVenda;
  $scope.mediaMelhoresOfertaDeCompra = mediaMelhoresOfertaDeCompra;

  if(exchangeMenorOfertaDeVenda.menorVendaValor === exchangeMaiorOfertaDeCompra.maiorCompraValor){
    $scope.valorVendaMaiorValorCompra = false;
    $scope.msgMelhorNegocio = "No momento não é viável comprar e vender em Exchanges diferentes.";
  }else if(exchangeMaiorOfertaDeCompra.maiorCompraValor > exchangeMenorOfertaDeVenda.menorVendaValor){
    $scope.valorVendaMaiorValorCompra = true;
    $scope.msgMelhorNegocio = {comprar : exchangeMenorOfertaDeVenda.exchange, vender : exchangeMaiorOfertaDeCompra.exchange, diferenca : diferencaCompraEVenda,  porcentagem :  parseFloat(percentualCompraEVenda.toFixed(2))}
  }

  drawChart(listaMaiorOfertasDeCompra, listaMenorOfertasDeVenda);
}

});

google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(listaCompra, listaVenda) {

  var chartData = preparaDados(listaCompra, listaVenda);

  console.log(chartData);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Exchange');
  data.addColumn('number', 'Comprar');
  data.addColumn('number', 'Vender');
  data.addRows(chartData);

var view = new google.visualization.DataView(data);
view.setColumns([0, 1,
                 { calc: "stringify",
                   sourceColumn: 1,
                   type: "string",
                   role: "annotation" },
                 2]);

var options = {
  title: 'Compra e Venda por Exchange',
  bar: {groupWidth: "30%"},
  legend: { position: "1%" },
 };
var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
chart.draw(view, options);
}

//prepara os dados dinamicamente para carregar no grafico
function preparaDados(dados1, dados2){

  var chartData = [];

  for(var objeto in dados1){
    var temp = [dados1[objeto].exchange,
                parseInt(dados2[objeto].menorVendaValor),
                parseInt(dados1[objeto].maiorCompraValor)
                ];
    chartData.push(temp);
  }
  return chartData;
}