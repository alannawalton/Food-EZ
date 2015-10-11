var app = angular.module('restaurantApp', [
    'ngRoute', 
    'ngMaterial',
    'ngMdIcons',
    'ngGPlaces'
])

//Main Controls of app
app.controller('mainController', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, ngGPlacesAPI) {
	

 	$scope.data = ngGPlacesAPI.nearbySearch({latitude:38.922684, longitude:-77.0194379999999}).then(
    function(data){
    	$scope.restaurants = data;
    	console.log(data);
      return data;
    });
	

	$scope.toggleSidenav = function(menuId) {
    	$mdSidenav(menuId).toggle();
 	};
 	$scope.menu = [
	    {
	      link : '',
	      title: 'Home',
	      icon: 'home'
	    },
	    {
	      link : '',
	      title: 'Transaction History',
	      icon: 'history'
	    },
	    {
	      link : '',
	      title: 'Messages',
	      icon: 'message'
	    }
	];
	$scope.admin = [
	    {
	      link : 'showListBottomSheet($event)',
	      title: 'Settings',
	      icon: 'settings'
	    }
	];
});

//Switch Material Design Color Scheme
app.config(function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('yellow');
});

//Switches between pages/views
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'main.html',
        controller: 'mainController'
    }).
    when('/Customize', {
        reloadOnSearch: false,
        templateUrl: 'customize.html',
        controller: 'customizeController'
    }).
    when('/ThankYou', {
        templateUrl: 'thankyou.html'
    }).
    when('/Show', {
        templateUrl: 'templates/show.html',
        controller: 'ShowController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

exports = app;