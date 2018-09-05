angular.module('ToDo').controller('todoTemplateController',
    function (todo, $scope, $uibModalInstance, translationService, myTranslate) {
        $scope.name = 'top';
        $scope.todo = todo;

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
