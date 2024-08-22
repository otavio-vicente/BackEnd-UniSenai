COLDIGO.produto = new Object();

$(document).ready(function(){
	//Carrega as marcas registradas no BD no select do formulário de inserir
	COLDIGO.produto.carregarMarcas = function(){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscar",
			success: function(marcas){
				
				console.log("Teste de marcas " + marcas);
				if(marcas!=""){
					
					$("#selMarca").html("");
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Escolha");
					$("#selMarca").append(option);
					
					for(var i=0; i<marcas.length; i++){
						var option = document.createElement("option");
						option.setAttribute("value", marcas[i].id);
						option.innerHTML = (marcas[i].nome);
						$("#selMarca").append(option);

					}
					
				} else {
					
					$("#selMarca").html("");
					
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Cadastre um marca primeiro!");
					$("#selMarca").append(option);
					$("#selMarca").addClass(aviso);
					
				}
				
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
				
				$("#selMarca").html("");
				var option = document.createElement("option");
				option.setAttribute ("value", "");
				option.innerHTML = ("Erro ao carregar marcas!");
				$("#selMarca").append(option);
				$("#selMarca").addClass(aviso);
			}
		});
	}
	COLDIGO.produto.carregarMarcas();
	
	//Cadastra no BD o produto informado
	COLDIGO.produto.cadastrar = function() {
		
		var produto = new Object();
		produto.categoria = document.frmAddProduto.categoria.value;
		produto.marcaId = document.frmAddProduto.marcaId.value;
		produto.modelo = document.frmAddProduto.modelo.value;
		produto.capacidade = document.frmAddProduto.capacidade.value;
		produto.valor = document.frmAddProduto.valor.value;
		
		if((produto.categoria == "") || (produto.marcaId == "") || (produto.modelo == "") || (produto.capacidade == "") 
		|| (produto.valor == "")) {
			COLDIGO.exibirAviso("Preencha todos os campos!");
		} else {
			$.ajax({
			type: "POST",
			url: COLDIGO.PATH + "produto/inserir",
			data:JSON.stringify(produto),
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
	
	//Busca no BD e exibe na página os produtos que atendam à solicitação do usuário
	COLDIGO.produto.buscar = function(){
		var valorBusca = $("#campoBuscaProduto").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "produto/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				
				$("#listaProdutos").html(COLDIGO.produto.exibir(dados));
								
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: " + info.status + " - " + info.statusText);
			}
		});
	};
	
	//Transforma os dados dos produtos recebidos do servidor em uma tabela HTML
	COLDIGO.produto.exibir = function(listaDeProdutos) {
		var tabela = "<table>" +
		"<tr>" +
		"<th>Categoria</th>" +
		"<th>Marca</th>" +
		"<th>Modelo</th>" +
		"<th>Cap.(1)</th>" +
		"<th>Valor</th>" +
		"<th class='acoes'>Ações</th>" +
		"</tr>";
		
		if(listaDeProdutos != undefined && listaDeProdutos.length > 0){
			
			for(var i=0; i<listaDeProdutos.length; i++){
				tabela += "<tr>" +
				"<td>"+listaDeProdutos[i].categoria+"</td>" +
				"<td>"+listaDeProdutos[i].marcaNome+"</td>" +
				"<td>"+listaDeProdutos[i].modelo+"</td>" +
				"<td>"+listaDeProdutos[i].capacidade+"</td>" +
				"<td>R$ "+COLDIGO.formatarDinheiro(listaDeProdutos[i].valor)+"</td>" +
				"<td>" +
					"<a><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
					"<a onclick=\"COLDIGO.produto.excluir('"+listaDeProdutos[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
				"</td>" +
				"</tr>"					
			}
			
		} else if(listaDeProdutos == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</table>";
		
		return tabela;		
	};
	
	//Executa a função de busca ao carregar a página
	COLDIGO.produto.buscar();
	
	//Exclui o produto selecionado
	COLDIGO.produto.excluir = function(id) {
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "produto/excluir/"+id,
			success: function (msg) {
				
				COLDIGO.exibirAviso(msg);
				COLDIGO.produto.buscar();
				
			},
			error: function (error) {
				COLDIGO.exibirAviso("Erro ao excluir o produtos: "+ error.status + " - "+ error.statusText);
			}
		}); 
	};
});