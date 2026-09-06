//Chamando próxima requisição
pm.setNextRequest("Nomde do arquivo")

//Imprimindo váriavel global no console:]

console.log(`Test Pass. Processor é: ${pm.globals.get("x-processor-inexistente")}`);

//Teste real com acerto ou falha 
let teste = 1;
let complemento = 1;
let test atual = 1

//ou

let teste = pm.globals.get("teste");
let complemento = pm.globals.get("complemento");
let testeAtual = pm.globals.get("testeAtual");


console.log ("Teste - Início.");

pm.test(`Teste ${teste} - Complemento ${complemento} - Verifica... NOME DO TESTE A SER INSERIDO)`, function () {
    const status = pm.response.code;
    //ADICIONAR MAIS VALORES NO ARRAY CASO NECESSÁRIO
    pm.expect(status).to.be.oneOf([200, 201, 204]); 

    If (status === 200) {
        pm.response.to.have.status("200");
        console.log(`Teste ${teste} - Complemento ${complemento} - Result: Pass - Info TESTEVALOR : ` + pm.response.code);
    } else {
        console.log(`Teste ${teste} - Complemento ${complemento} - Result: Fail - Info TESTEVALOR : ` + pm.response.code);
        pm.expect.fail(status);
    }
});
console.log(`Teste - Fim.`);