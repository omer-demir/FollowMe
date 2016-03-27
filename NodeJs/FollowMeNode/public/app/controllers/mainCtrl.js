(function() {
    angular.module("followme")
        .controller("MainController",
        ["blogService",
            function(blogService) {
                var vm = this;

                vm.createBlog = createBlog;
                vm.updateBlog = updateBlog;
                vm.deleteBlog = deleteBlog;
                init();

                function init() {
                    getBlogs();
                };

                function getBlogs() {
                    blogService.getBlogs()
                        .success(function(data) {
                            vm.blogs = data;
                        });
                };

                function createBlog(blog) {
                    blogService.createBlog(blog)
                        .success(function(response) {
                            vm.blogs.push(response);
                        });
                };

                function updateBlog(blog) {
                    blogService.updateBlog(blog)
                        .success(function(response) {
                        });
                };

                function deleteBlog(blog) {
                    blogService.deleteBlog(blog._id)
                        .success(function(response) {
                            var index = vm.blogs.indexOf(blog);
                            vm.blogs.splice(index, 1);
                        });
                };
            }]);
} ());