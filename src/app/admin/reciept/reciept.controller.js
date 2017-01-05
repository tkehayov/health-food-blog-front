(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($http, moment, FileUploader) {
    var vm = this;

    vm.reciept = {};

    // uploading file
    vm.uploader = new FileUploader({
      url: "http://localhost:8080/reciepts/image"
    });

    vm.uploader.onCompleteAll = function() {
      vm.uploader.queue.splice(0, 1);
    };

    vm.uploader.onCompleteItem = function(fileItem, image, status, headers) {
      vm.reciept.frontImage = image;
    };

    vm.add = function() {

      vm.reciept.createdDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');
      $http.post('http://localhost:8080/reciepts', vm.reciept).then(function() {
      }, function() {
      });
    }

  }
})();
