(function() {
    angular.module("followme", ["ngRoute"])

        .constant("baseUrl", "http://localhost:3000")

        .config(["$routeProvider", "$httpProvider", "$locationProvider",
            function($routeProvider, $httpProvider, $locationProvider) {

                $httpProvider.interceptors.push("AuthInterceptor");

                $routeProvider
                    .when("/", {
                        templateUrl: "app/views/pages/home.html"
                    })
                    .when("/login", {
                        templateUrl: "app/views/pages/login.html",
                        controller: "AuthController",
                        controllerAs: "vm",
                    })
                    .when("/register", {
                        templateUrl: "app/views/pages/register.html",
                        controller: "AuthController",
                        controllerAs: "vm",
                    })
                    .when("/blogDetail/:id", {
                        templateUrl: "app/views/pages/blogDetail.html",
                        controller: "BlogDetailController",
                        controllerAs: "vm",
                        resolve: {
                            blogDetail: function(blogService, $route) {
                                return blogService.getBlogDetail($route.current.params.id);
                            }
                        }
                    })
                    .otherwise("/");

                $locationProvider.html5Mode(true);
            }]);
} ());