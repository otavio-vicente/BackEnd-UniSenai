package br.com.coldigogeladeiras.rest;

import java.sql.Connection;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCProdutoDAO;
import br.com.coldigogeladeiras.modelo.Produto;


@Path("produto")
public class ProdutoRest extends UtilRest {
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	
	public Response inserir(String produtoParam) {
		try {			
			Produto produto = new Gson().fromJson(produtoParam, Produto.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			boolean retorno = jdbcProduto.inserir(produto);
			
			String msg = "";
			if(retorno) {
				msg = "Produto cadastrado com sucesso!";
			} else {
				msg = "Erro ao cadastrar produto.";
			}
			
			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
