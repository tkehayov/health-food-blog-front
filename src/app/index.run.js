(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
