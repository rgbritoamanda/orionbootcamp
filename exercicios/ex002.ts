const readline2 = require('readline');
let lista: Array<{ id: number, name: string, bio: string }> = [
  { id: 1, name: "Ada Lovelace", bio: "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina" },
  { id: 2, name: "Alan Turing", bio: "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial" },
  { id: 3, name: "Nikola Tesla", bio: "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada." },
  { id: 4, name: "Nicolau Copérnico", bio: "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar." }
];
let historicoExclusoes: Array<{ id: number, name: string, bio: string }> = [];
// Funções Imperativas
function getBioByIdImperativo(params: { id: number }): string | undefined {
  const { id } = params;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      return lista[i].bio;
    }
  }
  return undefined;
}
function getNameByIdImperativo(params: { id: number }): string | undefined {
  const { id } = params;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      return lista[i].name;
    }
  }
  return undefined;
}
function deleteByIdImperativo(params: { id: number }): void {
  const { id } = params;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      historicoExclusoes.push(lista[i]);
      lista.splice(i, 1);
      break;
    }
  }
}
function updateByIdImperativo(params: { id: number, name?: string, bio?: string }): void {
  const { id, name, bio } = params;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      lista[i].name = name || lista[i].name;
      lista[i].bio = bio || lista[i].bio;
      break;
    }
  }
}
// Funções Funcionais
function getBioByIdFuncional(params: { id: number }): string | undefined {
  const { id } = params;
  const item = lista.find(item => item.id === id);
  return item ? item.bio : undefined;
}
function getNameByIdFuncional(params: { id: number }): string | undefined {
  const { id } = params;
  const item = lista.find(item => item.id === id);
  return item ? item.name : undefined;
}
function deleteByIdFuncional(params: { id: number }): void {
  const { id } = params;
  const item = lista.find(item => item.id === id);
  if (item) {
    historicoExclusoes.push(item);
    lista = lista.filter(item => item.id !== id);
  }
}
function updateByIdFuncional(params: { id: number, name?: string, bio?: string }): void {
  const { id, name, bio } = params;
  lista = lista.map(item => {
    if (item.id === id) {
      return {
        ...item,
        name: name || item.name,
        bio: bio || item.bio
      };
    }
    return item;
  });
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
          console.log(`Bio do ID ${id} (Funcional):`, getBioByIdFuncional({ id }) || "ID não encontrado.");
          console.log(`Bio do ID ${id} (Imperativo):`, getBioByIdImperativo({ id }) || "ID não encontrado.");
          break;
        case 2:
          console.log(`Nome do ID ${id} (Funcional):`, getNameByIdFuncional({ id }) || "ID não encontrado.");
          console.log(`Nome do ID ${id} (Imperativo):`, getNameByIdImperativo({ id }) || "ID não encontrado.");
          break;
        case 3:
          console.log(`\nAntes de deletar ID ${id}:`);
          printLista(lista);
          deleteByIdFuncional({ id });
          deleteByIdImperativo({ id });
          console.log(`\nDepois de deletar ID ${id}:`);
          printLista(lista);
          break;
        case 4:
          rl2.question("Digite o novo nome (ou pressione Enter para manter o mesmo): ", (name: string) => {
            rl2.question("Digite a nova bio (ou pressione Enter para manter a mesma): ", (bio: string) => {
              console.log(`\nAntes de atualizar ID ${id}:`);
              printLista(lista);
              updateByIdFuncional({ id, name, bio });
              updateByIdImperativo({ id, name, bio });
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