angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, UserAPIService, store) {
 
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
 
                UserAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    if ($scope.data.username == $scope.registrationUser.username && $scope.data.password == $scope.registrationUser.password){
                        alert("You have successfully registered to Angular Todo");
 
                        UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.data).then(function(results) {
                            $scope.token = results.data.token;
                            store.set('username', $scope.registrationUser.username);
                            store.set('authToken', $scope.token);
                        }).catch(function(err) {
                            console.log(err);
                        });
                    };
                }).catch(function(err) {
                    console.log(err)
                });
            }
        }
    })

    .controller('TodoController', function($scope, $location, TodoAPIService, store) {
        var url = "https://morning-castle-91468.herokuapp.com/";
 
        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');
 
        $scope.todos = [];

        TodoAPIService.getTodos(url + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data;
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });
 
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);
 
                TodoAPIService.createTodo(url + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results)
                }).catch(function(err) {
                    console.log(err)
                });
            }
        };

         $scope.editTodo = function(id) {
        $location.path("/todo/edit/" + id);
    };
 
        $scope.deleteTodo = function(id) {
        TodoAPIService.deleteTodo(url + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
            console.log(results);
        }).catch(function(err) {
                console.log(err);
        });
    };

})

    .controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store) {
        var id = $routeParams.id;
        var url = "https://morning-castle-91468.herokuapp.com/";

        TodoAPIService.getTodos(url + "todo/" + id, $scope.username, store.get('authToken')).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        });
 
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
 
                TodoAPIService.editTodo(url + "todo/" + id, $scope.todo, store.get('authToken')).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }
    });

