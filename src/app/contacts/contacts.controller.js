(function() {
	'use strict';

	angular
		.module('cakeryFront')
		.controller('ContactsController', ContactsController);

	function ContactsController($http, $stateParams, $location, CATEGORIES, BACKEND_URL, Notification) {
		var vm = this;
		vm.contact = {};

		vm.addMessage = function() {
			if(!vm.form.$valid){
				Notification.error('Неправилно попълнени полета');
				return;
			}

			$http.post(BACKEND_URL + '/contact', vm.contact).then(function() {
				Notification.success('Съобщението изпратено');
			}, function() {
				Notification.error('Възникна грешка');
			});
		}
	}
})();