angular.module('TodoApp')
    

    .controller('LogoutController', function($scope, $location, $window, store) {

        $scope.logoutMessage = "Do you really want to log out?";

       
        $scope.logout = function() {   
            $scope.authToken = store.remove('authToken');
            $scope.username = store.remove('username');   
            $location.path("/");  
            $window.location.reload();


    }
    	
})
    
    






