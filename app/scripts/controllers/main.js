'use strict';

/**
 * @ngdoc function
 * @name tp72App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tp72App
 */
 
var tp7 = angular.module('tp72App');

tp7.constant('JPA', 'http://localhost:8080/rest');


$(document).ready(function() {
    $('select').material_select();
  });

tp7.controller("firstController", function($scope){
    $scope.nombre = "Christian";
});

tp7.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// Filter to convert to capitalize the information of the select box
tp7.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

// Service to implements calls to API
tp7.service("personService", function($http, JPA){
    this.personInformation = function(personIdentifier){    
        var myResponseData = $http.get(JPA + '/person/id/' + personIdentifier).then(function (response) {
            return response;
        });
        return myResponseData; 
    };
    this.getPersonList = function(){
        var myResponseData = $http.get(JPA + "/person").then(function (response) {
            return response.data;
        });
        console.log(myResponseData);
        return myResponseData; 
    };

});

tp7.factory('getPerson', function($resource, JPA) {
    return $resource(JPA + "/person/id/:id/", {}, {
        get: { method: "GET"}});
});

tp7.controller("personCrawler", function($scope,$log, $http, $timeout, personMapping, personService) {
   
    $scope.persons = [];
    $scope.singlePerson = [];
    $scope.$log = $log;
    personService.getPersonList().then(function(result) {
        $scope.persons = result;
        $scope.persons.forEach(function(element){
            element.id = element.identifier;
        });
        $timeout(function () {
            angular.element(document).find('select').material_select();
        }, 500);
    });
    $scope.searchPok = function(person) {
        personMapping.addPerson(person.id);
    };
    $scope.updatePersonSelection = function(selected){
	    
        personService.personInformation(selected).then(function(response) {

			$scope.requestedPersonInformation = response;
            $scope.singlePerson.personFirstName = response.data[0].firstname;
            $scope.singlePerson.personLastName = response.data[0].surname;            
            $scope.singlePerson.personIdentifier = response.data[0].identifier;
            $scope.singlePerson.personEmail = response.data[0].email;

        });
        $(".collection-bag").show();
    }
    $scope.updateSelectSection = function(){
        $timeout(function () {
            angular.element(document).find('select').material_select();
        }, 500);
    }
});

tp7.service("personMapping", function(){
    this.addPerson = function(id) {
        this.id = id;
    };
    this.getPerson = function() {
        return this.id;
    };
});

tp7.controller("personCrawlerAPI", function($scope,getPerson,personMapping){
    console.log(personMapping.getPerson());
    $scope.getItem = function() {
        $scope.poke = getPerson.get({id: personMapping.getPerson()})
    };
    $scope.$watch('service.getPerson()', $scope.getItem);
});
