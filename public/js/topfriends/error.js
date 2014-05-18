(function() {

  define(['angular', 'facebook'], function(angular, FB) {
    var topchat;
    topchat = angular.module('topfriends.error', []);
    return topchat.controller('ErrorController', [
      '$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.init = function() {
          $scope.message = $location.search().message;
        };
      }
    ]);
  });

}).call(this);
