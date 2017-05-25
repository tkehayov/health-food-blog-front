(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('MainController', MainController)
    
    .constant('CATEGORIES', {
      'палачинки':[],
      'солени ястия': ['супи'],
      'идеи за празниците': ['коледни идеи'],
      'sweetland': ['мъфини'],
      'пътуване':[]
    })
    // production
    .constant('BACKEND_URL', 'http://healtyhouse-blog-dev.eu-central-1.elasticbeanstalk.com')
    .constant('BACKEND_IMAGES_URL', 'https://s3.eu-central-1.amazonaws.com/health-food-blog-static/static');

    // locally
    // .constant('BACKEND_URL', 'http://localhost:8080')
    // .constant('BACKEND_IMAGES_URL', 'http://localhost:8080');

  /** @ngInject */
  function MainController($injector, $location, $http, BACKEND_URL, BACKEND_IMAGES_URL) {

    var vm = this;
    vm.currentPage = parseInt($location.search().page);
    vm.totalPages = [];
    vm.classAnimation = '';
    vm.receipts = [];
    vm.imageUrl = BACKEND_IMAGES_URL;
    vm.slides = [
      {
        image: 'assets/images/vegie.jpg'
      },
      {
        image: 'assets/images/cooking.jpg'
      }
    ];

    vm.getReceipt = function(page) {
      if (!isNaN(page)) {
        $location.search('page', page);
      }

      if (isNaN(page)) {
        page = 0;
      }

      vm.currentPage = parseInt($location.search().page);

      $http({
        method: 'GET',
        url: BACKEND_URL + '/receipts/?page=' + vm.currentPage + '&size=' + 2
      }).then(function successCallback(receipts) {

        if (vm.totalPages.length == 0) {
          var index = 0;
          while (index < receipts.data[0].totalPages) {
            vm.totalPages.push(index);
            index++;
          }
        }
        vm.receipts = receipts.data;
        console.log(vm.receipts);
      }, function errorCallback() {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    vm.getReceipt(vm.currentPage, 2);
  }
})();
