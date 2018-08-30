angular.module('ToDo').controller('completeToDoTemplateController', function ($scope, $uibModalInstance, completetodo) {
    $scope.name = 'top';
    $scope.completetodo = completetodo;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});
