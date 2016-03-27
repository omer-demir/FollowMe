(function () {
	angular.module("followme")
	.controller("BlogDetailController",
		["blogDetail", "$http", "$sce",
		function (blogDetail, $http, $sce) {
		
			var vm = this;

			vm.blogDetail = blogDetail.data;
			init();

			function init() {
			 	getBlogDetail();
			};

			function getBlogDetail() {
				console.log(vm.blogDetail);
			    $http({
	                url: /*'http://crossorigin.me/' +*/ vm.blogDetail.RssFeedLink,
	                method: 'GET'
	            }).then(function (result) {
	                var parsedXml = $.parseXML(result.data);
	                var x = xmlToJson(parsedXml);
	                var rssFeed = x.rss.channel.item[0];

	                console.log(rssFeed);
					vm.blogDetail = {
						Title: rssFeed.title["#text"],
						ShortDescription: $sce.trustAsHtml(rssFeed.description["#text"]),
						CreateDate: rssFeed.pubDate["#text"],
					};
	            });
			};
	}])
}());


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