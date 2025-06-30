angular.module("listaTelefonica").config(function ($routeProvider) {
	$routeProvider.when("/contatos", {
		templateUrl: "view/contatos.html",
		controller: "listaTelefonicaCtrl"
    });

	$routeProvider.when("/novoContato", {
		templateUrl: "view/novoContato.html",
		controller: "listaTelefonicaCtrl"
    });

    $routeProvider.when("/error", {
		templateUrl: "view/error.html"
    });
	

    $routeProvider.otherwise({redirectTo: "/contatos"});
});