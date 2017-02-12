(function() {
    'use strict';

    angular.module('cakeryFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui-notification', 'ngImgCrop', 'thatisuday.ng-image-gallery', 'slickCarousel']);
    angular.module('cakeryAdmin', ['cakeryFront', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui-notification', 'ngImgCrop', 'thatisuday.ng-image-gallery']);

})();
