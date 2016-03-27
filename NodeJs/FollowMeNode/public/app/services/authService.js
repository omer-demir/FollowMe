(function() {
    angular.module("followme")

        .factory("Auth",
        [
            "$http", "$q", "AuthToken",
            function($http, $q, AuthToken) {
                var authFactory = {};

                authFactory.login = function(username, password) {
                    return $http.post("/api/login", {
                        username: username,
                        password: password
                    })
                        .success(function(data) {
                            AuthToken.setToken(data.token);
                            return data;
                        });
                };

                authFactory.logout = function() {
                    AuthToken.setToken();
                };

                authFactory.isLoggedIn = function() {
                    return AuthToken.getToken();
                };

                authFactory.getUser = function() {
                    if (AuthToken.getToken()) {
                        return $http.get("/api/me");
                    } else {
                        return $q.reject({ message: "User has no token!" });
                    }
                }

                return authFactory;
            }]);
} ());