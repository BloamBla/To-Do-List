angular.module('ToDo').controller('saveToLocContr',
    function ($scope, $uibModalInstance, translationService, selectedLanguage, memoryValue, MODAL_ANSWERS, obj) {

        let [todos, completetodos] = [memoryValue[0], memoryValue[1]];
        $scope.mes = [todos, completetodos];

        $scope.pieces = [];
        [todos, completetodos] = [JSON.parse(localStorage.getItem(obj))[0], JSON.parse(localStorage.getItem(obj))[1]];
        switch (obj) {
            case 'allTodos':
                $scope.pieces[0] = todos;
                $scope.pieces[1] = completetodos;
                break;
            case 'todos':
                $scope.pieces[0] = todos;
                break;
            case 'completeTodos':
                $scope.pieces[1] = completetodos;
                break;
            default: break;
        }

        $scope.save = function () {
            $uibModalInstance.close(MODAL_ANSWERS.SAVE);
        };

        $scope.merge = function () {
            $uibModalInstance.close(MODAL_ANSWERS.MERGE);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

        $scope.translate = function () {
            translationService.getTranslation($scope, selectedLanguage);
        };
        $scope.translate();
    });
