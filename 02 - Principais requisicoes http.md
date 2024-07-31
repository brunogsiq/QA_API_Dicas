🛠️ Métodos HTTP
GET:

Função: Buscar e trazer dados. 📥
Body: Não utilizado.
Uso: Consultar informações ou listar dados.
Exemplo: GET https://api.exemplo.com/users
POST:

Função: Gravar dados no servidor e criar novos recursos. 📝
Body: Necessário (geralmente em JSON).
Uso: Enviar dados específicos para o servidor.
Exemplo:
json
Copiar código
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
PUT:

Função: Atualizar todas as informações de um recurso. 🔄
Body: Necessário.
Uso: Substituir completamente uma informação existente.
Exemplo:
json
Copiar código
{
  "name": "John Doe",
  "email": "john.doe@newdomain.com"
}
PATCH:

Função: Atualizar parcialmente uma informação no servidor. ✏️
Body: Necessário.
Uso: Modificar apenas uma parte da informação.
Exemplo:
json
Copiar código
{
  "email": "john.doe@newdomain.com"
}
DELETE:

Função: Remover uma informação do servidor. 🗑️
Body: Normalmente não utilizado, mas pode ser necessário.
Exemplo: DELETE https://api.exemplo.com/users/123
HEAD:

Função: Recuperar cabeçalhos de resposta sem o corpo. 🏷️
Body: Não utilizado.
Exemplo: HEAD https://api.exemplo.com/users/123
OPTIONS:

Função: Descrever opções de comunicação para o recurso de destino. 🔍
Body: Não utilizado.
Exemplo: OPTIONS https://api.exemplo.com/users

🔧 Dicas para Uso do Postman:

GET Requests: Ideal para consultar dados sem alterar o servidor. Verifique se a rota está funcionando e se os dados retornados estão corretos.

POST Requests: Use para enviar novos dados e criar recursos. Certifique-se de que o Body está corretamente formatado.

PUT Requests: Ideal para atualizar completamente um recurso. Assegure que o Body contenha todas as informações necessárias.

PATCH Requests: Atualize parcialmente um recurso. Envie apenas os campos que precisam ser modificados.

DELETE Requests: Remova dados. Verifique se a operação foi bem-sucedida e se o recurso foi removido.

HEAD Requests: Verifique cabeçalhos sem transferir o recurso. Ideal para metadados.
OPTIONS Requests: Descubra quais métodos HTTP são suportados para um recurso específico.
