angular.module('ToDo').controller('noticeCrtl', function ($scope, alertBox) {

    setInterval(function() {
        $scope.alerts = alertBox.getAlert();
        $scope.$apply();
        }, 1000);

});
