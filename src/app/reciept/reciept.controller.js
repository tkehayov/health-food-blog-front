(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('RecieptController', RecieptController);

  /** @ngInject */
  function RecieptController($http, $stateParams) {
    var vm = this;
    var recieptId = $stateParams.id;
    vm.reciept = {};

    $http({
      method: 'GET',
      url: 'http://localhost:8080/' + recieptId + '/reciepts'
    }).then(function successCallback(reciept) {
      console.log(reciept.data);
      vm.reciept = reciept.data;
    }, function errorCallback() {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  }
})();
