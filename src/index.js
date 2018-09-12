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
import './controllers/notice-crtl.js';
import './controllers/edit-done-or-delete-goals-controller.js';

angular.module('ToDo').controller('todoController',
    ['$scope', 'translationService', 'ctrlConnect',
        function ($scope, translationService, ctrlConnect) {

            $scope.translate = function(){
                translationService.getTranslation($scope, $scope.selectedLanguage);
            };
            if (localStorage.getItem('currentLanguage')) {
                $scope.selectedLanguage = localStorage.getItem('currentLanguage');
            } else {$scope.selectedLanguage = 'en';}
            $scope.translate();

            $scope.saveLanguage = function() {
                localStorage.setItem('currentLanguage', $scope.selectedLanguage);
                $scope.translate();
            };

            $scope.onLoad = function () {
                let arr = [];
                if (localStorage.getItem('todos') !== null) {
                    if (JSON.parse(localStorage.getItem('allTodos')) !== null){
                        arr = JSON.parse(localStorage.getItem('allTodos'));
                        arr[0] = arr[0].concat(JSON.parse(localStorage.getItem('todos')));
                        localStorage.setItem('allTodos', JSON.stringify(arr));
                        localStorage.setItem('todos', JSON.stringify([]));
                    } else {
                        arr = [[],[]];
                        arr[0] = arr[0].concat(JSON.parse(localStorage.getItem('todos')));
                        localStorage.setItem('allTodos', JSON.stringify(arr));
                    }
                }
                if (localStorage.getItem('completetodos') !== null) {
                    if (JSON.parse(localStorage.getItem('allTodos')) !== null){
                        arr = JSON.parse(localStorage.getItem('allTodos'));
                        arr[1] = arr[1].concat(JSON.parse(localStorage.getItem('completetodos')));
                        localStorage.setItem('allTodos', JSON.stringify(arr));
                        localStorage.setItem('completetodos', JSON.stringify([]));
                    } else {
                        arr = [[],[]];
                        arr[1] = arr[1].concat(JSON.parse(localStorage.getItem('completetodos')));
                        localStorage.setItem('allTodos', JSON.stringify(arr));
                    }
                }
                arr = JSON.parse(localStorage.getItem('allTodos'));
                if (arr !== null && arr !== undefined) {
                    ctrlConnect.setTodos(arr[0]);
                    ctrlConnect.setComplTodos(arr[1]);
                }
            };

            $scope.onLoad();
        }]);
