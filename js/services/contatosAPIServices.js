angular.module("listaTelefonica").factory("contatosAPI", function($http) {
    var _getContatos = function() {
        return $http.get("http://localhost:3000/contatos");
    };

    return {
        getContatos: _getContatos
    };
});