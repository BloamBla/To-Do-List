angular.module('ToDo').controller('editDoneOrDeleteGoalsController',
    function ($scope, $uibModalInstance, todo, translationService, selectLang, MODAL_ANSWERS) {

        $scope.todo = todo;

        $scope.save = function () {
            $uibModalInstance.close(MODAL_ANSWERS.SAVE);
        };

        $scope.success = function () {
            $uibModalInstance.close(MODAL_ANSWERS.SUCCESS);
        };

        $scope.delete = function () {
            $uibModalInstance.close(MODAL_ANSWERS.DELETE);
        };

        $scope.translate = function () {
            translationService.getTranslation($scope, selectLang);
        };
        $scope.translate();
    });
