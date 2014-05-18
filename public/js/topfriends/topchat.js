(function() {

  define(['angular', 'facebook'], function(angular, FB) {
    var topchat;
    topchat = angular.module('topfriends.topchat', ['ngRoute']);
    topchat.config([
      '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        return $routeProvider.when('/facebook/topchat', {
          templateUrl: 'templates/facebook/topchat',
          controller: 'TopChatController'
        }).when('/facebook/topchat/share/:id', {
          templateUrl: 'templates/facebook/topchat.share',
          controller: 'TopChatShareController'
        }).otherwise({
          redirectTo: '/'
        });
      }
    ]);
    topchat.controller('TopChatShareController', [
      '$scope', '$http', '$comet', '$location', function($scope, $http, $comet, $location) {
        return console.log('xd');
      }
    ]);
    return topchat.controller('TopChatController', [
      '$scope', '$http', '$comet', '$location', function($scope, $http, $comet, $location) {
        var _this = this;
        $scope.threads = [];
        $scope.status = null;
        $scope.name_search = "";
        $scope.image = "";
        $scope.settings = {
          tag: false,
          friendsToTag: [],
          share: true,
          length: "top10"
        };
        $scope.filterIt = function(it) {
          if (!$scope.name_search) {
            return true;
          }
          return false;
        };
        $scope.generate = function() {
          $scope.status = "Preparando...";
          return $comet('/topchat/generate/:cbFn', function(type, message) {
            switch (type) {
              case "status":
                $scope.status = message;
                break;
              case "error":
                $location.path("/error").search("message", message);
                break;
              case "die":
                $location.path("/");
                break;
              case "image":
                $scope.image = message;
                break;
              case "complete":
                $location.path("/facebook/topchat/share/" + $scope.image);
            }
          }, $scope.settings);
        };
        $scope.init = function() {
          $scope.status = "Carregando...";
          $comet('/topchat/comet/:cbFn', function(type, message) {
            switch (type) {
              case "status":
                $scope.status = message;
                break;
              case "threads":
                $scope.status = "";
                $scope.threads = JSON.parse(message);
                break;
              case "error":
                $location.path("/error").search("message", message);
                break;
              case "die":
                $location.path("/");
            }
          });
        };
      }
    ]);
  });

}).call(this);
