angular.module('ToDo').controller('saveToLocContr',
    function ($scope, $uibModalInstance, translationService, selectedLanguage, memoryValue, MODAL_ANSWERS, obj) {

        $scope.mes = [];
        $scope.mes = $scope.mes.concat(memoryValue);

        $scope.pieces = [];
        $scope.pieces = JSON.parse(localStorage.getItem(obj));

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
