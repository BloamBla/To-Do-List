angular.module('ToDo', ['ui.bootstrap', 'ngResource', 'ngRoute', 'LocalStorageModule'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/localStore', {
                templateUrl: 'webs/localStore.html',
                controller: 'localStoragePageController',
            })
            .when('/main', {
                templateUrl: 'webs/main.html',
                controller: 'mainPageController',
            });
        $routeProvider.otherwise({redirectTo: '/main'});
    })
    .service('translationService', function($resource) {
        this.getTranslation = function($scope, language) {
            const languageFilePath = `./src/translations/translation_${language}.json`;
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    })
    .service('ctrlConnect', function () {
        let _todos = [];
        return {
            setTodos(todos) {
                _todos = todos;
                return _todos;
                alert(_todos);
            },
            getTodos() {
                return _todos;
            },
        };
    })
    .constant('MODAL_ANSWERS', {
        SAVE : 0,
        MERGE : 1,
    });
