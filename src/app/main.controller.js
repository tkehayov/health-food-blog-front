(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController( $injector, $http) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1482957772914;

    vm.myInterval = 3000;
    vm.reciepts = [];
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
      url: 'http://localhost:8080/reciepts'
    }).then(function successCallback(reciepts) {
      vm.reciepts = reciepts.data;
    }, function errorCallback() {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
})();
