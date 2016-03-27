(function () {
	angular.module("followme")
	.controller("BlogDetailController",
		["blogDetail", 
		function (blogDetail) {
		
			var vm = this;

			vm.blogDetail = blogDetail.data;
			//init();

			function init() {
			 	getBlogDetail($routeParams.id);
			};

			function getBlogDetail(blogId) {
				blogService.getBlogDetail(blogId)
					.success(function(data) {
						vm.blogDetail = data;
					});
			};
	}])
}());