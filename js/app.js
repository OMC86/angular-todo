angular.module('TodoApp', ['ngRoute', 'angular-storage', 'UserService', 'TodoService'])
.config(function($routeProvider) {
 
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .when('/accounts/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .when('/logout', {
        templateUrl: 'templates/logout.html',
        controller: 'LogoutController'
    })
    .when('/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    })
    .when('/todo/edit/:id', {
        templateUrl: 'templates/edit-todo.html',
        controller: 'EditTodoController'
});

});







