(function () {
    angular.module("followme", ["ngRoute"])

    .constant("baseUrl", "http://localhost:3000")

    .config(["$routeProvider", function ($routeProvider) {
    	$routeProvider
    		.when("/",{
                    templateUrl: "app/views/pages/home.html"
                })
    		.when("/blogDetail/:id",{
                    templateUrl: "app/views/pages/blogDetail.html",
                    controller: "BlogDetailController",
                    controllerAs: "vm",
                    "resolve": {
                        blogDetail: function (blogService, $route) {
                            return blogService.getBlogDetail($route.current.params.id);
                        }
                    }
                })
    		.otherwise("/");
    }])
}());