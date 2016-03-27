function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};


(function () {
    'use strict';
    var module = angular.module("blogApp", ['ngResource']);
}());

(function () {
    var injectParams = ['$scope', '$log', '$resource','$sce','$http'];


    var homeController = function ($scope, $log, $resource, $sce, $http) {
        var webApiAddress = '/api/';

        var apiServiceResource = $resource(webApiAddress + ':controller/:apiCall/:id',
        {
            controller: '@controller',
            apiCall: '@apiCall',
            id: '@id',
            data: '@data'
        }, {
            get: {
                method: 'GET'
            },
            'query': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST'
            }
        });

        $scope.blogItems = [];
        $scope.selectedBlogItem = undefined;
        $scope.selectedBlogItemPosts = [];
        $scope.latestItemRssFeed = {};


        function getBlogItems() {
            var result = apiServiceResource.query({
                controller: 'blogApi',
                apiCall: 'getBlogItems'
            });
            result.$promise.then(function (serviceResult) {
                $scope.selectedBlogItem = undefined;
                $scope.blogItems = serviceResult;
            }, function (err) {
                //fail
                //$log.error(err);
            });
        }

        function showDetail(blogItemPosts) {
            $scope.selectedBlogItem = blogItemPosts[0];
            $scope.selectedBlogItem.trustedResourceUrl = $sce.trustAsResourceUrl($scope.selectedBlogItem.url);
            $scope.selectedBlogItemPosts = blogItemPosts;
            parseRssAndGetFirstItem();
        }

        function parseRssAndGetFirstItem() {
            $http({
                url: 'http://crossorigin.me/http://johnpapa.net/feed.xml',
                method: 'GET'
            }).then(function (result) {

                var parsedXml = $.parseXML(result.data);
                var x = xmlToJson(parsedXml);
                $scope.latestItemRssFeed = x.rss.channel.item[0];

                console.log($scope.latestItemRssFeed);

                $scope.latestItemRssFeed.title.text = $scope.latestItemRssFeed.title["#text"];
                $scope.latestItemRssFeed.pubDate.text = $scope.latestItemRssFeed.pubDate["#text"];
                $scope.latestItemRssFeed.description.text = $sce.trustAsHtml($scope.latestItemRssFeed.description["#text"]);
            }, function (err) {
                $log.error(err);
            });
        }

        $scope.init = getBlogItems;
        $scope.showDetail = showDetail;
    };

    homeController.$inject = injectParams;

    angular.module("blogApp").controller('homeController', homeController);

}());