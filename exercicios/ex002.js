var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var readline2 = require('readline');
var lista = [
    { id: 1, name: "Ada Lovelace", bio: "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina" },
    { id: 2, name: "Alan Turing", bio: "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial" },
    { id: 3, name: "Nikola Tesla", bio: "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada." },
    { id: 4, name: "Nicolau Copérnico", bio: "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar." }
];
var historicoExclusoes = [];
// Funções Imperativas
function getBioByIdImperativo(params) {
    var id = params.id;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i].bio;
        }
    }
    return undefined;
}
function getNameByIdImperativo(params) {
    var id = params.id;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i].name;
        }
    }
    return undefined;
}
function deleteByIdImperativo(params) {
    var id = params.id;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            historicoExclusoes.push(lista[i]);
            lista.splice(i, 1);
            break;
        }
    }
}
function updateByIdImperativo(params) {
    var id = params.id, name = params.name, bio = params.bio;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            lista[i].name = name || lista[i].name;
            lista[i].bio = bio || lista[i].bio;
            break;
        }
    }
}
// Funções Funcionais
function getBioByIdFuncional(params) {
    var id = params.id;
    var item = lista.find(function (item) { return item.id === id; });
    return item ? item.bio : undefined;
}
function getNameByIdFuncional(params) {
    var id = params.id;
    var item = lista.find(function (item) { return item.id === id; });
    return item ? item.name : undefined;
}
function deleteByIdFuncional(params) {
    var id = params.id;
    var item = lista.find(function (item) { return item.id === id; });
    if (item) {
        historicoExclusoes.push(item);
        lista = lista.filter(function (item) { return item.id !== id; });
    }
}
function updateByIdFuncional(params) {
    var id = params.id, name = params.name, bio = params.bio;
    lista = lista.map(function (item) {
        if (item.id === id) {
            return __assign(__assign({}, item), { name: name || item.name, bio: bio || item.bio });
        }
        return item;
    });
}
function desfazerUltimaExclusao() {
    var itemRestaurado = historicoExclusoes.pop();
    if (itemRestaurado) {
        lista.push(itemRestaurado);
        console.log("Item com ID ".concat(itemRestaurado.id, " foi restaurado."));
    }
    else {
        console.log("Nenhuma exclusão para desfazer.");
    }
}
function printLista(lista) {
    lista.forEach(function (item) {
        console.log("ID: ".concat(item.id, ", Nome: ").concat(item.name, ", Bio: ").concat(item.bio));
    });
}
function listarIdsDisponiveis() {
    console.log("\nIDs disponíveis: ", lista.map(function (item) { return item.id; }).join(", "));
}
var rl2 = readline2.createInterface({
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
    rl2.question("Digite o número da operação: ", function (operacao) {
        var operacaoEscolhida = parseInt(operacao);
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
        rl2.question("Digite o ID: ", function (inputId) {
            var id = parseInt(inputId);
            switch (operacaoEscolhida) {
                case 1:
                    console.log("Bio do ID ".concat(id, " (Funcional):"), getBioByIdFuncional({ id: id }) || "ID não encontrado.");
                    console.log("Bio do ID ".concat(id, " (Imperativo):"), getBioByIdImperativo({ id: id }) || "ID não encontrado.");
                    break;
                case 2:
                    console.log("Nome do ID ".concat(id, " (Funcional):"), getNameByIdFuncional({ id: id }) || "ID não encontrado.");
                    console.log("Nome do ID ".concat(id, " (Imperativo):"), getNameByIdImperativo({ id: id }) || "ID não encontrado.");
                    break;
                case 3:
                    console.log("\nAntes de deletar ID ".concat(id, ":"));
                    printLista(lista);
                    deleteByIdFuncional({ id: id });
                    deleteByIdImperativo({ id: id });
                    console.log("\nDepois de deletar ID ".concat(id, ":"));
                    printLista(lista);
                    break;
                case 4:
                    rl2.question("Digite o novo nome (ou pressione Enter para manter o mesmo): ", function (name) {
                        rl2.question("Digite a nova bio (ou pressione Enter para manter a mesma): ", function (bio) {
                            console.log("\nAntes de atualizar ID ".concat(id, ":"));
                            printLista(lista);
                            updateByIdFuncional({ id: id, name: name, bio: bio });
                            updateByIdImperativo({ id: id, name: name, bio: bio });
                            console.log("\nDepois de atualizar ID ".concat(id, ":"));
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
