import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'angular';
import 'angular-ui-bootstrap';
import 'angular-resource';
import 'angular-local-storage';
import 'angular-route';
import '../styles/main.scss';
import './controllers/toDoModule.js';
import './controllers/todoTemplateController.js';
import './controllers/completetodoTemplateController.js';
import './controllers/localStoragePageController.js';
import './controllers/mainPageController.js';
import './controllers/saveToLocContr.js';

angular.module('ToDo').controller('todoController',
    ['$scope', 'translationService', 'ctrlConnect', '$route', function ($scope, translationService, ctrlConnect, $route, $routeParams, $location) {

        $scope.translate = function(){
            translationService.getTranslation($scope, $scope.selectedLanguage);
        };
        $scope.selectedLanguage = 'en';
        $scope.translate();

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.name = 'pageController';
        $scope.params = $routeParams;
    }]);
