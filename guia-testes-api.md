# Guia de Testes de API — Postman e Insomnia

Guia prático para ir além do `status 200`: o que testar, como organizar variáveis e scripts prontos em JavaScript.

---

## Payload de referência

O JSON usado como exemplo ao longo do guia:

```json
{
  "pessoa": {
    "nome": "Bruno",
    "sobrenome": "Siqueira",
    "profissao": "QA senior",
    "idade": 39
  }
}
```

---

## 1. O que testar além do status

Pense em camadas. Toda vez que abrir um endpoint novo, percorra esta lista mentalmente.

### Protocolo

- Status code correto (200 vs 201 no POST, 204 no DELETE)
- Header `Content-Type: application/json`
- Tempo de resposta dentro de um SLA
- Headers de segurança / ausência de headers que vazam stack (`X-Powered-By`)

### Contrato (schema)

- Todos os campos obrigatórios existem
- Tipos corretos (string, integer, boolean, array)
- Campos **a mais** que não deveriam estar ali — quase ninguém testa, e é onde vaza dado sensível
- Campo pode ser `null`? Pode vir vazio? Pode estar ausente?
- Formatos: e-mail, data ISO 8601, UUID, enum com valores fixos

### Valores e regra de negócio

- POST: o que voltou é igual ao que foi enviado?
- GET após POST: o dado persistiu?
- Ordenação, paginação, total de itens bate com o array
- Valores calculados (idade, totais, descontos)

### Casos negativos

Aqui mora ~70% dos bugs.

- Campo obrigatório ausente → 400
- Tipo errado (`"idade": "trinta e nove"`) → 400 / 422
- Valores de fronteira: idade `-1`, `0`, `130`, `999`
- String vazia, string gigante (300 caracteres), acentos e emoji
- Sem token → 401 / token de outro usuário → 403
- ID inexistente → 404
- Método errado (PUT num endpoint só GET) → 405

> **Caso criativo para este payload:** enviar `"idade": 39.5`. Muita API aceita float onde deveria ser integer.

---

## 2. Variáveis (Postman)

Crie um Environment chamado `QA`:

| Variável   | Valor inicial                  |
| ---------- | ------------------------------ |
| `baseUrl`  | `https://api.suaempresa.com`   |
| `token`    | (vazio, preenchido via script) |
| `pessoaId` | (vazio)                        |

Na URL, use: `{{baseUrl}}/pessoas/{{pessoaId}}`

### Encadeando requisições

No request de login, aba **Scripts → Post-response**:

```js
const body = pm.response.json();
pm.environment.set("token", body.access_token);
```

No POST que cria a pessoa:

```js
pm.environment.set("pessoaId", pm.response.json().pessoa.id);
```

### Escopo das variáveis

Da mais fraca para a mais forte:

```
Global → Collection → Environment → Local
```

- **Collection:** schema e funções reutilizáveis
- **Environment:** o que muda entre dev / qa / prod

---

## 3. Testes básicos (Postman)

Aba **Scripts → Post-response** (Postman v11) ou **Tests** (versões antigas).

```js
const body = pm.response.json();
const p = body.pessoa;

pm.test("Status 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Content-Type é JSON", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Responde em menos de 1s", () => {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Objeto pessoa existe", () => {
    pm.expect(body).to.have.property("pessoa");
});

pm.test("Campos são do tipo esperado", () => {
    pm.expect(p.nome).to.be.a("string");
    pm.expect(p.sobrenome).to.be.a("string");
    pm.expect(p.profissao).to.be.a("string");
    pm.expect(p.idade).to.be.a("number");
});

pm.test("idade é inteiro e plausível", () => {
    pm.expect(Number.isInteger(p.idade), "idade não é inteiro").to.be.true;
    pm.expect(p.idade).to.be.within(0, 130);
});

pm.test("Strings não vêm vazias", () => {
    ["nome", "sobrenome", "profissao"].forEach(campo => {
        pm.expect(p[campo].trim(), `campo ${campo} vazio`).to.not.be.empty;
    });
});

pm.test("Não retorna campos inesperados", () => {
    pm.expect(Object.keys(p)).to.have.members(
        ["nome", "sobrenome", "profissao", "idade"]
    );
});
```

> **Dica:** o segundo argumento do `expect` (`"idade não é inteiro"`) vira a mensagem de erro quando o teste falha. Faz muita diferença ao rodar 200 testes no Newman.

---

## 4. Validação de contrato com JSON Schema

Testar campo por campo não escala. Com schema, o contrato é declarado uma vez.

