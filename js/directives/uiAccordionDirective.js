angular.module("listaTelefonica").directive("uiAccordions", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            this.helloWorld = function () {
                console.log("Hello World");
            }
        }
    };
});

angular.module("listaTelefonica").directive("uiAccordion", function () {
    return {
        templateUrl: "./js/view/accordion.html",
        scope: {
            title: "@"
        },
        transclude: true,
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl) {
            
            scope.open = function () {
                ctrl.helloWorld();
                scope.isOpened = !scope.isOpened;
            };

        }
    };
});