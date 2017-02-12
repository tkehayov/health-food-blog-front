(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar(CATEGORIES) {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controllerAs: 'vm',
      link: function(scope) {
        scope.categories = CATEGORIES;
      },
      bindToController: true
    };

    return directive;
  }

})();
