angular.module('TodoApp')

.controller('TodoController', function($scope, $location, $route, TodoAPIService, store) {

    if(!store.get("authToken")){
        $location.path("/accounts/register");
    }
        
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
                    console.log(results);
                    $route.reload();
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
            $route.reload();
            console.log(results);
        }).catch(function(err) {
                console.log(err);
        });
    };

});