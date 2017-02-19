(function() {
    'use strict';

    angular
        .module('cakeryFront')
        .controller('RecieptController', RecieptController);

    /** @ngInject */
    function RecieptController($http, $stateParams, CATEGORIES, BACKEND_URL) {
        var vm = this;
        var recieptId = $stateParams.id;
        vm.reciept = {};
        vm.imageUrl = BACKEND_URL + "/images";
        vm.categories = CATEGORIES;
        vm.openImage = function() {
            console.log("Asdf");
        };

        $http({
            method: 'GET',
            url: BACKEND_URL + '/' + recieptId + '/reciepts'
        }).then(function successCallback(reciept) {
            vm.reciept = reciept.data;

            angular.forEach(vm.reciept.images, function(image, key) {
                vm.reciept.images[key] = { "thumbUrl": vm.imageUrl +"/"+ image.source, "url": vm.imageUrl+"/"+image.source };
            });
        }, function errorCallback() {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        vm.getUrl = function() {
            return window.location.href;
        };
        vm.print = function() {
            window.print();
        }
    }
})();
