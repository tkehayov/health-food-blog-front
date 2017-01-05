(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
