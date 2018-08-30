import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'angular';
import 'angular-ui-bootstrap';
import 'angular-resource';
import '../styles/main.scss';

angular.module('ToDo', ['ui.bootstrap', 'ngResource']).controller('todoController',
    ['$scope', '$uibModal', '$resource', function ($scope, $uibModal, $resource) {

        $scope.sortAToZ = true;
        $scope.sortZToA = false;

        $scope.toDoInput = '';

        $scope.todos = [];

        $scope.completetodos = [];

        $scope.addToDo = function (inputForm) {
            inputForm.$setSubmitted();
            if (!inputForm.$valid) {
                return;
            }
            $scope.todos.push(
                {
                    title: $scope.toDoInput,
                    states: {done: false, active: false, edit: false}
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
            arr.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
        };

        $scope.sortFromZToA = function () {
            $scope.sortAToZ = false;
            $scope.sortZToA = true;
            const arr = $scope.todos;
            arr.sort(function (a, b) {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        };

        $scope.deleteGoal = function ($event, $index, todo) {
            $event.preventDefault();
            $event.stopPropagation();
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/confirm.html',
                controller($scope, $uibModalInstance) {
                    $scope.name = 'top';
                    $scope.todo = todo;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    todo() {
                        return todo;
                    },
                },
            });

            modalInstance.result.then(function () {
                $scope.todos.splice($index, 1);
            },);
        };

        $scope.deleteComplGoal = function ($event, $index, completetodo) {
            $event.preventDefault();
            $event.stopPropagation();
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/confirm.html',
                controller($scope, $uibModalInstance) {
                    $scope.name = 'top';
                    $scope.completetodo = completetodo;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    completetodo() {
                        return completetodo;
                    },
                },
            });

            modalInstance.result.then(function () {
                $scope.completetodos.splice($index, 1);
            },);
        };

        $scope.doneGoal = function ($index, todo, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.completetodos = $scope.completetodos.concat($scope.todos.slice($index, $index + 1));
            $scope.todos.splice($index, 1);
            const arr = $scope.completetodos;
            arr.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
            todo.states.active = false;
            todo.states.done = true;
        };

        $scope.editGoal = function ($event, todo) {
            $event.preventDefault();
            $event.stopPropagation();
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                if (i === $scope.todos.indexOf(todo)) {
                    continue;
                }
                $scope.todos[i].states.edit = false;
            }
            todo.states.edit = !todo.states.edit;
            const arr = $scope.todos;
            arr.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
        };

        $scope.returnGoal = function ($event, $index) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.todos = $scope.todos.concat($scope.completetodos.slice($index, $index + 1));
            $scope.completetodos.splice($index, 1);
            if ($scope.sortAToZ === true) {
                const arr = $scope.todos;
                arr.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                const arr = $scope.todos;
                arr.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (a.title < b.title) {
                        return 1;
                    }
                    return 0;
                });
            }
        };

        $scope.toggleActive = ($event, todo) => {
            $event.preventDefault();
            $event.stopPropagation();
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                if (i === $scope.todos.indexOf(todo)) {
                    $scope.todos[i].states.edit = false;
                    continue;
                }
                $scope.todos[i].states.active = false;
                $scope.todos[i].states.edit = false;
            }
            todo.states.active = !todo.states.active;
        };

        $scope.stopProp = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        };

        $scope.clearActive = function () {
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                $scope.todos[i].states.active = false;
                $scope.todos[i].states.edit = false;
            }
        };

        $scope.translate = function () {
                const languageFilePath = `src/translations/translation_${$scope.selectedLanguage}.json`;
                $resource(languageFilePath).get(function (data) {
                    $scope.translation = data;
                });
            };

        $scope.selectedLanguage = 'en';
        $scope.translate();
    }]);
