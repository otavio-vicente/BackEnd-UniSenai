COLDIGO.produto = new Object();

$(document).ready(function(){
	//Carrega as marcas registradas no BD no select do formulário de inserir
	COLDIGO.produto.carregarMarcas = function(){
		
		$.ajax({
			type: "GET",
			url: "/ProjetoTrilhaWeb/rest/marca/buscar",
			sucess: function(){
			},
			error: function(){
			}
		});
	}
})