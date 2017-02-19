(function() {
	'use strict';

	angular
		.module('cakeryFront')
		.controller('RecieptCategoryController', RecieptCategoryController);

	/** @ngInject */
	function RecieptCategoryController($http, $stateParams, CATEGORIES, BACKEND_URL) {
		var vm = this;
		var recieptId = $stateParams.id;
		vm.reciept = {};
		vm.imageUrl = BACKEND_URL + "/images";
		vm.categories = CATEGORIES;
		
		console.log("RecieptCategoryController");
	}
})();
