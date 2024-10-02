const readline2 = require('readline');

let lista: Array<{ id: number, name: string, bio: string }> = [
  {"id": 1, "name": "Ada Lovelace", "bio": "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
  {"id": 2, "name": "Alan Turing", "bio": "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
  {"id": 3, "name": "Nikola Tesla", "bio": "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
  {"id": 4, "name": "Nicolau Copérnico", "bio": "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar."}
];

let historicoExclusoes: Array<{ id: number, name: string, bio: string }> = [];

function getBioById(id: number): string | undefined {
  const item = lista.find(item => item.id === id);
  return item ? item.bio : undefined;
}

function getNameById(id: number): string | undefined {
  const item = lista.find(item => item.id === id);
  return item ? item.name : undefined;
}

function deleteById(id: number): void {
  const item = lista.find(item => item.id === id);
  if (item) {
    historicoExclusoes.push(item);
    lista = lista.filter(item => item.id !== id);
  }
}

function desfazerUltimaExclusao(): void {
  const itemRestaurado = historicoExclusoes.pop();
  if (itemRestaurado) {
    lista.push(itemRestaurado);
    console.log(`Item com ID ${itemRestaurado.id} foi restaurado.`);
  } else {
    console.log("Nenhuma exclusão para desfazer.");
  }
}

function updateById(id: number, newName?: string, newBio?: string): void {
  lista = lista.map(item => {
    if (item.id === id) {
      return {
        ...item,
        name: newName || item.name,
        bio: newBio || item.bio
      };
    }
    return item;
  });
}

function printLista(lista: Array<{ id: number, name: string, bio: string }>) {
  lista.forEach(item => {
    console.log(`ID: ${item.id}, Nome: ${item.name}, Bio: ${item.bio}`);
  });
}

function listarIdsDisponiveis() {
  console.log("\nIDs disponíveis: ", lista.map(item => item.id).join(", "));
}

const rl2 = readline2.createInterface({
  input: process.stdin,
  output: process.stdout
});

function escolherOperacao() {
  console.log("\nEscolha uma operação:");
  console.log("1 - Obter Bio por ID");
  console.log("2 - Obter Nome por ID");
  console.log("3 - Deletar por ID");
  console.log("4 - Atualizar por ID");
  console.log("5 - Desfazer última exclusão");
  console.log("6 - Sair");

  rl2.question("Digite o número da operação: ", (operacao: string) => {
    const operacaoEscolhida = parseInt(operacao);

    if (operacaoEscolhida === 6) {
      rl2.close();
      return;
    }

    if (operacaoEscolhida === 5) {
      desfazerUltimaExclusao();
      escolherOperacao();
      return;
    }

    listarIdsDisponiveis();

    rl2.question("Digite o ID: ", (inputId: string) => {
      const id = parseInt(inputId);

      switch (operacaoEscolhida) {
        case 1:
          console.log(`Bio do ID ${id}:`, getBioById(id) || "ID não encontrado.");
          break;
        case 2:
          console.log(`Nome do ID ${id}:`, getNameById(id) || "ID não encontrado.");
          break;
        case 3:
          console.log(`\nAntes de deletar ID ${id}:`);
          printLista(lista);
          deleteById(id);
          console.log(`\nDepois de deletar ID ${id}:`);
          printLista(lista);
          break;
        case 4:
          rl2.question("Digite o novo nome (ou pressione Enter para manter o mesmo): ", (newName: string) => {
            rl2.question("Digite a nova bio (ou pressione Enter para manter a mesma): ", (newBio: string) => {
              console.log(`\nAntes de atualizar ID ${id}:`);
              printLista(lista);
              updateById(id, newName || undefined, newBio || undefined);
              console.log(`\nDepois de atualizar ID ${id}:`);
              printLista(lista);
              escolherOperacao();
            });
          });
          return;
        default:
          console.log("Operação inválida, tente novamente.");
          break;
      }

      escolherOperacao();
    });
  });
}

escolherOperacao();
