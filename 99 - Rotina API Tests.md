# Rotina de Testes na API

Este documento apresenta a rotina de testes que devem ser realizados na API para verificar o comportamento esperado dos procedimentos de busca. Os testes devem ser aplicados para cada endpoint disponível.

## 📌 Testes de Verificação de Entrada

- Chamar o endpoint sem mandar nenhuma entrada.
- Chamar o endpoint somente com entrada(s) não esperada(s).
- Chamar o endpoint somente com uma entrada esperada.
- Chamar o endpoint com mais de uma entrada esperada (caso seja possível).
- Chamar o endpoint com todas as entradas esperadas.
- Chamar o endpoint com pelo menos uma entrada esperada e uma não esperada.
- Chamar o endpoint com um valor muito extenso em uma entrada esperada.
- Chamar o endpoint com entradas esperadas de outros endpoints (ex: Em uma entrada nome colocar um link).
- Chamar o endpoint com caracteres especiais e espaços em uma entrada esperada (`!@#$%¨&*()_-=+[{´`~^]}/?;:.,<>/*-+°ºª§¹²³£¢¬`).
- Verificar entradas com valores fixos (ex: UF) e se uma entrada não aceita gera um aviso das entradas possíveis.
- Verificar o envio de datas impossíveis ou outras entradas para entradas esperadas no formato de data.
- Testar com retorno de outro endpoint.
- Testar entradas que retornem e que não retornem resultados.
- Caso haja login e senha, testar também entradas incorretas (cuidado para não bloquear o usuário).

## 🔍 Testes de Verificação do Endpoint

- Chamar o endpoint utilizando métodos não permitidos (GET, POST, PUT, DELETE) e garantir que respostas corretas são dadas apenas no método correto.
- Verificar se o formato da resposta da API está conforme o esperado.
- Caso o endpoint retorne arquivos ou documentos, verificar se estão sendo corretamente criados.

## ❌ Testes de Verificação de Erros

- Enviar um endpoint inválido e verificar o retorno de erro 404 (Not Found).
- Enviar o endpoint correto com um request errado para verificar o retorno de erro 400 (Bad Request).
- Enviar credenciais inválidas para garantir o retorno de erro 401 (Unauthorized).
- Testar acesso com um usuário válido mas sem permissões para garantir o retorno de erro 403 (Forbidden).
- Verificar outros erros específicos para cada endpoint.
- Verificar mensagens de erros internos.

## 🔐 Testes de Segurança

- Verificar que a busca não se inicia sem as credenciais corretas (Token e subscription key).
- Enviar consultas SQL maliciosas para garantir a segurança contra SQL Injection.
- Verificar o retorno para garantir que não contém informações sensíveis.
- Testar a geração de tokens com informações incorretas.
- Verificar a duração do token.

## 🚀 Testes de Performance

- Realizar ao menos 5 buscas simultâneas no mesmo endpoint para garantir a coerência dos retornos.
- Buscas com menos de 100 resultados devem rodar em menos de 2 minutos.

## ✔️ O que Garantir

- Garantir que a API execute todos os casos propostos nos testes.
- Garantir mensagens de erro claras e úteis.
- Garantir que a execução esteja dentro das métricas de tempo estabelecidas.
- Garantir a correção ortográfica dos retornos.
- Garantir a correta documentação no Swagger.

## 📝 Exemplos de Comandos SQL para Testar Entradas

```sql
SELECT * FROM Users WHERE UserId = 1 OR 1=1;
SELECT * FROM Users WHERE id = 1 OR 1=1;
SELECT * FROM Users WHERE Name ="" or ""="" AND Pass ="" or ""="";
SELECT * FROM Users; DROP TABLE Teste;
