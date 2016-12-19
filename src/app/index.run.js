(function() {
  'use strict';

  angular
    .module('cakeryFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
