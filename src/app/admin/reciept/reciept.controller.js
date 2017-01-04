(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($timeout, $injector, $http, toastr) {
    var vm = this;

    vm.reciept = {};
    console.log(moment().format());

    vm.add = function() {
      vm.reciept.createdDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');
      $http.post('http://localhost:8080/reciepts', vm.reciept).then(function(){
        console.log("success");
      }, function(){
        console.log("error");
      });
    }

  }
})();
