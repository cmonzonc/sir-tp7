'use strict';

/**
 * @ngdoc function
 * @name tp72App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tp72App
 */
angular.module('tp72App')
	.controller('ExampleController', function($scope, $http) {
	    $scope.list = [];
	    $scope.insertedIdentifier;
		$scope.text = 'time';
		$scope.SendData = function () {
		   // use $.param jQuery function to serialize data from JSON 
		    var data = $.param({
		        firstname: $scope.firstname,
				email: $scope.email,
		        lastname: $scope.lastname
		    });
		
		    var config = {
		        headers : {
		            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		        }
		    }
		
		    $http.post('http://localhost:8080/rest/person', data, config)
		    .then(function (data, status, headers, config) {
		                        console.log(data);
		        $scope.PostDataResponse = data.data.id;
		    }).catch(function (data, status, header, config) {
		        $scope.ResponseDetails = "Data: " + data +
		            "<hr />status: " + status +
		            "<hr />headers: " + header +
		            "<hr />config: " + config;
		    });
		
		};


      
      
      
    });
