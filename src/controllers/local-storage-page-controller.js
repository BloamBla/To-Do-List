angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal, MODAL_ANSWERS, alertBox) {

        $scope.userChoise = 'allTodos';

        $scope.dropTodos = false;
        $scope.dropComplTodos = false;

        $scope.saveInLocStor = function () {
            let [todos, completetodos] = [ctrlConnect.getTodos(), ctrlConnect.getComplTodos()];
            let arr = [todos, completetodos];
            if (localStorage.getItem('allTodos') !== null && localStorage.getItem('allTodos') !== '[[],[]]') {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        selectedLanguage() {
                            return $scope.selectedLanguage;
                        },
                        memoryValue() {
                            return arr;
                        },
                        obj() {
                            return $scope.userChoise;
                        },
                    },
                });
                modalInstance.result.then(function (answer) {
                    switch (answer) {
                        case MODAL_ANSWERS.SAVE:
                            localStorage.setItem('allTodos', JSON.stringify(arr));
                            alertBox.addAlert($scope.translation.LOAD_IN_STOR);
                            break;
                        case MODAL_ANSWERS.MERGE:
                            switch ($scope.userChoise) {
                                case 'allTodos':
                                    todos = todos.concat(JSON.parse(localStorage.getItem($scope.userChoise))[0]);
                                    completetodos = completetodos.concat(JSON.parse(localStorage.getItem($scope.userChoise))[1]);
                                    arr = [todos, completetodos];
                                    localStorage.setItem($scope.userChoise, JSON.stringify(arr));
                                    alertBox.addAlert($scope.translation.MERGE_IN_STOR);
                                    break;
                                case 'todos':
                                    todos = todos.concat(ctrlConnect.getTodos());
                                    arr = [todos, completetodos];
                                    localStorage.setItem('allTodos', JSON.stringify(arr));
                                    break;
                                case 'completeTodos':
                                    completetodos = completetodos.concat(ctrlConnect.getTodos());
                                    arr = [todos, completetodos];
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
                localStorage.setItem('allTodos', JSON.stringify(arr));
                alertBox.addAlert($scope.translation.LOAD_IN_STOR);
            }
        };

        $scope.loadFromLocalStor = function () {
            let [todos, completetodos] = [ctrlConnect.getTodos(), ctrlConnect.getComplTodos()];
            let arr = [todos, completetodos];
            if (localStorage.getItem('allTodos') === null) {
                arr = [[],[]];
                localStorage.setItem('allTodos', JSON.stringify(arr));
            }
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    memoryValue() {
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
                            $scope.mergeInService($scope.userChoise, [todos, completetodos]);
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
            let [todos, completetodos] = [ctrlConnect.getTodos(), ctrlConnect.getComplTodos()];
            switch (obj) {
                case 'allTodos':
                    todos = todos.concat(item[0]);
                    completetodos = completetodos.concat(item[1]);
                    ctrlConnect.setTodos(todos);
                    ctrlConnect.setComplTodos(completetodos);
                    break;
                case 'todos':
                    todos = todos.concat(item[0]);
                    ctrlConnect.setTodos(todos);
                    break;
                case 'completeTodos':
                    completetodos = completetodos.concat(item[1]);
                    ctrlConnect.setComplTodos(completetodos);
                    break;
                default :
                    break;
            }
        };
    });
