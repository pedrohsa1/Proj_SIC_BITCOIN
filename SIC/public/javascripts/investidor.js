$(function(){
	$('#tbl-investidor tbody td #btn-apagar').click(function(event) {
		var elemento = $(this);
		var id = elemento.parent().parent().find('#id-investidor').text();
		var confirmar = confirm('Deseja apagar o investidor?');
		if(confirmar){
			$.ajax({
				url:"http://localhost:3000/apagarInvestidor",
				method:'post',
				data:{id : id},
				success : function(res){
					//console.log(res);
					if(res.res){
						elemento.parent().parent().remove();
					}
				}
			});
		}
	});
});