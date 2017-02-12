(function() {
    'use strict';

    angular
        .module('cakeryFront')
        .controller('RecieptController', RecieptController);

    /** @ngInject */
    function RecieptController($http, $stateParams, BACKEND_URL) {
        var vm = this;
        var recieptId = $stateParams.id;
        vm.reciept = {};
        vm.imageUrl = BACKEND_URL + "/images";

        // inside your app controller
        vm.imagess = [{
            title: 'This is amazing photo of nature',
            alt: 'amazing nature photo',
            thumbUrl: 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793__340.jpg',
            url: 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
            extUrl: 'http://mywebsitecpm/photo/1453793'
        },
        {
            title: 'This is amazing photo of nature',
            alt: 'amazing nature photo',
            thumbUrl: 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793__340.jpg',
            url: 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
            extUrl: 'http://mywebsitecpm/photo/1453793'
        },
        {
            url: 'https://pixabay.com/static/uploads/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg'
        }, {
            thumbUrl: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
            url: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701_960_720.jpg'
        },
        {
            thumbUrl: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
            url: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg'
        }, {
            thumbUrl: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
            url: 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg'
        }];

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
