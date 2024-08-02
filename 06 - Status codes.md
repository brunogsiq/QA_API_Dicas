## Códigos de Status HTTP

Os códigos de status HTTP são agrupados em cinco categorias, representadas por números de três dígitos. Abaixo estão as categorias e alguns códigos comuns dentro de cada uma.

### 1xx: Informativos
Estes códigos indicam que a solicitação foi recebida e o processamento está em curso.

- **100 Continue**: O servidor recebeu os cabeçalhos da requisição e o cliente deve continuar a enviar o corpo da requisição.
- **101 Switching Protocols**: O servidor concorda em mudar o protocolo conforme solicitado pelo cliente.

### 2xx: Sucesso
Estes códigos indicam que a solicitação foi recebida com sucesso, entendida e aceita.

- **200 OK**: A solicitação foi bem-sucedida.
- **201 Created**: Um novo recurso foi criado como resultado da solicitação.
- **204 No Content**: A solicitação foi bem-sucedida, mas não há conteúdo para enviar na resposta.

### 3xx: Redirecionamentos
Estes códigos indicam que ações adicionais devem ser tomadas pelo cliente para completar a solicitação.

- **301 Moved Permanently**: O recurso foi movido permanentemente para uma nova URL.
- **302 Found**: O recurso foi encontrado em outra URL, a qual deve ser acessada com um método GET.
- **304 Not Modified**: O recurso não foi modificado e a versão em cache pode ser utilizada.

### 4xx: Erros do Cliente
Estes códigos indicam que a solicitação contém um erro de sintaxe ou não pode ser processada.

- **400 Bad Request**: A solicitação não pôde ser processada devido a erro de sintaxe.
- **401 Unauthorized**: É necessário autenticação para acessar o recurso.
- **403 Forbidden**: O servidor entendeu a solicitação, mas se recusa a autorizá-la.
- **404 Not Found**: O recurso solicitado não foi encontrado.
- **405 Method Not Allowed**: O método especificado na solicitação não é permitido para o recurso.

### 5xx: Erros do Servidor
Estes códigos indicam que a solicitação foi aceita, mas o servidor falhou ao tentar processá-la.

- **500 Internal Server Error**: Ocorreu um erro interno no servidor.
- **501 Not Implemented**: O servidor não possui funcionalidade para atender à solicitação.
- **502 Bad Gateway**: O servidor, agindo como gateway, recebeu uma resposta inválida.
- **503 Service Unavailable**: O servidor está indisponível temporariamente, geralmente por manutenção ou sobrecarga.