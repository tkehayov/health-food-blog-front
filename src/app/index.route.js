(function() {
  'use strict';

  angular
    .module('cakeryFrontend')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/reciept/:id', {
        templateUrl: 'app/reciept/reciept.html',
        controller: 'RecieptController',
        controllerAs: 'reciept'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
