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
      .state('receipt', {
        url: '/receipt/:id',
        templateUrl: 'app/receipt/receipt.html',
        controller: 'ReceiptController',
        controllerAs: 'receipt'
      });

    $stateProvider
      .state('category', {
        url: '/receipt/category/:category/:subCategory',
        templateUrl: 'app/receipt-category/receipt-category.html',
        controller: 'ReceiptCategoryController',
        controllerAs: 'category'
      });

    $stateProvider
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/contacts/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'contacts'
      });

    $stateProvider
      .state('notfound', {
        url: '/404',
        templateUrl: 'app/404.html',
        controller: '',
        controllerAs: ''
      });
      
    $urlRouterProvider.otherwise('/404');
  }

  angular
    .module('cakeryAdmin')
    .config(cakeryAdmin);

  /** @ngInject */
  function cakeryAdmin($stateProvider) {
    $stateProvider
      .state('adminreceipt', {
        url: '/admin/receipt',
        templateUrl: 'app/admin/receipt/receipt.html',
        controller: 'AdminReceiptController',
        controllerAs: 'adminReceipt'
      });

    $stateProvider.state('adminListreceipt', {
      url: '/admin/receiptList',
      templateUrl: 'app/admin/receiptList/receipts.html',
      controller: 'AdminReceiptListController',
      controllerAs: 'adminReceiptList'
    });
  }
})();
