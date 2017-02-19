(function() {
	'use strict';

	angular
		.module('cakeryFront')
		.controller('RecieptCategoryController', RecieptCategoryController);

	/** @ngInject */
	function RecieptCategoryController($http, $stateParams, CATEGORIES, BACKEND_URL) {
		var vm = this;
		vm.reciepts = [];
		vm.category = $stateParams.category;

		$http({
			method: 'GET',
			url: BACKEND_URL + "/reciepts/" + vm.category + "/categories/"
		}).then(function successCallback(reciepts) {
			vm.reciepts = reciepts.data;

			console.log(reciepts);
		}, function errorCallback() {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
})();
