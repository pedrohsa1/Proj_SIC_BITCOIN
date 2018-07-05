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



	});
});