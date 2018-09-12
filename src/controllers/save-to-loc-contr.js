angular.module('ToDo').controller('saveToLocContr',
    function ($scope, $uibModalInstance, translationService, selectedLanguage, memoryValue, MODAL_ANSWERS, obj) {

        $scope.mes = [];
        $scope.mes[0] = memoryValue[0];
        $scope.mes[1] = memoryValue[1];

        $scope.pieces = [];
        switch (obj) {
            case 'allTodos':
                $scope.pieces[0] = JSON.parse(localStorage.getItem(obj))[0];
                $scope.pieces[1] = JSON.parse(localStorage.getItem(obj))[1];
                break;
            case 'todos':
                $scope.pieces[0] = JSON.parse(localStorage.getItem('allTodos'))[0];
                break;
            case 'completeTodos':
                $scope.pieces[1] = JSON.parse(localStorage.getItem('allTodos'))[1];
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
