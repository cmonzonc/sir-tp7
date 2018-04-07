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
tp7.service("pokemonService", function($http, JPA){
    this.pokemonInformation = function(personIdentifier){    
        var myResponseData = $http.get(JPA + '/person/id/' + personIdentifier).then(function (response) {
            return response;
        });
        return myResponseData; 
    };
    this.getPokemonList = function(){
        var myResponseData = $http.get(JPA + "/person").then(function (response) {
            return response.data;
        });
        console.log(myResponseData);
        return myResponseData; 
    };

});

tp7.factory('getPokemon', function($resource, JPA) {
    return $resource(JPA + "/person/id/:id/", {}, {
        get: { method: "GET"}});
});

tp7.controller("pokemonCrawler", function($scope,$log, $http, $timeout, pokemonMapping, pokemonService) {
   
    $scope.pokemons = [];
    $scope.singlePerson = [];
    $scope.$log = $log;
    pokemonService.getPokemonList().then(function(result) {
        $scope.pokemons = result;
        $scope.pokemons.forEach(function(element){
            element.id = element.identifier;
        });
        $timeout(function () {
            angular.element(document).find('select').material_select();
        }, 500);
    });
    $scope.searchPok = function(pokemon) {
        pokemonMapping.addPokemon(pokemon.id);
    };
    $scope.updatePokemonSelection = function(selected){
        pokemonService.pokemonInformation(selected).then(function(response) {

			$scope.requestedPokemonInformation = response;
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

tp7.service("pokemonMapping", function(){
    this.addPokemon = function(id) {
        this.id = id;
    };
    this.getPokemon = function() {
        return this.id;
    };
});

tp7.controller("pokemonCrawlerAPI", function($scope,getPokemon,pokemonMapping){
    console.log(pokemonMapping.getPokemon());
    $scope.getItem = function() {
        $scope.poke = getPokemon.get({id: pokemonMapping.getPokemon()})
    };
    $scope.$watch('service.getPokemon()', $scope.getItem);
});
