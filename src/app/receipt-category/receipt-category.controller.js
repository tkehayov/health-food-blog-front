(function() {
	'use strict';

	angular
		.module('cakeryFront')
		.controller('ReceiptCategoryController', ReceiptCategoryController);

	function ReceiptCategoryController($http, $stateParams, $location, CATEGORIES, BACKEND_URL) {
		var vm = this;
		vm.receipts = [];
		vm.category = $stateParams.category;
		vm.subCategory = $stateParams.subCategory;
		vm.totalPages = [];

		vm.getReceipt = function(page) {
			if (!isNaN(page)) {
				$location.search('page', page);
			}

			if (isNaN(page)) {
				page = 0;
			}

			vm.currentPage = parseInt($location.search().page);

			$http({
				method: 'GET',
				url: BACKEND_URL + "/receipts/" + vm.category + "/categories/" + vm.subCategory + '?page=' + vm.currentPage + '&size=2&sort=id,desc'
			}).then(function successCallback(receipts) {
				console.log(receipts);

				if (vm.totalPages.length == 0) {
					var index = 0;
					while (index < receipts.data[0].totalPages) {
						vm.totalPages.push(index);
						index++;
					}
				}
				vm.receipts = receipts.data;
			}, function errorCallback(error) {
				console.log("error");
			});
		}

		vm.getReceipt(vm.currentPage, 2);
	}
})();
