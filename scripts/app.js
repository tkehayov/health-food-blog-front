(function() {
    'use strict';

    angular.module('cakeryFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui-notification', 'ngImgCrop', 'thatisuday.ng-image-gallery', 'slickCarousel']);
    angular.module('cakeryAdmin', ['cakeryFront', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui-notification', 'ngImgCrop', 'thatisuday.ng-image-gallery']);

})();

(function() {
  'use strict';

  angular
      .module('cakeryFront')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Less',
        'url': 'http://lesscss.org/',
        'description': 'Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.',
        'logo': 'less.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar(CATEGORIES) {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controllerAs: 'vm',
      link: function(scope) {
        scope.categories = CATEGORIES;
      },
      bindToController: true
    };

    return directive;
  }

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function() {
        angular.forEach(vm.contributors, function(contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function() {
          $log.info('Activated Contributors View');
        });
      }

      function getContributors() {
        return githubContributor.getContributors(10).then(function(data) {
          vm.contributors = data;

          return vm.contributors;
        });
      }
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('cakeryAdmin')
    .controller('AdminReceiptListController', AdminReceiptListController);

  /** @ngInject */
  function AdminReceiptListController($scope, $http, BACKEND_URL, Notification) {
    var vm = this;

    vm.receipts = {};

    $http.get(BACKEND_URL + '/receipts').then(function(receipts) {
      vm.receipts = receipts.data;
    }, function() {
      console.log("some error occured");
    });

    vm.delete = function(id) {
      $http.delete(BACKEND_URL + '/receipts/' + id).then(function() {
        Notification.success('Success');
      }, function() {
        console.log("some error occured");
      });
    }
  }
})();

