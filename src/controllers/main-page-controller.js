angular.module('ToDo').controller('mainPageController', ['$scope', '$uibModal', 'ctrlConnect', 'MODAL_ANSWERS',
    function ($scope, $uibModal, ctrlConnect, MODAL_ANSWERS){

        let sortFromAToZ = function(array){
            array.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
        };

        let sortFromZToA = function(array){
            array.sort(function (a, b) {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        };

        $scope.sortAToZ = true;
        $scope.sortZToA = false;

        $scope.toDoInput = '';

        $scope.todos = [];

        $scope.completetodos = [];

        $scope.onLoad = function () {
            $scope.todos = ctrlConnect.getTodos();
            if ($scope.todos !== null && $scope.todos !== undefined) {
                $scope.completetodos = ctrlConnect.getComplTodos();
                sortFromAToZ($scope.todos);
            } else {
                $scope.todos = [];
                $scope.completetodos = ctrlConnect.getComplTodos();
            }
        };

        $scope.onLoad();

        $scope.setInService = function () {
            let arr = $scope.todos;
            ctrlConnect.setTodos(arr);
            arr = $scope.completetodos;
            ctrlConnect.setComplTodos(arr);
            localStorage.setItem('completetodos', JSON.stringify(arr));
        };

        $scope.addToDo = function (inputForm) {
            inputForm.$setSubmitted();
            if (!inputForm.$valid) {
                return;
            }
            $scope.todos.push(
                {
                    title: $scope.toDoInput,
                    states: {done: false, active: false},
                });
            if ($scope.sortAToZ) {
                $scope.sortFromAToZ();
            } else {
                $scope.sortFromZToA();
            }
            inputForm.$setPristine();
            inputForm.$setUntouched();
            inputForm.$valid = true;
            $scope.toDoInput = '';
        };

        $scope.sortFromAToZ = function () {
            $scope.sortZToA = false;
            $scope.sortAToZ = true;
            const arr = $scope.todos;
            sortFromAToZ(arr);
        };

        $scope.sortFromZToA = function () {
            $scope.sortAToZ = false;
            $scope.sortZToA = true;
            const arr = $scope.todos;
            sortFromZToA(arr);
        };

        $scope.deleteGoal = function ($index, todo) {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/confirm.html',
                controller: 'todoTemplateController',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    todo() {
                        return todo;
                    },
                },
            });

            modalInstance.result.then(function () {
                $scope.todos.splice($index, 1);
            }, function () {
                return false;
            });
        };


        $scope.workWithGoal = function ($index, todo) {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/goals-template.html',
                controller: 'editDoneOrDeleteGoalsController',
                resolve: {
                    todo() {
                        return todo;
                    },
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                },
            });

            modalInstance.result.then(function (answer) {
                switch (answer) {
                    case MODAL_ANSWERS.SAVE:
                        break;
                    case MODAL_ANSWERS.SUCCESS:
                        $scope.doneGoal($index);
                        break;
                    case MODAL_ANSWERS.DELETE:
                        $scope.deleteGoal($index);
                        break;
                    default:
                }
                $scope.sortFromAToZ($scope.todos);
            }, function () {
                return false;
            });
        };

        $scope.deleteComplGoal = function ($event, $index, completetodo) {
            $event.preventDefault();
            $event.stopPropagation();
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/confirm.html',
                controller: 'completeToDoTemplateController',
                resolve: {
                    selectedLanguage() {
                        return $scope.selectedLanguage;
                    },
                    completetodo() {
                        return completetodo;
                    },
                },
            });

            modalInstance.result.then(function () {
                $scope.completetodos.splice($index, 1);
            }, function () {
                return false;
            });
        };

        $scope.doneGoal = function ($index) {
            $scope.completetodos = $scope.completetodos.concat($scope.todos.slice($index, $index + 1));
            $scope.todos.splice($index, 1);
            const arr = $scope.completetodos;
            sortFromAToZ(arr);
        };

        $scope.returnGoal = function ($event, $index) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.todos = $scope.todos.concat($scope.completetodos.slice($index, $index + 1));
            $scope.completetodos.splice($index, 1);
            if ($scope.sortAToZ === true) {
                const arr = $scope.todos;
                sortFromAToZ(arr);
            } else {
                const arr = $scope.todos;
                sortFromZToA(arr);
            }
        };
    }]);
