angular.module('RouteControllers', [])
    

    .controller('LogOutController', function($scope, $location, logOutAPIService, store) {
        var url = 'https://morning-castle-91468.herokuapp.com/';

        $scope.logoutMessage = "Do you really want to log out?"
       
        $scope.logout = function() {        

        logOutAPIService.logout(url + 'accounts/api-token-auth/', $scope.username, store.get('authToken')).then(function(results) {
    
        	$scope.authToken = store.remove('authToken');
        	$scope.username = store.remove('username');
        }.catch(function(err) {
        	console.log(err)
        })
    });
}
    
    






