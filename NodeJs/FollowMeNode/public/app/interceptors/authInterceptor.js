
angular.module("followme")

    .factory("AuthToken", [
        "$window",
        function($window) {
            var authTokenFactory = {};

            authTokenFactory.getToken = function() {
                return $window.localStorage.getItem("token");
            };

            authTokenFactory.setToken = function(token) {
                if (token) {
                    $window.localStorage.setItem("token", token);
                } else {
                    $window.localStorage.removeItem("token");
                }
            };

            return authTokenFactory;
        }])
    .factory("AuthInterceptor", [
        "$q", "$location", "AuthToken",
        function($q, $location, AuthToken) {
            var interceptorFactory = {};

            interceptorFactory.request = function(config) {
                var token = AuthToken.getToken();

                if (token) {
                    config.headers["x-access-token"] = token;
                }

                return config;
            };

            interceptorFactory.responseError = function(response) {
                if (response.status == 403) {
                    $location.path("/login");
                }

                return $q.reject(response);
            };

            return interceptorFactory;
        }]);