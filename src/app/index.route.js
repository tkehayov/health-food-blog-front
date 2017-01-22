(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/app',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
      
    $stateProvider
      .state('reciept', {
        url: '/reciept/:id',
        templateUrl: 'app/reciept/reciept.html',
        controller: 'RecieptController',
        controllerAs: 'reciept'
      });
    // $urlRouterProvider.otherwise('/');
  }

angular
    .module('cakeryAdmin')
    .config(routerConfig2);

    /** @ngInject */
  function routerConfig2($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('adminreciept', {
        url: '/admin',
        templateUrl: 'app/admin/reciept/reciept.html',
        controller: 'AdminRecieptController',
        controllerAs: 'adminReciept'
      });
  }
})();
