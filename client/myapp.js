(function() {
    angular.module('app', ['ngMessages']);
})();


(function() {
    angular.module('app')
        .constant('CONST', {
            BASE_API: 'http://127.0.0.1:8080/api',
            API: {
                GETDATA: {
                    URL: '/getData',
                    METHOD: 'GET'
                },
                SAVEDATA: {
                    URL: '/saveData',
                    METHOD: 'POST',
                    PARAMS: {
                        input1: null,
                        input2: null,
                        result: null
                    }
                }
            }
        });
})();


(function() {
    var MyAppController = function($scope, $http, $log, CONST) {
        var vm = this;
        vm.title = "Multiply";
        vm.integerPattern = /^\d+$/;
        vm.data = {
            fnum: '',
            snum: ''
        };
        vm.output = -1;

        vm.setResult = function(data) {
            vm.output = data;
            $scope.$apply();
            $http({
                url: CONST.BASE_API + CONST.API.SAVEDATA.URL,
                method: CONST.API.SAVEDATA.METHOD,
                data: angular.extend({}, {input1: vm.data.fnum, input2: vm.data.snum, result: data})
            }).then(function(resp) {
                if (res.status === 202) {
                    $log.debug('Saved');
                }
            }).catch(function(error) {
                $log.info('No Records');
            });
        };

        vm.init = function () {
            $http({
                url: CONST.BASE_API + CONST.API.GETDATA.URL,
                method: CONST.API.GETDATA.METHOD
            }).then(function(resp) {
                vm.data.fnum = resp.data.input1;
                vm.data.snum = resp.data.input2;
                vm.output = resp.data.result;
            }).catch(function(error) {
                $log.info('No Records');
            });
        };

        vm.init();
    };

    MyAppController.$inject = ['$scope', '$http', '$log', 'CONST'];

    angular.module('app').component('myapp', {
        templateUrl: 'form.html',
        controller: MyAppController,
        controllerAs: 'mac'
    });
})();


(function() {
    var MultiplyDirective = function() {
        var multiply = function(x, y) {
            return x * y;
        };

        return {
            restrict: 'A',
            scope: {
                method: '&multiply',
                numbers: '='
            },
            link: function(scope, element) {
                element.bind('click', function(event) {
                    event.preventDefault();
                    var result = multiply(scope.numbers.fnum, scope.numbers.snum);
                    scope.method()(result);
                });
            }
        };
    };

    angular.module('app').directive('multiply', MultiplyDirective);
})();