```js
const schema = {
    type: "object",
    required: ["pessoa"],
    additionalProperties: false,
    properties: {
        pessoa: {
            type: "object",
            required: ["nome", "sobrenome", "profissao", "idade"],
            additionalProperties: false,
            properties: {
                nome:      { type: "string", minLength: 1, maxLength: 100 },
                sobrenome: { type: "string", minLength: 1, maxLength: 100 },
                profissao: { type: "string", minLength: 1 },
                idade:     { type: "integer", minimum: 0, maximum: 130 }
            }
        }
    }
};

pm.test("Contrato válido", () => {
    pm.response.to.have.jsonSchema(schema);
});
```

`additionalProperties: false` é o detalhe importante: quebra o teste se o back-end passar a devolver um campo novo (`cpf`, `senhaHash`) sem avisar o QA.

### Mensagens de erro melhores com Ajv

O Ajv já vem embutido no Postman:

```js
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const validar = ajv.compile(schema);
const valido = validar(pm.response.json());

pm.test("Contrato válido (Ajv)", () => {
    pm.expect(valido, JSON.stringify(validar.errors, null, 2)).to.be.true;
});
```

### Reutilizando o schema

No **Pre-request Script da Collection**:

```js
pm.collectionVariables.set("schemaPessoa", JSON.stringify({ /* schema aqui */ }));
```

No teste de cada request:

```js
const schema = JSON.parse(pm.collectionVariables.get("schemaPessoa"));
pm.response.to.have.jsonSchema(schema);
```

---

## 5. Testando o POST

O teste mais valioso no POST é comparar a resposta com o que foi enviado.

```js
const enviado = JSON.parse(pm.request.body.raw).pessoa;
const recebido = pm.response.json().pessoa;

pm.test("Status 201 Created", () => pm.response.to.have.status(201));

pm.test("Resposta reflete o payload enviado", () => {
    pm.expect(recebido.nome).to.eql(enviado.nome);
    pm.expect(recebido.sobrenome).to.eql(enviado.sobrenome);
    pm.expect(recebido.idade).to.eql(enviado.idade);
});

pm.test("Header Location aponta para o recurso", () => {
    pm.expect(pm.response.headers.get("Location")).to.match(/\/pessoas\/\d+$/);
});
```

### Teste negativo

Em um request separado, enviando `"idade": "trinta"`:

```js
pm.test("Rejeita tipo inválido", () => {
    pm.response.to.have.status(400);
});

pm.test("Mensagem de erro identifica o campo", () => {
    pm.expect(pm.response.text().toLowerCase()).to.include("idade");
});
```

---

## 6. Insomnia

### Versão 9+ (aba Scripts → After Response)

API praticamente idêntica à do Postman:

```js
insomnia.test("Status 200", () => {
    insomnia.response.to.have.status(200);
});

insomnia.test("Tipos corretos", () => {
    const p = insomnia.response.json().pessoa;
    insomnia.expect(p.nome).to.be.a("string");
    insomnia.expect(p.idade).to.be.a("number");
});
```

### Versões antigas (aba Tests, nível de collection)

A request é disparada manualmente:

```js
const response = await insomnia.send();
const body = JSON.parse(response.data);
expect(response.status).to.equal(200);
expect(body.pessoa.idade).to.be.a("number");
```

### Ambientes

Ícone de engrenagem no topo da sidebar (ou `Ctrl+E`), em JSON puro:

```json
{
  "baseUrl": "https://api.suaempresa.com",
  "token": ""
}
```

Uso: `{{ baseUrl }}/pessoas`

### Postman vs Insomnia para automação

Para CI, o Postman leva vantagem:

```bash
newman run collection.json -e ambiente.json --reporters cli,junit
```

O Insomnia depende do plugin `inso`, que é bem mais limitado.

---

## 7. Exercício para destravar a criatividade

Pegue este endpoint de pessoa e escreva **15 casos de teste sem repetir categoria**.

Os 5 primeiros saem fáceis. Do 6º em diante começam a aparecer os interessantes:

- O que acontece com `"idade": null`?
- E com dois nomes iguais?
- E se eu mandar o mesmo POST duas vezes?

---

## Checklist rápido

- [ ] Status code
- [ ] Content-Type
- [ ] Tempo de resposta
- [ ] Campos obrigatórios presentes
- [ ] Tipos corretos
- [ ] Sem campos extras (`additionalProperties: false`)
- [ ] Strings não vazias
- [ ] Fronteiras numéricas
- [ ] Formatos (data, e-mail, UUID)
- [ ] Eco do payload no POST
- [ ] 400 para tipo inválido
- [ ] 401 sem token
- [ ] 404 para ID inexistente
- [ ] 405 para método errado
- [ ] Idempotência / duplicidade
