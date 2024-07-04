package br.com.coldigogeladeiras.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;

public class UtilRest {
	
	/*
	 * Abaixo o método responsavel por enviar a resposta ao cliente sobre
	 * a transicao realizada (inclusao, consulta, edicao ou exclusao) caso
	 * ela seja realizada com sucesso.
	 * Repare que o metodo em questao em questao aguarda que seja repassado um 
	 * conteudo que sera referenciado por um objeto chamado result.
	 */

	public Response buildResponse(Object result) {
		
		try {
			/*
			 * Retorna o objeto de resposta com status 200(ok), tendo
			 * em seu corpo o objeto valorResposta (que consiste no
			 * objeto result convertido para JSON).
			 */
			String valorResposta = new Gson().toJson(result);
			return Response.ok(valorResposta).build();
		} catch (Exception ex) {
			ex.printStackTrace();
			//Se algo der errado acima, cria Response de erro
			return this.buildResponse(ex.getMessage());
		}
	}
	
	/*
	 * Abaixo o método responsável por enviar a resposta ao cliente sobre
	 * A transação, inclusão, consulta, edição ou exclusão, clientes, não realizadas com sucesso
	 * ou seja, que contenha algum erro.
	 * Repare que o método em questão aguarda que seja repassado um
	 * conteúdo que será referenciado pelo por um objeto chamado rb.
	 * 
	 * */
	
	public Response buildErrorResponse(String str) {
		/*
		 * Abaixo o objeto rb recebe o status do erro.
		 * 
		 * */
		
		ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
		
		/*
		 *Define o tipo de retorno desta entidade(objeto), no
		 *caso é definido como texto simples.
		 **/
		
		rb = rb.type("text/plain");
		
		/*
		 * Retorna o objeto da empresa com status 500 (erro),
		 * junto com a String contendo a mensagem de erro.
		 * */
		
		return rb.build();
	}
	
	
}
