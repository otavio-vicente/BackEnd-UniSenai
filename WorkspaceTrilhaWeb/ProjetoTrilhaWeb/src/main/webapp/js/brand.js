COLDIGO.marca = new Object();

$(document).ready(function(){
	
	COLDIGO.marca.cadastrarMarca = function() {
		
		var novaMarca = new Object();
		novaMarca.nome = document.frmAddMarca.novaMarca.value;
		
		if(novaMarca.nome == "") {
			COLDIGO.exibirAviso("Preencha todos os campos!");
		} else {
			$.ajax({
			type: "POST",
			url: COLDIGO.PATH + "marca/inserir",
			data:JSON.stringify(novaMarca),
			success: function (msg) {
				COLDIGO.exibirAviso(msg);
				$("#addProduto").trigger("reset");
			},
			error: function (error) {
				COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: "+ error.status + " - "+ error.statusText);
			}
		})
			
		} 
		
	}
	
	COLDIGO.marca.buscar = function(){
		var valorBusca = $("#campoBuscaMarca").val();
	
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				
				$("#listaMarcas").html(COLDIGO.produto.exibir(dados));
								
			},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao consultar as marcas: " + info.status + " - " + info.statusText);
				}
		});
	};
	
	
		
	
	
	

	
		
});