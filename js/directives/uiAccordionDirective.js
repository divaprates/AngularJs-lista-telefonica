angular.module("listaTelefonica").directive("uiAccordions", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            var accordions = [];

            this.registerAccordion = function (accordion) {
                accordions.push(accordion);
            }

            this.closeAll = function () {
                accordions.forEach(function (accordion) {
                    accordion.isOpened = false;
                })
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
            ctrl.registerAccordion(scope);

            scope.open = function () {
                ctrl.closeAll();
                scope.isOpened = true;
            };

        }
    };
});