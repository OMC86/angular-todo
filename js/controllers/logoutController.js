angular.module('RouteControllers', [])
    

    .controller('LogOutController', function($scope, $location, logOutAPIService, store) {
        var url = 'https://morning-castle-91468.herokuapp.com/';

        $scope.authToken = store.remove('authToken');
        $scope.username = store.remove('username');
        

        logOutAPIService.logOut(url + 'accounts/api-token-auth/' + $scope.authToken + $scope.username)
    })






