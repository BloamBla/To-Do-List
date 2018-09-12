angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal, MODAL_ANSWERS, alertBox) {

        $scope.userChoise = 'allTodos';

        $scope.dropTodos = false;
        $scope.dropComplTodos = false;

        $scope.saveInLocStor = function () {
            if (localStorage.getItem($scope.userChoise) !== null && localStorage.getItem($scope.userChoise) !== '[[],[]]') {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        selectedLanguage() {
                            return $scope.selectedLanguage;
                        },
                        memoryValue() {
                            const arr = [];
                            arr[0] = ctrlConnect.getTodos();
                            arr[1] = ctrlConnect.getComplTodos();
                            return arr;
                        },
                        obj() {
                            return $scope.userChoise;
                        },
                    },
                });
                modalInstance.result.then(function (answer) {
                    let arr = [];
                    switch (answer) {
                        case MODAL_ANSWERS.SAVE:
                            arr = [];
                            arr[0] = ctrlConnect.getTodos();
                            arr[1] = ctrlConnect.getComplTodos();
                            localStorage.setItem('allTodos', JSON.stringify(arr));
                            alertBox.addAlert($scope.translation.LOAD_IN_STOR);
                            break;
                        case MODAL_ANSWERS.MERGE:
                            arr = [];
                            switch ($scope.userChoise) {
                                case 'allTodos':
                                    arr[0] = ctrlConnect.getTodos();
                                    arr[1] = ctrlConnect.getComplTodos();
                                    arr[0] = arr[0].concat(JSON.parse(localStorage.getItem($scope.userChoise))[0]);
                                    arr[1] = arr[1].concat(JSON.parse(localStorage.getItem($scope.userChoise))[1]);
                                    localStorage.setItem($scope.userChoise, JSON.stringify(arr));
                                    alertBox.addAlert($scope.translation.MERGE_IN_STOR);
                                    break;
                                case 'todos':
                                    arr = JSON.parse(localStorage.getItem('allTodos'));
                                    arr[0] = arr[0].concat(ctrlConnect.getTodos());
                                    localStorage.setItem('allTodos', JSON.stringify(arr));
                                    break;
                                case 'completeTodos':
                                    arr = JSON.parse(localStorage.getItem('allTodos'));
                                    arr[1] = arr[1].concat(ctrlConnect.getTodos());
                                    localStorage.setItem('allTodos', JSON.stringify(arr));
                                    break;
                                default: break;
                            }
                            break;
                        default: break;
                    }
                }, function () {
                    return false;
                });
            } else {
                const arr = [];
                arr[0] = ctrlConnect.getTodos();
                arr[1] = ctrlConnect.getComplTodos();
                localStorage.setItem('allTodos', JSON.stringify(arr));
                alertBox.addAlert($scope.translation.LOAD_IN_STOR);
            }
        };

        $scope.loadFromLocalStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    memoryValue() {
                        const arr = [];
                        arr[0] = ctrlConnect.getTodos();
                        arr[1] = ctrlConnect.getComplTodos();
                        return arr;
                    },
                    obj() {
                        return $scope.userChoise;
                    },
                },
            });
            modalInstance.result.then(function (answer) {
                let res = [];
                switch (answer) {
                    case MODAL_ANSWERS.SAVE:
                        res = JSON.parse(localStorage.getItem('allTodos'));
                        $scope.setInService($scope.userChoise, res);
                        alertBox.addAlert($scope.translation.LOAD_FROM_STOR);
                        break;
                    case MODAL_ANSWERS.MERGE:
                        if (localStorage.getItem('allTodos') !== null) {
                            res[0] = JSON.parse(localStorage.getItem('allTodos'))[0];
                            res[1] = JSON.parse(localStorage.getItem('allTodos'))[1];
                            $scope.mergeInService($scope.userChoise, res);
                            alertBox.addAlert($scope.translation.MERGE_FROM_STOR);
                            break;
                        }
                        break;
                    default:
                }
            }, function () {
                return false;
            });
        };

        $scope.setInService = function (obj, item) {
            switch (obj) {
                case 'allTodos':
                    ctrlConnect.setTodos(item[0]);
                    ctrlConnect.setComplTodos(item[1]);
                    break;
                case 'todos' :
                    ctrlConnect.setTodos(item[0]);
                    break;
                case 'completeTodos' :
                    ctrlConnect.setComplTodos(item[1]);
                    break;
                default :
                    break;
            }
        };


        $scope.mergeInService = function (obj, item) {
            const arr =[];
            arr[0] = ctrlConnect.getTodos();
            arr[1] = ctrlConnect.getComplTodos();
            switch (obj) {
                case 'allTodos':
                    arr[0] = arr[0].concat(item[0]);
                    arr[1] = arr[1].concat(item[1]);
                    ctrlConnect.setTodos(arr[0]);
                    ctrlConnect.setComplTodos(arr[1]);
                    break;
                case 'todos':
                    arr[0] = arr[0].concat(item[0]);
                    ctrlConnect.setTodos(arr[0]);
                    break;
                case 'completeTodos':
                    arr[1] = arr[0].concat(item[1]);
                    ctrlConnect.setComplTodos(arr[1]);
                    break;
                default :
                    break;
            }
        };
    });
