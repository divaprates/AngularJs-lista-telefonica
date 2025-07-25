angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, contatosAPI, operadorasAPI, serialGenerator) {
    $scope.app = "Lista Telefonica";

    $scope.cores = ["green",  "blue",  "red",  "yellow",  "orange",  "purple",  "pink",  "brown",  "gray",  "black"];
    $scope.contatos = [];
    $scope.operadoras = [];
    $scope.contato = {data: new Date()};

    var init = function() {
        carregarContatos();
        carregarOperadoras();
    }

    var carregarContatos = function() {
        contatosAPI.getContatos().then(function (response) {
            if(response != null) {
                $scope.contatos = response.data;
            }
        }, function (error) {
            $scope.error = "Não foi possível carregar os dados!";
            console.log($scope.error);
        });
    };

    $scope.carregarDetalheContato = function(id) {
        contatosAPI.getContato(id).then(function (response) {
            if(response != null) {
                $scope.detalheContato = response.data;
                $scope.detalheContato = preencherTipo($scope.detalheContato);
                $scope.detalheContato.operadora.precoComImposto = calcularImposto($scope.detalheContato);
            }
        }, function(error) {
            $scope.error = "Não foi possível carregar os dados!";
            console.log($scope.error);
        })
    }

    $scope.fecharDetalhe = function() {
        $scope.detalheContato = null;
    }

    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().then(function (response) {
            if(response != null) {
                $scope.operadoras = response.data;
            }
        });
    };
    
    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).success(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema... " + data;
        });

    };

    $scope.apagarContato = function (contatos) {
        var contatosSelecionados = contatos.filter(c => c.selecionado);

        contatosSelecionados.forEach(c => {
            contatosAPI.deleteContato(c.id).success(function () {
                    carregarContatos();
                }).error(function (error) {
                    $scope.message = "Aconteceu um problema... " + error;
                });
        });
    };

    $scope.isContatoSelecionado = function (contatos) {
        return !contatos.some(c => c.selecionado);
    }

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    var calcularImposto = function(contato) {
        var imposto = 1.2;
        return contato.operadora.preco * imposto;
    }

    var preencherTipo = function(contato) {
        contato.tipo = contato.tipo ? contato.tipo : "Pessoa Física";
        return contato;
    }

    $scope.reset = function () {
        console.log("reset");
        $scope.contatos = angular.copy($scope.contatos);
    }

    init();
});