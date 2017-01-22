(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($scope, $http, BACKEND_URL, moment, toastr) {
    var vm = this;

    vm.reciept = {};
    vm.ingredients = [{}];
    vm.directions = [""];
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
    vm.myImage = '';
    vm.myCroppedImage = '';

    var handleFileSelect = function(evt) {
      var file = evt.currentTarget.files[0];
      fileName = file.name;
      var reader = new FileReader();
      reader.onload = function(evt) {
        $scope.$apply(function() {
          vm.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

    vm.uploadImage = function() {
      var formData = new FormData();
      var croppedImage = dataURItoBlob(vm.myCroppedImage);

      formData.set("file", croppedImage, fileName);
      $http.post(BACKEND_URL + "/reciepts/image", formData, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
        .success(function(image) {
          vm.reciept.frontImage = image;
          toastr.success("Success");
        })
        .error(function(error) {
          toastr.success(error.data);
        });
    }

    vm.add = function() {
      vm.reciept.directions = vm.directions;
      vm.reciept.ingredients = vm.ingredients;
      vm.reciept.createdDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');
      $http.post(BACKEND_URL + '/reciepts', vm.reciept).then(function() {
        toastr.success("Success");
      }, function() {
        toastr.error(error.data);
      });
    }

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
