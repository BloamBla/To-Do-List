angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal, MODAL_ANSWERS, alertBox) {

        $scope.saveTodosInLocStor = function () {
            if (localStorage.getItem('todos') !== null && localStorage.getItem('todos') !== '[]') {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        selectedLanguage() {
                            return $scope.selectedLanguage;
                        },
                        memoryValue() {
                            return ctrlConnect.getTodos();
                        },
                        obj() {
                            return 'todos';
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
                }, function () {
                    return false;
                });
            } else {
                localStorage.setItem('todos', JSON.stringify(ctrlConnect.getTodos()));
                alertBox.addAlert($scope.translation.LOAD_IN_STOR);
            }
        };

        $scope.loadTodosFromLocalStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    memoryValue() {
                        return ctrlConnect.getTodos();
                    },
                    obj() {
                        return 'todos';
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
                        if (localStorage.getItem('todos') !== null) {
                            res = ctrlConnect.getTodos().concat(JSON.parse(localStorage.getItem('todos')));
                            $scope.setInService('todos',res);
                            alertBox.addAlert($scope.translation.MERGE_FROM_STOR);
                            break;
                        } break;
                    default:
                }
            }, function () {
                return false;
            });
        };

        $scope.saveCompleteTodosInLocStor = function () {
            if (localStorage.getItem('completetodos') !== null && localStorage.getItem('completetodos') !== '[]') {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        selectedLanguage() {
                            return $scope.selectedLanguage;
                        },
                        memoryValue() {
                            return ctrlConnect.getComplTodos();
                        },
                        obj() {
                            return 'completetodos';
                        },
                    },
                });
                modalInstance.result.then(function (answer) {
                    switch (answer) {
                        case MODAL_ANSWERS.SAVE:
                            localStorage.setItem('completetodos', JSON.stringify(ctrlConnect.getComplTodos()));
                            alertBox.addAlert($scope.translation.LOAD_IN_STOR);
                            break;
                        case MODAL_ANSWERS.MERGE:
                            let arr = ctrlConnect.getComplTodos();
                            arr = arr.concat(JSON.parse(localStorage.getItem('completetodos')));
                            localStorage.setItem('completetodos', JSON.stringify(arr));
                            alertBox.addAlert($scope.translation.MERGE_IN_STOR);
                            break;
                        default:
                    }
                }, function () {
                    return false;
                });
            } else {
                localStorage.setItem('completetodos', JSON.stringify(ctrlConnect.getComplTodos()));
                alertBox.addAlert($scope.translation.LOAD_IN_STOR);
            }
        };

        $scope.loadCompleteTodosFromLocalStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    memoryValue() {
                        return ctrlConnect.getComplTodos();
                    },
                    obj() {
                        return 'completetodos';
                    },
                },
            });
            modalInstance.result.then(function (answer) {
                let res = [];
                switch (answer) {
                    case MODAL_ANSWERS.SAVE:
                        res = JSON.parse(localStorage.getItem('completetodos'));
                        $scope.setInService(res);
                        alertBox.addAlert($scope.translation.LOAD_FROM_STOR);
                        break;
                    case MODAL_ANSWERS.MERGE:
                        if (localStorage.getItem('completetodos') !== null) {
                            res = ctrlConnect.getComplTodos().concat(JSON.parse(localStorage.getItem('completetodos')));
                            $scope.setInService('completetodos', res);
                            alertBox.addAlert($scope.translation.MERGE_FROM_STOR);
                            break;
                        } break;
                    default:
                }
            }, function () {
                return false;
            });
        };

        $scope.setInService = function (obj, item) {
            switch (obj) {
                case 'todos' :
                    ctrlConnect.setTodos(item);
                    break;
                case 'completetodos' :
                    ctrlConnect.setComplTodos(item);
                    break;
                default : break;
            }
        };
    });
