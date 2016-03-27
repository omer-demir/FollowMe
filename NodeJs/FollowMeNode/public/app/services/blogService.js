(function() {
    angular.module("followme")
        .factory("blogService",
        ["$http", "baseUrl",
            function($http, baseUrl) {

                var blogService = {};
                $http.defaults.useXDomain = true;
                
                blogService.getBlogs = function() {
                    return $http.get(baseUrl + "/api/blogs");
                };

                blogService.getBlogDetail = function(blogId) {
                    return $http.get(baseUrl + "/api/blogDetail/" + blogId);
                };

                blogService.createBlog = function(blog) {
                    return $http.post(baseUrl + "/api/createBlog", blog);
                };

                blogService.updateBlog = function(blog) {
                    return $http.post(baseUrl + "/api/updateBlog/" + blog._id, blog);
                };

                blogService.deleteBlog = function(blogId) {
                    return $http.post(baseUrl + "/api/deleteBlog/" + blogId);
                };

                return blogService;
            }]);
} ());