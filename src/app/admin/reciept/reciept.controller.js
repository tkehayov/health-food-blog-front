(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($timeout, $injector, $http, toastr) {
    var vm = this;

    vm.reciept = {};

    vm.add = function() {
      $http.post('http://localhost:8080/reciepts', vm.reciept).then(function(){
        console.log("success");
      }, function(){
        console.log("error");
      });
    }

  }
})();
