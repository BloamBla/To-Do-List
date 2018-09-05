import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'angular';
import 'angular-ui-bootstrap';
import 'angular-resource';
import 'angular-local-storage';
import 'angular-route';
import '../styles/main.scss';
import './controllers/to-do-module.js';
import './controllers/todo-template-controller.js';
import './controllers/complete-to-do-template-controller.js';
import './controllers/local-storage-page-controller.js';
import './controllers/main-page-controller.js';
import './controllers/save-to-loc-contr.js';
import './controllers/noticeCrtl.js';

angular.module('ToDo').controller('todoController',
    ['$scope', 'translationService', 'ctrlConnect', '$route', '$routeParams', '$location',
        function ($scope, translationService, ctrlConnect, $route, $routeParams, $location) {

            $scope.translate = function(){
                translationService.getTranslation($scope, $scope.selectedLanguage);
            };
            if (sessionStorage.getItem('currentLanguage')) {
                $scope.selectedLanguage = sessionStorage.getItem('currentLanguage');
            } else {$scope.selectedLanguage = 'en';}
            $scope.translate();

            $scope.saveLanguage = function() {
                sessionStorage.setItem('currentLanguage', $scope.selectedLanguage);
                $scope.translate();
            };

            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;

            $scope.name = 'pageController';
            $scope.params = $routeParams;
        }]);
