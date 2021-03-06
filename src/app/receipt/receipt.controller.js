(function() {
    'use strict';

    angular
        .module('cakeryFront')
        .controller('ReceiptController', ReceiptController);

    function ReceiptController($http, $window, $stateParams, CATEGORIES, BACKEND_URL, BACKEND_IMAGES_URL) {
        var vm = this;
        var receiptId = $stateParams.id;
        vm.receipt = {};
        vm.imageUrl = BACKEND_IMAGES_URL;
        vm.categories = CATEGORIES;
        vm.comments = {};

        vm.addComment = function() {
            vm.comments.receiptId = receiptId;
            $http.post(BACKEND_URL + '/receipts/comment', vm.comments).then(function() {
                vm.receipt.comments.unshift(vm.comments);
                vm.comments = {};
            }, function() {

            });
        };

        $http({
            method: 'GET',
            url: BACKEND_URL + '/receipts/' + receiptId
        }).then(function successCallback(receipt) {
            vm.receipt = receipt.data;
            angular.forEach(vm.receipt.images, function(image, key) {
                vm.receipt.images[key] = { id: key, "thumbUrl": BACKEND_IMAGES_URL + "/" + image.name, "url": BACKEND_IMAGES_URL + "/" + image.name };
            });
        }, function errorCallback() {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        vm.getUrl = function() {
            return $window.location.href;
        };
        vm.print = function() {
            $window.print();
        }
    }
})();
