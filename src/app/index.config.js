(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    // $logProvider.debugEnabled(true);

    // // Set options third-party lib
    //  NotificationProvider.setOptions({
    //         delay: 2000,
    //         startTop: 20,
    //         startRight: 10,
    //         verticalSpacing: 20,
    //         horizontalSpacing: 20,
    //         positionX: 'right',
    //         positionY: 'top'
    //     });
  }

})();
