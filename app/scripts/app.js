'use strict';

/**
 * @ngdoc overview
 * @name tp72App
 * @description
 * # tp72App
 *
 * Main module of the application.
 */
angular
  .module('tp72App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'personCrawler',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'ExampleController',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
