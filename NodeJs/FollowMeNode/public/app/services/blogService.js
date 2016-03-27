angular.module("followme")
.factory("blogService" , 
	["$http", "baseUrl", 
	function ($http, baseUrl) {

	var blogService = {};

	blogService.getBlogs = function () {
		return $http.get(baseUrl + "/api/blogs");
	};

	blogService.getBlogDetail = function (blogId) {
		return $http.get(baseUrl + "/api/blogDetail/" + blogId);
	};

	return blogService;	
}]);