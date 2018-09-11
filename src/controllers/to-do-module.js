angular.module('ToDo', ['ui.bootstrap', 'ngResource', 'ngRoute', 'LocalStorageModule'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/localStore', {
                templateUrl: 'webs/local-store.html',
                controller: 'localStoragePageController',
            })
            .when('/main', {
                templateUrl: 'webs/main.html',
                controller: 'mainPageController',
            });
        $routeProvider.otherwise({redirectTo: '/main'});
    })
    .service('translationService', function ($resource) {
        this.getTranslation = function ($scope, language) {
            const languageFilePath = `./src/translations/translation_${language}.json`;
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    })
    .service('ctrlConnect', function () {
        let _todos = [];
        let _complTodos = [];
        return {
            setTodos(todos) {
                _todos = todos;
                return _todos;
            },
            getTodos() {
                return _todos;
            },
            setComplTodos(complTodos) {
                _complTodos = complTodos;
                return _complTodos;
            },
            getComplTodos() {
                return _complTodos;
            },
        };
    })
    .constant('MODAL_ANSWERS', {
        SAVE: 0,
        MERGE: 1,
        SUCCESS: 2,
        DELETE: 3,
        EDIT: 4,
    })
    .service('alertBox', function ($rootScope) {
        const _alert = [];
        return {
            addAlert(msg) {
                const dateNow = Date.now();
                _alert.unshift({title : msg, id : dateNow});
                setTimeout(function () {
                    _alert.splice(_alert.indexOf({id : dateNow}), 1);
                    $rootScope.$apply();
                }, 5000);
            },
            getAlert() {
                return _alert;
            },
        };
    });
