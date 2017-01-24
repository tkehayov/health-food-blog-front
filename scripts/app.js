(function() {
  'use strict';

  angular.module('cakeryFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ngImgCrop']);
  angular.module('cakeryAdmin', ['cakeryFront','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ngImgCrop']);

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
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controllerAs: 'vm',
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
    .controller('AdminRecieptController', AdminRecieptController);

  /** @ngInject */
  function AdminRecieptController($scope, $http, BACKEND_URL, toastr) {
    var vm = this;
console.log("asdf");
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

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .controller('RecieptController', RecieptController);

  /** @ngInject */
  function RecieptController($http, $stateParams, BACKEND_URL) {
    var vm = this;
    var recieptId = $stateParams.id;
    vm.reciept = {};
    vm.imageUrl = BACKEND_URL + "/images";
    $http({
      method: 'GET',
      url: BACKEND_URL + '/' + recieptId + '/reciepts'
    }).then(function successCallback(reciept) {
      vm.reciept = reciept.data;
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
    .constant('BACKEND_URL', '');

  /** @ngInject */
  function MainController($injector, $http, BACKEND_URL) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.myInterval = 3000;
    vm.reciepts = [];
    vm.imageUrl = BACKEND_URL + "/images";
    vm.slides = [
      {
        image: 'assets/images/vegie.jpg'
      },
      {
        image: 'assets/images/cooking.jpg'
      }
    ];

    $http({
      method: 'GET',
      url: BACKEND_URL + '/reciepts'
    }).then(function successCallback(reciepts) {
      vm.reciepts = reciepts.data;
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
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

  }

})();

(function() {
  'use strict';

  angular
    .module('cakeryFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/app',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
      
    $stateProvider
      .state('reciept', {
        url: '/reciept/:id',
        templateUrl: 'app/reciept/reciept.html',
        controller: 'RecieptController',
        controllerAs: 'reciept'
      });
    // $urlRouterProvider.otherwise('/');
  }

angular
    .module('cakeryAdmin')
    .config(routerConfig2);

    /** @ngInject */
  function routerConfig2($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('adminreciept', {
        url: '/admin',
        templateUrl: 'app/admin/reciept/reciept.html',
        controller: 'AdminRecieptController',
        controllerAs: 'adminReciept'
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
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();

angular.module("cakeryFront").run(["$templateCache", function($templateCache) {$templateCache.put("app/main/main.html","<div class=container-fluid><div class=row><div id=slides_control><carousel interval=main.myInterval><slide ng-repeat=\"slide in main.slides\" active=slide.active><img ng-src={{slide.image}}><div class=carousel-caption><!--<h4>Slide {{$index+1}}</h4>--></div></slide></carousel></div></div><div class=row><acme-navbar></acme-navbar></div><div class=container><div class=row><div class=well ng-repeat=\"reciept in main.reciepts\"><div class=media><a ng-class=\"{{$index%2==0}}? \'pull-right\':\'pull-left\'\" href=#><img class=\"media-object img-rounded\" src={{main.imageUrl}}/{{reciept.frontImage}} alt=...></a><div class=media-body><h2 class=media-heading><a class=recipe-title href=/#reciept/{{reciept.id}}>{{reciept.title}}</a></h2><p class=\"text-left time-menu\"><i class=\"glyphicon glyphicon-time\"></i> {{reciept.cookingTime}} min</p><p>{{reciept.shortDescription}}</p><p><a class=read-more href=/#>прочети повече</a></p></div></div></div></div></div></div>");
$templateCache.put("app/reciept/reciept.html","<div class=container-fluid><div class=row><div class=col-md-13><img src=assets/images/header.jpg alt=alt></div></div><div class=row><acme-navbar></acme-navbar></div><div class=container><div class=row><div class=col-md-12><h2>{{reciept.reciept.title}}</h2><p class=\"text-left time-menu\"><i class=\"glyphicon glyphicon-time\"></i> {{reciept.reciept.cookingTime}} min</p><img class=img-responsive src={{reciept.imageUrl}}/{{reciept.reciept.frontImage}} alt=\"\"><h3>Продукти</h3><ul class=list-group><li ng-repeat=\"ingredient in reciept.reciept.ingredients\" class=\"list-group-item grey\"><strong>{{ingredient.amount}} {{ingredient.type}}</strong> {{ingredient.content}}</li></ul><h3>Начин на приготвяне</h3><div ng-repeat=\"direction in reciept.reciept.directions\"><p><span class=circle>{{$index + 1}} </span>{{direction}}</p></div></div></div></div></div>");
$templateCache.put("app/admin/reciept/reciept.html","<div class=container><form><div class=form-group><label for=title>Заглавие</label><input ng-model=adminReciept.reciept.title type=text class=form-control id=title placeholder=заглавие></div><div class=\"form-group input-group input-group-sm\"><label for=time>Време за приготвяне</label><input ng-model=adminReciept.reciept.cookingTime type=text class=\"form-control col-xs-2\" id=time placeholder=\"време за приготвяне\"></div><div class=form-inline><!--ingredients--><label for=ingredients>Продукти</label><div ng-repeat=\"ingredient in adminReciept.ingredients\"><div class=dropdown><input type=text class=form-control ng-model=ingredient.amount placeholder=количество><label for=type>тип</label><select class=form-control id=type ng-model=ingredient.type><option>гр</option><option>мл</option><option>ч.л</option><option>щипка</option></select><input type=text class=form-control ng-model=ingredient.content id=ingredient placeholder=продукт></div></div></div><br><div><button type=submit class=\"btn btn-success btn-xs\" ng-click=adminReciept.addIngredient()><i class=\"glyphicon glyphicon-plus\"></i>Добави</button> <button type=submit class=\"btn btn-danger btn-xs\" ng-click=adminReciept.removeIngredient()><i class=\"glyphicon glyphicon-minus\"></i>Премахни</button></div><div class=form-group><label for=short-direction>Начин на приготвяне</label><div ng-repeat=\"direction in adminReciept.directions track by $index\"><input ng-model=adminReciept.directions[$index] type=text class=form-control id=direction placeholder=стъпка></div></div><div><button type=submit class=\"btn btn-success btn-xs\" ng-click=adminReciept.addDirection()><i class=\"glyphicon glyphicon-plus\"></i>Добави</button> <button type=submit class=\"btn btn-danger btn-xs\" ng-click=adminReciept.removeDirection()><i class=\"glyphicon glyphicon-minus\"></i>Премахни</button></div><div class=form-group><label for=short-description>Кратко описание</label><input ng-model=adminReciept.reciept.shortDescription type=textarea class=form-control id=direction placeholder=\"кратко описание\"></div><div class=form-group><label for=description>Описание</label><input ng-model=adminReciept.reciept.content type=textarea class=form-control id=description placeholder=описание></div><div>Select an image file: <input type=file id=fileInput></div><div class=cropArea><img-crop result-image-size=350 image=adminReciept.myImage area-type=square result-image=adminReciept.myCroppedImage></img-crop></div><div>Cropped Image:</div><div><img ng-src={{adminReciept.myCroppedImage}} alt=\"\"></div><button type=submit class=\"btn btn-success btn-xs\" ng-click=adminReciept.uploadImage() ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\"><span class=\"glyphicon glyphicon-upload\"></span>качи</button> <button type=submit ng-click=adminReciept.add() class=\"btn btn-success\">Добави</button></form></div>");
$templateCache.put("app/components/navbar/navbar.html","<nav class=\"navbar navbar-default\"><div class=container><div class=row><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav\"><li><a ng-href=#>Начало</a></li><li><a ng-href=#>Рецепти</a></li><li><a ng-href=#>Категории</a></li><li><a ng-href=#>За мен</a></li><li><a ng-href=#>Контакти</a></li></ul></div></div></div></nav>");}]);