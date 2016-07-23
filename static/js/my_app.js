angular.module('myApp',[]).
   controller('myController',['$scope','$http',function($scope,$http){
   	$http.get('/user/profile')
   	.success(function(data, status, headers, config){
   		$scope.user = data;
   		$scope.err = ' ';
   	}).
   	error(function(data, status, headers, config){
   		$scope.user = {};
   		$scope.err = data;
   	});
  }]);