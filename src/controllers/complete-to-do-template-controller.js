angular.module('ToDo').controller('completeToDoTemplateController',
    function ($scope, $uibModalInstance, completetodo, translationService, selectLang) {
    $scope.completetodo = completetodo;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.translate = function () {
        translationService.getTranslation($scope, selectLang);
    };
    $scope.translate();
});
