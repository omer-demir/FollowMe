(function () {
	angular.module("followme")
	.controller("MainController", 
		["blogService",
		function(blogService) {
			var vm = this;

			//vm.blogs = blogs.data;
			init();

			function init() {
				getBlogs();
			};

			function getBlogs() {
				 blogService.getBlogs()
				 	.success(function (data) {
						vm.blogs = data;
				 	});
			};
	}])
}());