angular.module('ToDo').controller('editDoneOrDeleteGoalsController',
    function ($scope, $uibModalInstance, todo, translationService, selectLang, MODAL_ANSWERS) {

        $scope.icons = false;
        $scope.edit = false;

        $scope.todo = todo;

        $scope.save = function () {
            $scope.editIt();
        };

        $scope.success = function () {
            $uibModalInstance.close(MODAL_ANSWERS.SUCCESS);
        };

        $scope.delete = function () {
            $uibModalInstance.close(MODAL_ANSWERS.DELETE);
        };

        $scope.editIt = function () {
            $scope.edit = !$scope.edit;
        };

        $scope.close = function () {
            $uibModalInstance.close(MODAL_ANSWERS.SAVE);
        };

        $scope.togleIcons = function () {
            $scope.icons = !$scope.icons;
        };

        $scope.translate = function () {
            translationService.getTranslation($scope, selectLang);
        };
        $scope.translate();
    });
