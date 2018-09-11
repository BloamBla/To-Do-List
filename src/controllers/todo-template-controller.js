angular.module('ToDo').controller('todoTemplateController',
    function (todo, $scope, $uibModalInstance, translationService, selectedLanguage) {
        $scope.name = 'top';
        $scope.todo = todo;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss($scope.index, $scope.todo);
        };

        $scope.translate = function () {
            translationService.getTranslation($scope, selectedLanguage);
        };
        $scope.translate();
    });