(function() {
    'use strict';
    angular
        .module('cakeryAdmin')
        .controller('AdminReceiptController', AdminReceiptController);

    /** @ngInject */
    function AdminReceiptController($scope, $http, $modal, $timeout, BACKEND_URL, CATEGORIES, Notification) {
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
                //    vm.receipt.images.push(image);
            }
            formData.set("file", croppedImage, fileName);
            $http.post(BACKEND_URL + "/receipts/image", formData, {
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

(function() {
    'use strict';

    angular
        .module('cakeryFront')
        .controller('ReceiptController', ReceiptController);

    function ReceiptController($http, $stateParams, CATEGORIES, BACKEND_URL) {
        var vm = this;
        var receiptId = $stateParams.id;
        vm.receipt = {};
        vm.imageUrl = BACKEND_URL + "/images";
        vm.categories = CATEGORIES;
        vm.comments = {};

        vm.addComment = function() {
             vm.comments.receiptId = receiptId;   
            $http.post(BACKEND_URL + '/receipts/comment', vm.comments).then(function() {
                vm.receipt.comments.unshift(vm.comments);
                vm.comments = {};                
            }, function() {

            });
        };

        $http({
            method: 'GET',
            url: BACKEND_URL + '/receipts/' + receiptId
        }).then(function successCallback(receipt) {
            vm.receipt = receipt.data;

            angular.forEach(vm.receipt.images, function(image, key) {
                vm.receipt.images[key] = { "thumbUrl": vm.imageUrl + "/" + image.name, "url": vm.imageUrl + "/" + image.name };
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

		console.log(vm.subCategory);
		console.log(vm.category);	
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

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('MainController', MainController)
    
    .constant('CATEGORIES', {
      'палачинки':[],
      'солени ястия': ['супи'],
      'идеи за празниците': ['коледни идеи'],
      'sweetland': ['мъфини'],
      'пътуване':[]
    })
    .constant('BACKEND_URL', 'http://localhost:8080');

  /** @ngInject */
  function MainController($injector, $location, $http, BACKEND_URL) {

    var vm = this;
    vm.currentPage = parseInt($location.search().page);
    vm.totalPages = [];
    vm.classAnimation = '';
    vm.receipts = [];
    vm.imageUrl = BACKEND_URL + "/images";
    vm.slides = [
      {
        image: 'assets/images/vegie.jpg'
      },
      {
        image: 'assets/images/cooking.jpg'
      }
    ];

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
        url: BACKEND_URL + '/receipts/?page=' + vm.currentPage + '&size=' + 2
      }).then(function successCallback(receipts) {

        if (vm.totalPages.length == 0) {
          var index = 0;
          while (index < receipts.data[0].totalPages) {
            vm.totalPages.push(index);
            index++;
          }
        }
        vm.receipts = receipts.data;
      }, function errorCallback() {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    vm.getReceipt(vm.currentPage, 2);
  }
})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock() {

  }

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('receipt', {
        url: '/receipt/:id',
        templateUrl: 'app/receipt/receipt.html',
        controller: 'ReceiptController',
        controllerAs: 'receipt'
      });

    $stateProvider
      .state('category', {
        url: '/receipt/category/:category/:subCategory',
        templateUrl: 'app/receipt-category/receipt-category.html',
        controller: 'ReceiptCategoryController',
        controllerAs: 'category'
      });

    $urlRouterProvider.otherwise('/');
  }

  angular
    .module('cakeryAdmin')
    .config(cakeryAdmin);

  /** @ngInject */
  function cakeryAdmin($stateProvider) {
    $stateProvider
      .state('adminreceipt', {
        url: '/admin/receipt',
        templateUrl: 'app/admin/receipt/receipt.html',
        controller: 'AdminReceiptController',
        controllerAs: 'adminReceipt'
      });

    $stateProvider.state('adminListreceipt', {
      url: '/admin/receiptList',
      templateUrl: 'app/admin/receiptList/receipts.html',
      controller: 'AdminReceiptListController',
      controllerAs: 'adminReceiptList'
    });
  }
})();

/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(config);

  /** @ngInject */
  function config() {
  
  }

})();

angular.module("cakeryFront").run(["$templateCache", function($templateCache) {$templateCache.put("app/main/main.html","<div class=container-fluid><div class=row><div id=slides_control><carousel interval=main.myInterval><slide ng-repeat=\"slide in main.slides\" active=slide.active><img ng-src={{slide.image}}><div class=carousel-caption><!--<h4>Slide {{$index+1}}</h4>--></div></slide></carousel></div></div><div class=row><acme-navbar></acme-navbar></div><div class=container><div class=row><div class=\"col-md-10 col-md-offset-1\"><div class=well ng-repeat=\"receipt in main.receipts\"><div class=media><a ng-class=\"{{$index%2==0}}? \'pull-right\':\'pull-left\'\" href=#/receipt/{{receipt.id}}><img class=\"media-object img-rounded\" src={{main.imageUrl}}/{{receipt.frontImage}} alt=...></a><div class=media-body><h2 class=media-heading><a class=recipe-title href=#/receipt/{{receipt.id}}>{{receipt.title}}</a></h2><p class=text-left><i class=\"glyphicon glyphicon-time text-green-light\"></i> <span class=time-text>подготовка: </span><span class=time-menu>{{receipt.cookingPreperationTime}} min</span><br><i class=\"glyphicon glyphicon-time text-green-dark\"></i> <span class=time-text>готвене: </span><span class=time-menu>{{receipt.cookingTime}} min</span><br><i class=\"glyphicon glyphicon-time text-blue\"></i> <span class=time-text>общо: </span><span class=time-menu>{{receipt.cookingTimeAll}} min</span></p><p>{{receipt.shortDescription}}</p><p><a class=read-more href=#/receipt/{{receipt.id}}>прочети повече</a></p></div></div></div><!--pagination--><ul class=pagination><li ng-repeat=\"page in main.totalPages\" ng-class=\"{\'active\': page === main.currentPage}\"><a ng-click=main.getReceipt(page)>{{page}}</a></li></ul></div></div></div></div>");
$templateCache.put("app/receipt/receipt.html","<script src=https://www.google.com/recaptcha/api.js></script><div class=container-fluid><div class=row><div class=col-md-13><img class=\"media-object img-rounded img-responsive\" src=assets/images/header.jpg alt=alt></div></div><div class=row><acme-navbar></acme-navbar></div><div class=container><div class=row><div class=\"col-md-8 col-lg-7 col-md-offset-2\"><h2>{{receipt.receipt.title}}</h2><div class=row><div class=\"col-md-7 col-sm-7\"><div><img class=img-rounded src={{receipt.imageUrl}}/{{receipt.receipt.frontImageGallery}} alt=\"\"></div></div><div class=\"col-md-5 col-sm-5\"><p><i class=\"glyphicon glyphicon-time text-green-light\"></i> <span class=time-text>подготовка: </span><span class=time-menu>{{receipt.receipt.cookingPreperationTime}} min</span><br><i class=\"glyphicon glyphicon-time text-green-dark\"></i> <span class=time-text>готвене: </span><span class=time-menu>{{receipt.receipt.cookingTime}} min</span><br><i class=\"glyphicon glyphicon-time text-blue\"></i> <span class=time-text>общо: </span><span class=time-menu>{{receipt.receipt.cookingTimeAll}} min</span><br></p><!-- Load Facebook SDK for JavaScript --><div id=fb-root></div><script>(function(d, s, id) {\n                                var js, fjs = d.getElementsByTagName(s)[0];\n                                if (d.getElementById(id)) return;\n                                js = d.createElement(s);\n                                js.id = id;\n                                js.src = \"//connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v2.8\";\n                                fjs.parentNode.insertBefore(js, fjs);\n                            }(document, \'script\', \'facebook-jssdk\'));</script><p><button class=share-button ng-click=receipt.print()><i class=\"glyphicon glyphicon-share\"></i> Принтирай</button><br></p><div class=fb-share-button data-href=receipt.getUrl() data-layout=button data-size=large data-mobile-iframe=true><a class=fb-xfbml-parse-ignore target=_blank href=\"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse\">Споделяне</a></div><div><h4 class=category>Категории</h4><ul><li ng-repeat=\"(category,subCategory) in categories\"><a class=category-link href=/#/receipt/category/{{category}}>{{category}}</a></li></ul></div></div></div><div><ng-image-gallery images=receipt.receipt.images methods=receipt.methods thumbnails=true inline=false img-bubbles=true bg-close=false bubbles=true img-anim=fadeup conf=conf></ng-image-gallery></div><h3>Продукти</h3><ul class=list-group><li ng-repeat=\"ingredient in receipt.receipt.ingredients\" class=\"list-group-item grey\"><strong>{{ingredient.amount}} {{ingredient.type}}</strong> {{ingredient.content}}</li></ul><p></p><h3>Описание</h3>{{receipt.receipt.content}}<p></p><h3>Начин на приготвяне</h3><div ng-repeat=\"direction in receipt.receipt.directions\"><p><span class=circle>{{$index + 1}} </span>{{direction}}</p></div></div></div><div class=row><div class=\"col-md-8 col-lg-5 col-md-offset-2\"><h3>Коментари</h3><!--<div>--><!--<form>--><div class=form-group><label for=emailname>Име/Email</label><input data-ng-model=receipt.comments.author type=text class=form-control id=emailname></div><div class=form-group><label for=comment>Съобщение</label><textarea data-ng-model=receipt.comments.comment type=textarea class=form-control id=comment></textarea></div><div class=g-recaptcha data-sitekey=6LdNHhwUAAAAAPGBIc26oWwDB_jUSPBT8qVv1QWB></div><button type=submit ng-click=receipt.addComment() class=\"btn btn-info\">Добави</button><!--</form>--><!--</div>--><div class=comments><div class=\"panel panel-info\" ng-repeat=\"comment in receipt.receipt.comments\"><div class=panel-heading><h3 class=panel-title>{{comment.author}}</h3></div><div class=panel-body>{{comment.comment}}</div></div></div></div></div></div></div>");
$templateCache.put("app/receipt-category/receipt-category.html","<div class=container-fluid><div class=row><div class=col-md-13><img class=img-responsive src=assets/images/header.jpg alt=alt></div></div><div class=row><acme-navbar></acme-navbar></div><div class=container><div class=row><div class=\"col-md-10 col-md-offset-1\"><p class=small><span><strong><a class=\"glyphicon glyphicon-home\" href=#/ ></a> / <a href=#/receipt/category/{{category.category}}/ >{{category.category}}</a> / <a href=#/receipt/category/{{category.subCategory}}/ >{{category.subCategory}}</a></strong></span></p><div class=well ng-repeat=\"receipt in category.receipts\"><div class=media><a ng-class=\"{{$index%2==0}}? \'pull-right\':\'pull-left\'\" href=#/receipt/{{receipt.id}}><img class=\"media-object img-rounded\" src={{category.imageUrl}}/{{receipt.frontImage}} alt=...></a><div class=media-body><h2 class=media-heading><a class=recipe-title href=#/receipt/{{receipt.id}}>{{receipt.title}}</a></h2><p class=text-left><i class=\"glyphicon glyphicon-time text-green-light\"></i> <span class=time-text>подготовка: </span><span class=time-menu>{{receipt.cookingPreperationTime}} min</span><br><i class=\"glyphicon glyphicon-time text-green-dark\"></i> <span class=time-text>готвене: </span><span class=time-menu>{{receipt.cookingTime}} min</span><br><i class=\"glyphicon glyphicon-time text-blue\"></i> <span class=time-text>общо: </span><span class=time-menu>{{receipt.cookingTimeAll}} min</span></p><p>{{receipt.shortDescription}}</p><p><a class=read-more href=#/receipt/{{receipt.id}}>прочети повече</a></p></div></div></div></div></div></div></div>");
$templateCache.put("app/admin/receiptList/receipts.html","<div class=container><div class=row><table class=\"table table-hover\"><th>заглавие</th><th>кратко опис.</th><th>редактирай</th><th>изтрий</th><tr ng-repeat=\"receipt in adminReceiptList.receipts\"><td>{{receipt.title}}</td><td>{{receipt.shortDescription}}</td><td><a class=black-font href=\"\"><i class=\"glyphicon glyphicon-edit\" aria-hidden=true></i></a></td><td><a class=black-font ng-click=adminReceiptList.delete(receipt.id) href=\"\"><i class=\"glyphicon glyphicon-trash\" aria-hidden=true></i></a></td></tr></table></div></div>");
$templateCache.put("app/admin/receipt/gallerytemplate.html","<script type=text/ng-template id=myModalContent.html><div ng-init=\"init()\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\" id=\"modal-title\">Избор на снимка</h4>\n        </div>\n        <div class=\"modal-body\" id=\"modal-body\">\n            <div>Снимка за рецептата\n                <input type=\"file\" id=\"fileInput3\" />\n            </div>\n            <div class=\"cropArea\">\n                <img-crop result-image-size=\"350\" image=\"imageGallery\" area-type=\"square\" result-image=\"croppedImageGallery\"></img-crop>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button class=\"btn btn-success btn-xs\" type=\"button\" ng-click=\"addImageGallery(\'imageGallery\')\">Добави</button>\n            <button class=\"btn btn-warning btn-xs\" type=\"button\" ng-click=\"cancelImageGallery()\">Откaжи</button>\n        </div>\n    </div></script>");
$templateCache.put("app/admin/receipt/receipt.html","<div class=container><div ng-include=\"\'app/admin/receipt/gallerytemplate.html\'\"></div><div class=row><div class=col-md-5><div>Начална снимка <input type=file id=fileInput></div><div class=cropArea><img-crop result-image-size=350 image=adminReceipt.frontImage area-type=square result-image=adminReceipt.croppedFrontImage></img-crop></div><button type=submit class=\"btn btn-success btn-xs\" ng-click=\"adminReceipt.uploadImage(\'frontImage\')\" ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\"><span class=\"glyphicon glyphicon-upload\"></span>качи</button></div><div class=col-md-6><div>Изрязана снимка</div><div><img ng-src={{adminReceipt.croppedFrontImage}} alt=\"\"></div></div></div><!--second image--><div class=row><div class=col-md-5><div>Снимка за рецептата <input type=file id=fileInput2></div><div class=cropArea><img-crop result-image-size=350 image=adminReceipt.frontImageGallery area-type=square result-image=adminReceipt.croppedFrontImageGallery></img-crop></div><button type=submit class=\"btn btn-success btn-xs\" ng-click=\"adminReceipt.uploadImage(\'frontImageGallery\')\" ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\"><span class=\"glyphicon glyphicon-upload\"></span>качи</button></div><div class=col-md-6><div>Изрязана снимка</div><div><img ng-src={{adminReceipt.croppedFrontImageGallery}} alt=\"\"></div></div></div><button type=button class=\"btn btn-info\" ng-click=adminReceipt.addImageGallery()>галерия</button><form><div class=form-group><label for=title>Заглавие</label><input ng-model=adminReceipt.receipt.title type=text class=form-control id=title placeholder=заглавие></div><div class=form-group><label for=title>Категория</label><select class=form-control id=type ng-model=adminReceipt.receipt.category><option ng-repeat=\"(category,key) in adminReceipt.categories\" value={{category}}>{{category}}</option></select><select class=form-control id=type ng-model=adminReceipt.receipt.subCategory><option ng-repeat=\"(category,key) in adminReceipt.categories[adminReceipt.receipt.category]\" value={{key}}>{{key}}</option></select></div><!--prep time--><div class=\"form-group input-group input-group-sm\"><label for=prepTime>Време за подготвяне</label><input ng-model=adminReceipt.receipt.cookingPreperationTime type=number class=\"form-control col-xs-2\" id=prepTime placeholder=\"време за подготвяне\"></div><!--Cooking time--><div class=\"form-group input-group input-group-sm\"><label for=time>Време за приготвяне</label><input ng-model=adminReceipt.receipt.cookingTime type=number class=\"form-control col-xs-2\" id=time placeholder=\"време за приготвяне\"></div><!--Cooking all time--><div><label>Общо време</label><br>{{adminReceipt.receipt.cookingPreperationTime -- adminReceipt.receipt.cookingTime}}</div><div class=form-inline><!--ingredients--><label for=ingredients>Продукти</label><div ng-repeat=\"ingredient in adminReceipt.ingredients\"><div class=dropdown><input type=text class=form-control ng-model=ingredient.amount placeholder=количество><label for=type>тип</label><select class=form-control id=type ng-model=ingredient.type><option>гр</option><option>бр.</option><option>мл</option><option>ч.л</option><option>щипка</option></select><input type=text class=form-control ng-model=ingredient.content id=ingredient placeholder=продукт></div></div></div><br><div><button type=submit class=\"btn btn-success btn-xs\" ng-click=adminReceipt.addIngredient()><i class=\"glyphicon glyphicon-plus\"></i>Добави</button> <button type=submit class=\"btn btn-danger btn-xs\" ng-click=adminReceipt.removeIngredient()><i class=\"glyphicon glyphicon-minus\"></i>Премахни</button></div><div class=form-group><label for=short-direction>Начин на приготвяне</label><div ng-repeat=\"direction in adminReceipt.directions track by $index\"><input ng-model=adminReceipt.directions[$index] type=text class=form-control id=direction placeholder=стъпка></div></div><div><button type=submit class=\"btn btn-success btn-xs\" ng-click=adminReceipt.addDirection()><i class=\"glyphicon glyphicon-plus\"></i>Добави</button> <button type=submit class=\"btn btn-danger btn-xs\" ng-click=adminReceipt.removeDirection()><i class=\"glyphicon glyphicon-minus\"></i>Премахни</button></div><div class=form-group><label for=short-description>Кратко описание</label><textarea ng-model=adminReceipt.receipt.shortDescription type=textarea class=form-control id=direction placeholder=\"кратко описание\"></textarea></div><div class=form-group><label for=description>Описание</label><textarea ng-model=adminReceipt.receipt.content type=textarea class=form-control id=description placeholder=описание></textarea></div><button type=submit ng-click=adminReceipt.add() class=\"btn btn-success\">Добави</button></form></div>");
$templateCache.put("app/components/navbar/navbar.html","<nav class=\"navbar navbar-default\"><div class=row><div class=\"container col-md-offset-1\"><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav\"><li><a ng-href=#/ >Начало</a></li><li class=dropdown><a href=# class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false>Рецепти<span class=caret></span></a><ul class=dropdown-menu><li ng-repeat=\"(category,subCategory) in categories\"><a class=primary-cat href=#/receipt/category/{{category}}/ ><strong>{{category}}</strong></a><div ng-repeat=\"sub in subCategory\"><a class=sub-cat href=#/receipt/category/{{category}}/{{sub}}>{{sub}}</a></div><div class=divider></div></li></ul></li><li><a ng-href=#/ >Категории</a></li><li><a ng-href=#/ >За мен</a></li><li><a ng-href=#/ >Контакти</a></li></ul></div></div></div></nav>");}]);