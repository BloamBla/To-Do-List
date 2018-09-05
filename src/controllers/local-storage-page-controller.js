angular.module('ToDo').controller('localStoragePageController',
    function ($scope, ctrlConnect, $uibModal, MODAL_ANSWERS, alertBox) {
        let res = [];

        $scope.saveInLocStor = function () {
            if (localStorage.getItem('todos') !== null) {
                const modalInstance = $uibModal.open({
                    templateUrl: './js/templates/loc-stor-confirm.html',
                    controller: 'saveToLocContr',
                    resolve: {
                        myTranslate() {
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
                            if ($scope.selectedLanguage === 'ru') {
                                alertBox.addAlert('Задачи успешно добавлены в локальное хранилище.');
                                console.log(alertBox.getAlert());
                            } else {
                                alertBox.addAlert('Goals successfully added in local storage.');
                                console.log(alertBox.getAlert());
                            }
                            ctrlConnect.setTodos([]);
                            break;
                        case MODAL_ANSWERS.MERGE:
                            let arr = ctrlConnect.getTodos();
                            arr = arr.concat(JSON.parse(localStorage.getItem('todos')));
                            localStorage.setItem('todos', JSON.stringify(arr));
                            if ($scope.selectedLanguage === 'ru') {
                                alertBox.addAlert('Задачи успешно добавлены в локальное хранилище.');
                            } else {alertBox.addAlert('Goals successfully added in local storage.');}
                            ctrlConnect.setTodos([]);
                            break;
                        default:
                    }
                },);
            } else {localStorage.setItem('todos', JSON.stringify(ctrlConnect.getTodos()));}
        };

        $scope.loadFromLocalStor = function () {
            const modalInstance = $uibModal.open({
                templateUrl: './js/templates/loc-stor-confirm.html',
                controller: 'saveToLocContr',
                resolve: {
                    myTranslate() {
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
                        res = JSON.parse(localStorage.getItem('todos'));
                        $scope.setInService(res);
                        if ($scope.selectedLanguage === 'ru') {
                            alertBox.addAlert('Задачи успешно добавлены в локальное хранилище.');
                        } else {alertBox.addAlert('Goals successfully added in local storage.');}
                        break;
                    case MODAL_ANSWERS.MERGE:
                        res = ctrlConnect.getTodos().concat(JSON.parse(localStorage.getItem('todos')));
                        $scope.setInService(res);
                        if ($scope.selectedLanguage === 'ru') {
                            alertBox.addAlert('Задачи успешно добавлены в локальное хранилище.');
                        } else {alertBox.addAlert('Goals successfully added in local storage.');}
                        break;
                    default:
                }
            });
        };

        $scope.setInService = function (item) {
            ctrlConnect.setTodos(item);
        };
    });
