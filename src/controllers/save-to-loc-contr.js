angular.module('ToDo').controller('saveToLocContr',
    function ($scope, $uibModalInstance, translationService, myTranslate, todosMemoryValue, MODAL_ANSWERS) {

        const arr = todosMemoryValue;
        $scope.mes = [];
        $scope.mes = $scope.mes.concat(arr);

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
            translationService.getTranslation($scope, myTranslate);
        };
        $scope.translate();
    });
