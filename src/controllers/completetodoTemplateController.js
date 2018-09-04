angular.module('ToDo').controller('completeToDoTemplateController',
    function ($scope, $uibModalInstance, completetodo, translationService, myTranslate) {
    $scope.name = 'top';
    $scope.completetodo = completetodo;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.translate = function () {
        translationService.getTranslation($scope, myTranslate);
    };
    $scope.translate();
});
