(function() {
    angular.module("followme")
        .controller("AuthController",
        ["authService",
            function(authService) {
                var vm = this;

                vm.register = register;
                vm.login = login;
                
                function register(user) {
                    authService.register(user).success(function () {
                    
                    });
                };

                function login(user) {
                    authService.register(user).success(function () {
                    
                    });
                };
            }]);
} ());