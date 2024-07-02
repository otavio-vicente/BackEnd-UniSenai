package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import java.util.ArrayList;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO implements MarcaDAO {

	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<Marca> buscar() {
		
		//Criação da instrução SQL para busca de todas as marcas;
		String comando = "SELECT * FROM marcas";
		
		//Criação de uma lista para armazenar cada marca encontradas;
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		//Criação do objeto marca com valor null (ou seja, sem instanciá-lo)
		Marca marca = null;
		
		try {
			
			//Uso da conexão do banco de dados para prepara-lo para uma instrução SQL
			Statement stmt = conexao.createStatement();
			//Execução da instrução criada previamente e armazenamento do resultado do objeto rs
			ResultSet rs = stmt.executeQuery(comando);
			
			while(rs.next()) {
				
				//Criação de instância da classe
				marca = new Marca();
				
				//Recebimento dos 2 dados retornados do BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				//Setando no objeto marca os valores encontrados
				marca.setId(id);
				marca.setNome(nome);
				
				//Adição da instância contida no objeto Marca na lista de marcas
				listMarcas.add(marca);
				
			}
			
			
				
		}catch (Exception ex){
			ex.printStackTrace();
		}
		
		//retorna para quem chamou o método a lista criada
		return listMarcas;
	}
}