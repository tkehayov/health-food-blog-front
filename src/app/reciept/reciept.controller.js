(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('RecieptController', RecieptController);

  /** @ngInject */
  function RecieptController($http, $stateParams, BACKEND_URL) {
    var vm = this;
    var recieptId = $stateParams.id;
    vm.reciept = {};
    vm.imageUrl = BACKEND_URL + "/images";
    $http({
      method: 'GET',
      url: BACKEND_URL + '/' + recieptId + '/reciepts'
    }).then(function successCallback(reciept) {
      vm.reciept = reciept.data;
    }, function errorCallback() {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  }
})();
