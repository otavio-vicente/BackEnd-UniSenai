package br.com.coldigogeladeiras.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;


@Path("marca")
public class MarcaRest {

	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	
	public Response buscar() {
		
		List<Marca> listaMarcas = new ArrayList<Marca>();
		
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
		listaMarcas = jdbcMarca.buscar();
		conec.fecharConexao();
		return null;
	}
}