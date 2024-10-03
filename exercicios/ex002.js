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
  } else {
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
