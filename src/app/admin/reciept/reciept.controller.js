(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($http, moment, FileUploader) {
    var vm = this;

    vm.reciept = {};
    vm.ingredients = [{}];

    vm.addIngredient = function() {
      vm.ingredients.push({});
    }

    vm.removeIngredient = function() {
      if (vm.ingredients.length > 1) {
        var lastIngredient = vm.ingredients.length - 1;
        vm.ingredients.splice(lastIngredient);
      }
    }

    // uploading file
    vm.uploader = new FileUploader({
      url: "http://localhost:8080/reciepts/image"
    });

    vm.uploader.onCompleteAll = function() {
      vm.uploader.queue.splice(0, 1);
    };

    vm.uploader.onCompleteItem = function(fileItem, image, status) {
      // vm.log.info(status);
      vm.reciept.frontImage = image;
    };

    vm.add = function() {
      console.log(vm.reciept);
      vm.reciept.ingredients = vm.ingredients;
      vm.reciept.createdDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');
      $http.post('http://localhost:8080/reciepts', vm.reciept).then(function() {
      }, function() {
      });
    }

  }
})();
