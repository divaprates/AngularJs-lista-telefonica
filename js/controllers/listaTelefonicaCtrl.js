angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
    $scope.app = "Lista Telefonica";

    $scope.cores = ["green",  "blue",  "red",  "yellow",  "orange",  "purple",  "pink",  "brown",  "gray",  "black"];
    $scope.contatos = [];
    $scope.operadoras = [];

    // $scope.operadoras = [
    //     {"nome": "Oi", "codigo": 14, "preco": 1},
    //     {"nome": "Vivo", "codigo": 15, "preco": 2},
    //     {"nome": "Tim", "codigo": 41, "preco": 3}
    // ];

    // $scope.contatos = [
    //     {nome: "Isabella", telefone: "988888888", cor: "red", data: new Date()},
    //     {nome: "Edward", telefone: "988888888", cor: "yellow", data: new Date()},
    //     {nome: "Alice", telefone: "988888888", cor: "green", data: new Date()},
    //     {nome: "Jacob", telefone: "988888888", cor: "blue", data: new Date()},
    // ];

    var carregarContatos = function() {
        $http.get("http://localhost:3000/contatos").then(function (response) {
            if(response != null) {
                $scope.contatos = response.data;
            }
        })
    };

    var carregarOperadoras = function() {
        $http.get("http://localhost:3000/operadoras").then(function (response) {
            if(response != null) {
                $scope.operadoras = response.data;
            }
        });
    };
    
    $scope.adicionarContato = function (contato) {
        contato.data = new Date();
        $http.post("http://localhost:3000/contatos", contato).success(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema... " + data;
        });

    };

    $scope.apagarContato = function (contatos) {
        $scope.contatos = contatos.filter(c => !c.selecionado);
    };

    $scope.isContatoSelecionado = function (contatos) {
        return !contatos.some(c => c.selecionado);
    }

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();
});