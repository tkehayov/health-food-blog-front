(function() {
  'use strict';

  angular
    .module('cakeryAdmin')
    .controller('AdminReceiptListController', AdminReceiptListController);

  /** @ngInject */
  function AdminReceiptListController($scope, $http, BACKEND_URL, Notification) {
    var vm = this;

    vm.receipts = {};

    $http.get(BACKEND_URL + '/receipts').then(function(receipts) {
      vm.receipts = receipts.data;
    }, function() {
      console.log("some error occured");
    });

    vm.delete = function(id) {
      $http.delete(BACKEND_URL + '/receipts/' + id).then(function() {
        Notification.success('Success');
      }, function() {
        console.log("some error occured");
      });
    }
  }
})();
