/// <reference path="../wwwroot/lib/dts/angularjs/angular.d.ts" />
module followMe {
    'use strict';

    var followMeApp = angular.module('followMeApp', []);


    export class BlogService {
        constructor(private $http: any, private $log: any) {
            this.$log.info("Blog service called");
        }

        public getBlogItems() {
            this.$log.info("BlogService getBlogItems called");
            return this.$http.get("/api/getBlogItems")
                .then(response => response.data);
        }

        public getBlogItem(animalId: any) {
            this.$log.info("BlogService getBlogItem called: " + animalId);
            this.$log.info(animalId);
            return this.$http.get("/api/getBlogItem/" + animalId.animalId)
                .then(response => response.data);
        }
    }
    followMeApp.service("BlogService", ["$http", "$log", BlogService]);

    export interface IHomeController extends ng.IScope {
        controller:HomeController;
    }

    export class HomeController {
        private scope: ng.IScope;
        private log: any;

        //public 
    }

    followMeApp.controller('HomeController', ["$scope", "$log", "fastestAnimal", HomeController]);




};