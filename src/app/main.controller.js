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
    .constant('BACKEND_URL', 'http://localhost:8080');

  /** @ngInject */
  function MainController($injector, $location, $http, BACKEND_URL) {

    var vm = this;

    vm.totalPages = [];
    vm.classAnimation = '';
    vm.receipts = [];
    vm.imageUrl = BACKEND_URL + "/images";
    vm.slides = [
      {
        image: 'assets/images/vegie.jpg'
      },
      {
        image: 'assets/images/cooking.jpg'
      }
    ];

    vm.getReceipt = function(page) {
      $location.search('size', 2);
      $location.search('page', page);
      
      $http({
        method: 'GET',
        url: BACKEND_URL + '/receipts/?page=' + $location.search().page + '&size=' + $location.search().size
      }).then(function successCallback(receipts) {

        if (vm.totalPages.length == 0) {
          var index = 0;
          while (index < receipts.data[0].totalPages) {
            vm.totalPages.push(index);
            index++;
          }
        }
        vm.receipts = receipts.data;
      }, function errorCallback() {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    vm.getReceipt(0, 2);
  }
})();
