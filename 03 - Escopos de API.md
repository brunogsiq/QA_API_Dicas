🌍 Escopo de Acessibilidade das APIs

🔓 Públicas
🔒 Privadas
🤝 Parcerias

🔧 Uso do Postman para APIs
O Postman é uma ferramenta eficaz tanto para a criação quanto para o consumo de APIs. As APIs REST suportam operações CRUD (Create, Read, Update, Delete) em um banco de dados, onde cada operação pode ser mapeada para um dos verbos HTTP.

📜 Verbos HTTP
As operações CRUD são realizadas através de verbos HTTP, que são essencialmente métodos que indicam a ação desejada:

GET: Buscar dados
POST: Criar dados
PUT/PATCH: Atualizar/modificar dados
DELETE: Remover dados
🔗 Parâmetros
Os parâmetros são usados para especificar dados que você quer enviar com sua requisição. No Postman, eles são inseridos na aba "Params".

🔍 Parâmetros de Consulta

Inseridos ao final da URL.
Começam com um '?' seguido por pares chave-valor no formato <key>=<value>.
Para múltiplos parâmetros, são separados por '&'.
Exemplo: GET https://some.api.com/photos?orientation=landscape&size=500x400

🛣️ Parâmetros de Caminho (Path Parameters)
Também conhecidos como variáveis de caminho.
Usados para identificadores dinâmicos na URL, como IDs ou nomes de usuário.
Inseridos após uma '/'.
Exemplo: GET https://api.github.com/users/{username}

🔀 Diferença entre Parâmetros de Consulta e de Caminho

Parâmetros de Consulta: Adicionados ao final da URL para filtrar ou modificar a resposta de alguma forma sem especificar um recurso.
Parâmetros de Caminho: Parte integral da URL que geralmente especifica o recurso sobre o qual a operação deve ser executada.

🔐 Autorização de APIs

Para proteger uma API e controlar o acesso, diversas técnicas de autorização podem ser empregadas:

🔑 Basic Auth: Utiliza username e senha.
🛡️ OAuth: Um protocolo mais seguro que permite autorização sem compartilhar credenciais de senha.
🔖 API Keys: Chaves secretas que são associadas a um desenvolvedor específico para uso de uma API.
➕ Inserção de Variável de Caminho no Postman
Para usar uma variável de caminho no Postman, a URL deve incluir a variável precedida por dois pontos (:).

Exemplo: https://library-api.postmanlabs.com/books/:id