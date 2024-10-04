function contarVogais(palavra) {
  var contador = 0;
  var vogais = "aeiouAEIOU";
  for (var _i = 0, palavra_1 = palavra; _i < palavra_1.length; _i++) {
      var letra = palavra_1[_i];
      if (vogais.includes(letra)) {
          contador++;
      }
  }
  return contador;
}

console.log("Quantidade de vogais em \"programacao\":", contarVogais("programacao"));
