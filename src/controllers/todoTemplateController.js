angular.module('ToDo').controller('todoTemplateController', function (todo, $scope, $uibModalInstance) {
    $scope.name = 'top';
    $scope.todo = todo;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});
