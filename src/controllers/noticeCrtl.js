angular.module('ToDo').controller('noticeCrtl', function ($scope, alertBox) {

    $scope.getAlerts = function () {
        return alertBox.getAlert();
    };
});
