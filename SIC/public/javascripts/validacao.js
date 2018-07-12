$(function(){
	$('.form-novoproduto form').form({
		nome:{
			identifier : 'nome',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um nome'
				}
			]
		},

		endereco:{
			identifier : 'endereco',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um endereco'
				}
			]
		},

		telefone:{
			identifier : 'telefone',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um telefone'
				}
			]
		},

		email:{
			identifier : 'email',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um email valido'
				}
			]
		},

		qtd_bitcoin:{
			identifier : 'qtd_bitcoin',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um qtd_bitcoin'
				},
				{
					type: 'number',
					prompt: 'Essa quantidade deve ser numérico'
				}
			]
		},

		exchange_invest:{
			identifier : 'exchange_invest',
			rules : [
				{
					type:'empty',
					prompt: 'Por favor digite um Exchange Investimento'
				}
			]
		},

	});
});