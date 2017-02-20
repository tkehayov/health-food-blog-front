(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('MainController', MainController)
    .constant('CATEGORIES', {
      'категория1': ['категория1-sub1', 'категория1-sub2', 'категория1-sub3'],
      'категория2': ['категория2-sub1', 'категория2-sub2', 'категория2-sub3'],
      'категория3': ['категория3-sub1', 'категория3-sub2', 'категория3-sub3']
    })
    .constant('BACKEND_URL', '/back');

  /** @ngInject */
  function MainController($injector, $http, BACKEND_URL) {
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
