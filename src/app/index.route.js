(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
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
    .config(cakeryAdmin);

    /** @ngInject */
  function cakeryAdmin($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('adminreciept', {
        url: '/admin/reciept',
        templateUrl: 'app/admin/reciept/reciept.html',
        controller: 'AdminRecieptController',
        controllerAs: 'adminReciept'
      });
  }

  function cakeryAdmin($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('adminreciept', {
        url: '/admin/recieptList',
        templateUrl: 'app/admin/recieptList/reciepts.html',
        controller: 'AdminRecieptListController',
        controllerAs: 'adminRecieptList'
      });
  }
})();
