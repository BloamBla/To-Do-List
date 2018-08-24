angular.module("ToDo", ["ui.bootstrap"])
    .controller("todoController", ["$scope", "$uibModal",  function ($scope, $uibModal) {
        $scope.toDoInput = "";

        $scope.todos = [];

        $scope.completetodos = [];

        $scope.addToDo = function () {
            if ($scope.toDoInput === "" || $scope.toDoInput === " ") {
                return false;
            }
            $scope.todos.push({title: $scope.toDoInput, done: false, active: false, edit: false});
            $scope.toDoInput = "";
        };

        $scope.clearCompleted = function () {
            var todosArr = $scope.todos;
            $scope.completetodos = $scope.completetodos.concat(todosArr.filter(todosArrItem => todosArrItem.done));
            $scope.todos = todosArr.filter(todosArrPart => !todosArrPart.done);
        };

        $scope.doneThisGoal = function ($index, todo, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.completetodos = $scope.completetodos.concat($scope.todos.slice($index, $index + 1));
            $scope.todos.splice($index, 1);
            todo.active = false;
            todo.done = true;
        };

        $scope.sortFromAToZ = function () {
            let arr = $scope.todos;
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
            let arr = $scope.todos;
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

        $scope.deleteThisGoal = function ($event, $index, todo) {
            $event.preventDefault();
            $event.stopPropagation();
            let modalInstance = $uibModal.open({
                templateUrl: 'js/confirm.html',
                controller: function ($scope, $uibModalInstance, todo) {
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
                    todo: function () {
                        return todo;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.todos.splice($index, 1);
            }, function () {
            });
        };

        $scope.deleteComplGoal = function ($event, $index, completetodo) {
            $event.preventDefault();
            $event.stopPropagation();
            let modalInstance = $uibModal.open({
                templateUrl: 'js/confirm.html',
                controller: function ($scope, $uibModalInstance, completetodo) {
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
                    completetodo: function () {
                        return completetodo;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.completetodos.splice($index, 1);
            }, function () {
            });
        };

        $scope.editThisGoal = function ($event, todo) {
            $event.preventDefault();
            $event.stopPropagation();
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                if (i === $scope.todos.indexOf(todo)) {
                    continue;
                }
                $scope.todos[i].edit = false;
            }
            todo.edit = !todo.edit;
        };

        $scope.toggleActive = ($event, todo) => {
            $event.preventDefault();
            $event.stopPropagation();
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                if (i === $scope.todos.indexOf(todo)) {
                    $scope.todos[i].edit = false;
                    continue;
                }
                $scope.todos[i].active = false;
                $scope.todos[i].edit = false;
            }
            todo.active = !todo.active;
        };

        $scope.stopProp = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        };

        $scope.clearActive = function () {
            for (let i = 0; i <= $scope.todos.length - 1; i++) {
                $scope.todos[i].active = false;
                $scope.todos[i].edit = false;
            }
        }
    }]);