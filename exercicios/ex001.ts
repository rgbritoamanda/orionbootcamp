const readline = require('readline');

function contarVogais(palavra: string): number {
  let contador = 0;
  const vogais = "aeiouAEIOU";

  for (const letra of palavra) {
      if (vogais.includes(letra)) {
        contador++;
      }
  }

  return contador;
}

console.log(`Quantidade de vogais em "programacao":`, contarVogais("programacao"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite uma palavra: ', (palavraInput: string) => {
    console.log(`Quantiade de vogais em "${palavraInput}":`, contarVogais(palavraInput));
    rl.close();
});