(function() {
    angular.module("followme")
        .factory("authService",
        ["$http", "baseUrl",
            function($http, baseUrl) {

                var authService = {};

                authService.login = function(user) {
                    return $http.post(baseUrl + "/api/login", user);
                };

                authService.register = function(user) {
                    return $http.post(baseUrl + "/api/register", user);
                };

                return authService;
            }]);
} ());