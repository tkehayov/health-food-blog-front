(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('adminreciept', {
        url: '/admin/reciept',
        templateUrl: 'app/admin/reciept/reciept.html',
        controller: 'AdminRecieptController',
        controllerAs: 'adminReciept'
      });
    $stateProvider
      .state('reciept', {
        url: '/reciept/:id',
        templateUrl: 'app/reciept/reciept.html',
        controller: 'RecieptController',
        controllerAs: 'reciept'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
