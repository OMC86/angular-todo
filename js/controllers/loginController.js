angular.module('TodoApp')
    
    .controller('LoginController', function($scope, $location, $route, $window, UserAPIService, store) {
 
        

        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";
        var username = store.get("username");


        if(username){
            $scope.Login = username;
            $location.path("/todo");
        }else{
            $scope.Login = "Login";

        }

        $scope.loggedin = function(){
            if(username){
                return true;
                

        }
    }
        




        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
 
                UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.registrationUser).then(function(results) {
                            $scope.token = results.data.token;
                            store.set('username', $scope.registrationUser.username);
                            store.set('authToken', $scope.token);
                            $location.path("/todo");
                            $window.location.reload();


                        }).catch(function(err) {
                             if(!store.get("username")){
                                 $location.path("/accounts/register");
                                 alert("You need to register before you can login!");
                             }
                        });
            }
        }

     
    })