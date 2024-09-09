COLDIGO.marca = new Object();

$(document).ready(function(){
	
	COLDIGO.marca.cadastrarMarca = function() {
		
		var novaMarca = new Object();
		novaMarca.nome = document.frmAddMarca.novaMarca.value;
		
		if(novaMarca.nome == "") {
			COLDIGO.exibirAviso("Preencha todos o campo de busca!");
		} else {
			$.ajax({
			type: "POST",
			url: COLDIGO.PATH + "marca/inserir",
			data:JSON.stringify(novaMarca),
			success: function (msg) {
				COLDIGO.exibirAviso(msg);
				$("#addMarca").trigger("reset");
				COLDIGO.marca.buscar();
			},
			error: function (error) {
				COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca: "+ error.status + " - "+ error.statusText);
			}
		})
			
		} 
		
	}
	
	COLDIGO.marca.buscar = function() {
		
		var valorBusca = $("#campoBuscaMarca").val();
		
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			data:"valorBusca="+valorBusca,
			success: function (dados) {
				
				$("#listaMarcas").html(COLDIGO.marca.exibir(dados));
				
			},
			error: function (error) {
				COLDIGO.exibirAviso("Erro ao consultar as marcas: "+ error.status + " - "+ error.statusText);
			}
		}); 
		
		
	};
		
	COLDIGO.marca.exibir = function(listaDeMarcas) {
		var tabela = "<table>"+
		"<tr>"+
		"<th>Nome</th>"+
		"<th></th>"+
		"<th class='acoes''>Ações</th>"+
		"</tr>";
		
		if(listaDeMarcas != undefined && listaDeMarcas.length > 0){
			
			for(var i = 0; i<listaDeMarcas.length; i++){
				tabela += "<tr>" +
						"<td>"+listaDeMarcas[i].nome+"</td>" +  
						"<td></td>" +
						"<td>"+
							"<a onclick=\"COLDIGO.marca.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar'></a>"+
							"<a onclick=\"COLDIGO.marca.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir'></a>"+
						"</td>"+
						"</tr>";
			}
			
			
		} else if(listaDeMarcas == "") {
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>"; 
		}
		tabela += "</table>";
		return tabela;
	};
	
	COLDIGO.marca.buscar();
	
	COLDIGO.marca.excluir = function(id) {
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "marca/excluir/"+id,
			success: function (msg) {
				
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				
			},
			error: function (error) {
				COLDIGO.exibirAviso("Erro ao excluir a marca: "+ error.status + " - "+ error.statusText);
			}
		}); 
	};
	
	COLDIGO.marca.exibirEdicao = function(id){
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
							
				document.frmEditaMarca.novaMarca.value = marca.nome;
				
				var modalEditaMarca = {
					title: "Editar Marca",
					height: 400,
					width: 550,
					modal: true,
					buttons:{
						"Salvar": function(){
							COLDIGO.marca.editar(id);
						},
						"Cancelar": function(){
							$(this).dialog("close");
						}
					},
					close: function(){
						//caso o usuario simplesmente feche a caixa de edição
						//não deve acontecer nada
					}
				};
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
				
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marcas para edição: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	COLDIGO.marca.editar = function(id){
		
		var marca = new Object();
		marca.nome = document.frmEditaMarca.novaMarca.value;
				
		$.ajax({
			type: "PUT",
			url: `${COLDIGO.PATH}marca/alterar/${id}`,
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marcas: " + info.status + " - " + info.statusText);
			}
		});
	}	
});