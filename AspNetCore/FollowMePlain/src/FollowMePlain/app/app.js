var followMe;
(function (followMe) {
    'use strict';
    var followMeApp = angular.module('followMeApp', []);
    var BlogService = (function () {
        function BlogService($http, $log) {
            this.$http = $http;
            this.$log = $log;
            this.$log.info("Blog service called");
        }
        BlogService.prototype.getBlogItems = function () {
            this.$log.info("BlogService getBlogItems called");
            return this.$http.get("/api/getBlogItems")
                .then(function (response) { return response.data; });
        };
        BlogService.prototype.getBlogItem = function (animalId) {
            this.$log.info("BlogService getBlogItem called: " + animalId);
            this.$log.info(animalId);
            return this.$http.get("/api/getBlogItem/" + animalId.animalId)
                .then(function (response) { return response.data; });
        };
        return BlogService;
    })();
    followMe.BlogService = BlogService;
    followMeApp.service("BlogService", ["$http", "$log", BlogService]);
    var HomeController = (function () {
        function HomeController() {
        }
        return HomeController;
    })();
    followMe.HomeController = HomeController;
    followMeApp.controller('HomeController', ["$scope", "$log", "fastestAnimal", HomeController]);
})(followMe || (followMe = {}));
;
//# sourceMappingURL=app.js.map