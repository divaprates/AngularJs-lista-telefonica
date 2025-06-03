angular.module("listaTelefonica").factory("contatosAPI", function($http, config) {
    var _getContatos = function() {
        return $http.get(config.baseURL + "/contatos");
        ;
    };

    var _saveContato = function(contato) {
        return $http.post(config.baseURL + "/contatos", contato);
    };

    var _deleteContato = function(id) {
        return $http.delete(config.baseURL + "/contatos/" + id);
    };

    return {
        getContatos: _getContatos,
        saveContato: _saveContato,
        deleteContato: _deleteContato
    };
});