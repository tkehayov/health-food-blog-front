(function() {
	'use strict';

	angular
		.module('cakeryFront')
		.controller('ReceiptCategoryController', ReceiptCategoryController);

	function ReceiptCategoryController($http, $stateParams, CATEGORIES, BACKEND_URL) {
		var vm = this;
		vm.receipts = [];
		vm.category = $stateParams.category;
		vm.subCategory = $stateParams.subCategory;

		$http({
			method: 'GET',
			url: BACKEND_URL + "/receipts/" + vm.category + "/categories/" + vm.subCategory
		}).then(function successCallback(receipts) {
			vm.receipts = receipts.data;
		}, function errorCallback() {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
})();
