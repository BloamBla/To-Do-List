angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal) {
        let res = [];
        $scope.translate();

        $scope.saveInLocStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/locStorConfirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    myTranslate() {
                        return $scope.selectedLanguage;
                    },
                    myValues() {
                        return ctrlConnect.getTodos();
                    },
                },
            });
            modalInstance.result.then(function (answer) {
                switch(answer) {
                    case 0:
                        localStorage.setItem('todos', JSON.stringify(ctrlConnect.getTodos()));
                        break;
                    case 1:
                        let arr = ctrlConnect.getTodos();
                        arr = arr.concat(JSON.parse(localStorage.getItem('todos')));
                        console.log(arr);
                        localStorage.setItem('todos', JSON.stringify(arr));
                        break;
                    default:
                }
            },);
        };

        $scope.loadFromLocalStor = function() {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/locStorConfirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    myTranslate() {
                        return $scope.selectedLanguage;
                    },
                    myValues() {
                        return ctrlConnect.getTodos();
                    },
                },
            });
            modalInstance.result.then(function (answer) {
                switch (answer) {
                    case 0:
                        res = JSON.parse(localStorage.getItem('todos'));
                        console.log(res);
                        $scope.setInService(res);
                        break;
                    case 1:
                        res = ctrlConnect.getTodos().concat(JSON.parse(localStorage.getItem('todos')));
                        console.log(res);
                        $scope.setInService(res);
                        break;
                    default:
                }
            });
        };

        $scope.setInService = function (item) {
            ctrlConnect.setTodos(item);
        };
    });
