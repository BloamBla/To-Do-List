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
    })
    .service('alertBox', function () {
        const _alert = [];
        return {
            addAlert(msg) {
                const dateNow = Date.now();
                _alert.push({title : msg, id : dateNow});
                console.log(_alert.indexOf({id : Date.now()}));
                setTimeout(function () {
                    _alert.splice(_alert.indexOf({id : dateNow}), 1);
                    console.log(_alert);
                }, 5000);
            },
            getAlert() {
                return _alert;
            },
        };
    });
