(function() {
  'use strict';

  angular
    .module('cakeryAdmin')
    .controller('AdminController', AdminController)
    .constant('BACKEND_URL', '');

  /** @ngInject */
  function AdminController($injector, $http, BACKEND_URL) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.myInterval = 3000;
    vm.reciepts = [];
    vm.imageUrl = BACKEND_URL + "/images";
    vm.slides = [
      {
        image: 'assets/images/vegie.jpg'
      },
      {
        image: 'assets/images/cooking.jpg'
      }
    ];

    $http({
      method: 'GET',
      url: BACKEND_URL + '/reciepts'
    }).then(function successCallback(reciepts) {
      vm.reciepts = reciepts.data;
    }, function errorCallback() {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
})();
