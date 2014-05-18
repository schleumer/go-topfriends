(function() {

  require(['angular', 'facebook', 'underscore', 'jquery', 'comet', 'ngRoute', 'ngAnimate', 'topfriends.utils', 'topfriends.facebook', 'topfriends.topchat', 'topfriends.error', 'pnotify', 'bootstrap', 'bootstrap.tooltip'], function(angular, FB, _, $) {
    var app;
    $.pnotify.defaults.history = false;
    FB.init({
      appId: '242235712573248'
    });
    app = angular.module('Topfriends', ['topfriends.utils', 'topfriends.facebook', 'topfriends.error', 'topfriends.topchat', 'comet', 'ngRoute', 'ngAnimate']);
    app.config([
      '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        return $routeProvider.when('/index', {
          templateUrl: 'templates/index',
          controller: 'IndexController'
        }).when('/error', {
          templateUrl: 'templates/error',
          controller: 'ErrorController'
        }).otherwise({
          redirectTo: '/index'
        });
      }
    ]);
    app.run([
      '$rootScope', '$http', 'facebook', '$location', function($rootScope, $http, facebook, $location) {
        var session;
        $rootScope.loginStatus = -1;
        $rootScope.user = null;
        $rootScope.authenticated = false;
        if (typeof authenticatedUser !== "undefined" && authenticatedUser !== null) {
          session = authenticatedUser;
          if (session) {
            $rootScope.user = session;
            $rootScope.authenticated = true;
          }
        }
        $rootScope.coolNumber = coolNumber;
        $rootScope.p = function(count, sing, plur, none) {
          if (!count || count < 1) {
            return __(none).replace(/:i:/g, count);
          }
          if (count < 2) {
            return __(sing).replace(/:i:/g, count);
          }
          if (count > 1) {
            return __(plur).replace(/:i:/g, count);
          }
        };
        $rootScope.pf = function(count, sing, plur, none) {
          if (!count || count < 1) {
            return __(none).replace(/:i:/g, $rootScope.coolNumber(count));
          }
          if (count < 2) {
            return __(sing).replace(/:i:/g, $rootScope.coolNumber(count));
          }
          if (count > 1) {
            return __(plur).replace(/:i:/g, $rootScope.coolNumber(count));
          }
        };
      }
    ]);
    app.controller('MainController', ['$scope', function($scope) {}]);
    app.controller('IndexController', ['$scope', function($scope) {}]);
    $(function() {
      return angular.bootstrap(document, ['Topfriends']);
    });
  });

}).call(this);
