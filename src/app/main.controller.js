(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$injector, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1482957772914;
    vm.showToastr = showToastr;

vm.myInterval = 3000;
  vm.slides = [
    {
      image: 'assets/images/vegie.jpg'
    },
    {
      image: 'assets/images/cooking.jpg'
    }
  ];

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
