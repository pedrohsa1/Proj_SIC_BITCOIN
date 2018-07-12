var mysql = require('mysql');

module.exports = {
	getDicas: function(req, res, next){
		return res.render('dicas');
	},
	getEstatisticas: function(req, res, next){
		return res.render('estatisticas');
	},
	getInvestidores: function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		
		var investidores = null;

		db.query('SELECT * FROM investidor', function(err,rows, fields){
			if(err){
                res.send(err);
                return;
			}
			//console.log(rows);
			investidores = rows;

			res.render('investidor', {listaInvestidores : investidores});
		});
	},

	/*	var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		var usuarios = null;

		db.query('SELECT id, usuario, email, nome, sobrenome, pais, habilit_2FA, administrador  FROM users', function(err, rows, fields){
			if(err) throw err;
			usuarios = rows;
			db.end();
			res.json(usuarios);
		});
	*/

	getNovoInvestidor : function(req,res,next){
		res.render('novo');
	},
	postNovoInvestidor : function(req,res,next){
		var investidor = {
			nome : req.body.nome,
			endereco : req.body.endereco,
			telefone : req.body.telefone,
			email : req.body.email,
			qtd_bitcoin : req.body.qtd_bitcoin,
			exchange_invest : req.body.exchange_invest,
		};
		console.log(investidor);

		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO investidor SET ?', investidor, function(err, rows, fields){
			if(err){
                console.log(err)
			}
			console.log('Investidor Inserido com sucesso!');
			db.end();
		});
		res.render('novo', {info: 'Investidor inserido corretamente!'});
	},

	apagarInvestidor : function(req, res, next){
		var id = req.body.id;
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var resposta = {res: true};
		db.query('DELETE FROM investidor WHERE  id = ?', id, function(err, rows, fields){
			if(err){
				throw err;
				resposta = {res: false}
			}
			db.end();
			resposta = {res}
			resposta.res = true;

			res.json(resposta);
		});
	},

	getModificarInvestidor : function(req, res, next){
		var id = req.params.id;
		var config = require('.././database/config');
		console.log(id);

		var db = mysql.createConnection(config);
		db.connect();

		var investidor = null;

		db.query('SELECT * FROM  investidores WHERE id = ?', id, function(err, rows, fields){
			investidor = rows;
			db.end()

			ren.render('modificar', {investidorSelecionado : investidor});
		});
	},

	postModificarInvestidor : function (req,res, next){
		var investidor = {
			nome : req.body.nome,
			endereco : req.body.endereco,
			telefone : req.body.telefone,
			email : req.body.email,
			qtd_bitcoin : req.body.qtd_bitcoin,
			exchange_invest : req.body.exchange_invest,
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE investidores SET ? WHERE ?', [investidor, {id: req.body.id}], function(err, rows, fields){
			db.end();
		});

		res.redirect('/investidor')
	}
}