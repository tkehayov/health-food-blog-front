(function() {
    'use strict';
    angular
        .module('cakeryAdmin')
        .controller('AdminReceiptController', AdminReceiptController);

    /** @ngInject */
    function AdminReceiptController($scope, $http, $modal, $timeout, BACKEND_URL, BACKEND_IMAGES_URL, CATEGORIES, Notification) {
        var vm = this;
        vm.receipt = {};
        vm.categories = CATEGORIES;
        vm.ingredients = [{}];
        vm.directions = [""];
        vm.receipt.cookingPreperationTime = parseInt(0);
        vm.receipt.cookingTime = parseInt(0);
        vm.receipt.images = [];
        vm.receipt.subCategory = "";
        var fileName = "";
        vm.addIngredient = function() {
            vm.ingredients.push({});
        }

        vm.removeIngredient = function() {
            if (vm.ingredients.length > 1) {
                var lastIngredient = vm.ingredients.length - 1;
                vm.ingredients.splice(lastIngredient);
            }
        }

        vm.addDirection = function() {
            vm.directions.push("");
        }

        vm.removeDirection = function() {
            if (vm.directions.length > 1) {
                var lastDirection = vm.directions.length - 1;
                vm.directions.splice(lastDirection);
            }
        }
        // uploading file
        vm.frontImage = '';
        vm.croppedFrontImage = '';

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            fileName = file.name;
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function() {
                    vm.frontImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
        vm.numberImages = new Array(6);
        // second image
        vm.frontImageGallery = '';
        vm.croppedFrontImageGallery = '';

        var handleFileSelect2 = function(evt) {
            var file = evt.currentTarget.files[0];
            fileName = file.name;
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function() {
                    vm.frontImageGallery = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput2')).on('change', handleFileSelect2);

        vm.uploadImage = function(imageType, croppedImagetoSend) {
            var formData = new FormData();
            var croppedImage = dataURItoBlob(vm.croppedFrontImage);
            if (imageType == "frontImageGallery") {
                croppedImage = dataURItoBlob(vm.croppedFrontImageGallery);
            }
            if (imageType == "imageGallery") {
                croppedImage = dataURItoBlob(croppedImagetoSend);
            }
            formData.set("file", croppedImage, fileName);
            $http.post(BACKEND_IMAGES_URL + "/image", formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
                .success(function(image) {
                    if (imageType == "frontImage") {
                        vm.receipt.frontImage = image;
                    }

                    if (imageType == "frontImageGallery") {
                        vm.receipt.frontImageGallery = image;
                    }
                    if (imageType == "imageGallery") {
                        vm.receipt.images.push(image);
                    }
                    Notification.success('Success');
                })
                .error(function(error) {
                    Notification.error(error.data);
                });
        }

        vm.add = function() {
            vm.receipt.directions = vm.directions;
            vm.receipt.ingredients = vm.ingredients;
            vm.receipt.createdDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');
            vm.receipt.cookingTimeAll = parseInt(vm.receipt.cookingPreperationTime) + parseInt(vm.receipt.cookingTime);

            $http.post(BACKEND_URL + '/receipts', vm.receipt).then(function() {

                Notification.success('Success');
            }, function(error) {
                Notification.error(error.data);
            });
        }

        vm.addImageGallery = function() {
            $modal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'myModalContent.html',
                size: 'sm',
                controller: function($scope) {
                    // second image
                    $scope.init = function() {
                        $scope.imageGallery = '';
                        $scope.croppedImageGallery = '';

                        var handleFileSelect3 = function(evt) {


                            var file = evt.currentTarget.files[0];
                            fileName = file.name;
                            var reader = new FileReader();
                            reader.onload = function(evt) {
                                $scope.$apply(function() {
                                    $scope.imageGallery = evt.target.result;
                                });
                            };
                            reader.readAsDataURL(file);
                        };

                        angular.element(document.querySelector('#fileInput3')).on('change', handleFileSelect3);
                    };

                    $scope.cancelImageGallery = function() {
                        $scope.$close();
                    }
                    $scope.addImageGallery = function() {
                        vm.uploadImage('imageGallery', $scope.imageGallery);
                    }
                    $scope.name = 'top';
                }
            });
        };

        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
  
            var blob = new Blob([ab], { type: mimeString });
            return blob;
        }
    }
})();
