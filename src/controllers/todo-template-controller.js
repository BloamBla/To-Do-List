angular.module('ToDo').controller('todoTemplateController',
    function (todo, $scope, $uibModalInstance, translationService, selectLang) {
        $scope.name = 'top';
        $scope.todo = todo;

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
