🛠️ Rotina de Testes na API

Este documento apresenta a rotina de testes que devem ser feitos na API, permitindo verificar o comportamento esperado dos procedimentos de busca. Todos os testes descritos devem ser realizados para cada endpoint.

🚪 Testes de Verificação de Entrada

🔍 Chamar o endpoint sem enviar nenhuma entrada.

❓ Chamar o endpoint somente com entradas não esperadas.

✔️ Chamar o endpoint somente com uma entrada esperada.

🔗 Chamar o endpoint com mais de uma entrada esperada (se aplicável).

🧩 Chamar o endpoint com todas as entradas esperadas.

⚠️ Chamar o endpoint com uma entrada esperada e uma não esperada.

📏 Chamar o endpoint com um valor muito extenso em uma entrada esperada.

🔗 Chamar o endpoint com entradas esperadas em outros endpoints (ex: nome com link).

💡 Chamar o endpoint com caracteres especiais (!@#$%¨&*()_-=+[{´~^]}/?;:.,<>/*-+°ºª§`).

🗺️ Caso existam entradas com valores fixados (ex: UF), verificar erro para valores fora das opções permitidas.

📅 Verificar o envio de datas inválidas ou entradas impossíveis, quando aplicável.

🔁 Caso a entrada dependa de um retorno de outro endpoint, testar com um retorno válido.

✅ Testar uma entrada que retorne resultados.

🚫 Testar uma entrada que não retorne resultados.

🔑 Caso haja login e senha, testar entradas incorretas, evitando bloqueio de usuário.

🔄 Testes de Verificação do Endpoint

🛑 Chamar o endpoint com outros métodos HTTP (GET, POST, PUT, DELETE) e garantir que funcione corretamente no método esperado e retorne erro 405 para outros métodos.

📋 Verificar se o formato do response da API está correto (entidades e propriedades nos níveis esperados).

📄 Caso o endpoint retorne arquivos ou documentos, verificar se estão corretamente criados.

🚨 Testes de Verificação de Erros

❌ Enviar um endpoint inválido e garantir o retorno do erro 404 (Not Found).

🚫 Enviar um request errado para garantir o retorno de erro 400 (Bad Request).

🔐 Enviar credenciais inválidas e garantir o retorno de erro 401 (Unauthorized).

🙅‍♂️ Se o endpoint for limitado, testar com um usuário sem acesso e garantir o erro 403 (Forbidden).

⚙️ Verificar outros erros específicos de cada endpoint.

🔍 Verificar mensagens de erros internos, caso existam.

🛡️ Testes de Segurança

🔒 Verificar que a busca não inicia sem credenciais corretas (Token e subscription key) e que um erro informativo é retornado.

🛑 Enviar consultas SQL como entrada para garantir que o endpoint sabe tratar essas tentativas de SQL Injection.

🧮 Verificar se números acima do limite para int ou float causam overflow.

🔐 Garantir que o retorno não contenha informações sensíveis (senhas, chaves, dados pessoais).

🔏 Verificar se é possível gerar token com informações incorretas.

⏲️ Verificar se o tempo de duração do token está correto.

⚡ Testes de Performance

🏎️ Rodar pelo menos 5 buscas simultâneas no mesmo endpoint e garantir que os retornos sejam consistentes.

⏱️ Buscas com menos de 100 resultados devem ser executadas em menos de 2 minutos.

✅ O que Garantir

🔄 A API deve executar todos os casos propostos nos testes.

⚠️ Caso não existam entradas válidas, o usuário deve receber uma mensagem informando quais entradas mínimas são esperadas.

✂️ Entradas inválidas devem ser ignoradas se houver entradas válidas.

📝 Mensagens de erro devem ser claras e explicativas.

⏳ Garantir que a execução da consulta está dentro das métricas de tempo.

🖋️ Verificar a ortografia das mensagens de retorno para os usuários.

📑 Garantir que os campos de retorno estão corretos e completos.

📚 Certificar a documentação correta do Swagger.

🛠️ Exemplos de Comandos SQL para Testes

SELECT * FROM Users WHERE UserId = 1 OR 1=1;
SELECT * FROM Users WHERE id = 1 OR 1=1;
SELECT * FROM Users WHERE Name ="" or ""="" AND Pass ="" or ""="";
SELECT * FROM Users; DROP TABLE Teste;

--**--

Anotações:
    Em ambiente de HML ou Dev:
        Positivo
        Endpoint
        Status da requisição
        Tipo de requisição
        Contrato
        Parâmetros do cabeçalho
        Parâmetros do corpo
        Performance (tempo de resposta em ms)
        Mensagens de retorno
            Mensagem de sucesso
            Mensagem de erro para entradas inválidas
            Mensagem de erro para entradas não esperadas

            