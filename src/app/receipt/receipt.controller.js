(function() {
    'use strict';

    angular
        .module('cakeryFront')
        .controller('ReceiptController', ReceiptController);

    function ReceiptController($http, $stateParams, CATEGORIES, BACKEND_URL) {
        var vm = this;
        var receiptId = $stateParams.id;
        vm.receipt = {};
        vm.imageUrl = BACKEND_URL + "/images";
        vm.categories = CATEGORIES;
        vm.comments = {};

        vm.addComment = function() {
            console.log(vm.comments);
            
            $http.post(BACKEND_URL + '/receipt/comments', vm.comments).then(function() {

            }, function() {

            });
        };

        $http({
            method: 'GET',
            url: BACKEND_URL + '/' + receiptId + '/receipts'
        }).then(function successCallback(receipt) {
            vm.receipt = receipt.data;

            angular.forEach(vm.receipt.images, function(image, key) {
                vm.receipt.images[key] = { "thumbUrl": vm.imageUrl + "/" + image.source, "url": vm.imageUrl + "/" + image.source };
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
