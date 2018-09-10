angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal, MODAL_ANSWERS, alertBox) {

        $scope.saveInLocStor = function () {
            if (localStorage.getItem('todos') !== null && localStorage.getItem('todos') !== '[]') {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        selectLang() {
                            return $scope.selectedLanguage;
                        },
                        todosMemoryValue() {
                            return ctrlConnect.getTodos();
                        },
                    },
                });
                modalInstance.result.then(function (answer) {
                    switch (answer) {
                        case MODAL_ANSWERS.SAVE:
                            localStorage.setItem('todos', JSON.stringify(ctrlConnect.getTodos()));
                            alertBox.addAlert($scope.translation.LOAD_IN_STOR);
                            break;
                        case MODAL_ANSWERS.MERGE:
                            let arr = ctrlConnect.getTodos();
                            arr = arr.concat(JSON.parse(localStorage.getItem('todos')));
                            localStorage.setItem('todos', JSON.stringify(arr));
                            alertBox.addAlert($scope.translation.MERGE_IN_STOR);
                            break;
                        default:
                    }
                },);
            } else {
                localStorage.setItem('todos', JSON.stringify(ctrlConnect.getTodos()));
                alertBox.addAlert($scope.translation.LOAD_IN_STOR);
            }
        };

        $scope.loadFromLocalStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    selectLang() {
                        return $scope.selectedLanguage;
                    },
                    todosMemoryValue() {
                        return ctrlConnect.getTodos();
                    },
                },
            });
            modalInstance.result.then(function (answer) {
                let res = [];
                switch (answer) {
                    case MODAL_ANSWERS.SAVE:
                        res = JSON.parse(localStorage.getItem('todos'));
                        $scope.setInService(res);
                        alertBox.addAlert($scope.translation.LOAD_FROM_STOR);
                        break;
                    case MODAL_ANSWERS.MERGE:
                        res = ctrlConnect.getTodos().concat(JSON.parse(localStorage.getItem('todos')));
                        $scope.setInService(res);
                        alertBox.addAlert($scope.translation.MERGE_FROM_STOR);
                        break;
                    default:
                }
            });
        };

        $scope.setInService = function (item) {
            ctrlConnect.setTodos(item);
        };
    });
