(function() {
  'use strict';

  angular
    .module('cakeryFrontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, webDevTec, toastr) {
    var vm = this;
    vm.arrayData = [
      { src: '../assets/images/vegie.jpg' },
      { src: '../assets/images/cooking.jpg' }
    ];

    vm.currentNavItem = 'page1';
    vm.awesomeThings = [];
    vm.classAnimation = '';
    
    vm.creationDate = 1482059795109;
    vm.showToastr = showToastr;

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
