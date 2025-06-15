angular.module("ui", []);

angular.module("ui").run(function ($templateCache) {
    $templateCache.put("./js/view/accordion.html", `
        <div class="ui-accordion-title" ng-click="open()">{{title}}</div>
        <div class="ui-accordion-content" ng-transclude ng-show="isOpened"></div>
        `);
});

angular.module("ui").directive("uiAccordions", function () {
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

angular.module("ui").directive("uiAccordion", function () {
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