(function() {

  define(['angular', 'facebook', 'pnotify'], function(angular, FB) {
    var utils;
    utils = angular.module('topfriends.facebook', []);
    utils.service('facebook', [
      '$http', '$rootScope', function($http, $rootScope) {
        return {
          login: function(response, cb) {
            var data;
            data = {};
            if (response.status === 'connected') {
              return $http({
                url: '/status',
                method: 'GET',
                params: {
                  from: 'facebook',
                  token: response.authResponse.accessToken
                }
              }).success(function(res) {
                console.log(res);
                if (res.data) {
                  data.user = res.data;
                  data.authenticated = true;
                }
                $rootScope.user = data;
                cb(data);
              });
            }
          }
        };
      }
    ]);
    utils.directive('topfriendsLogout', [
      '$http', function($http) {
        return {
          link: function(scope, element) {
            element.click(function() {
              $http["delete"]('/user').success(function() {
                return location.href = '/';
              });
            });
          }
        };
      }
    ]);
    utils.directive('topfriendsQuitFacebook', [
      '$http', function($http) {
        return {
          link: function(scope, element) {
            element.click(function() {
              $http["delete"]('/user').success(function() {
                FB.api("/me/permissions", "DELETE", function(response) {
                  location.href = '/';
                });
              });
            });
          }
        };
      }
    ]);
    utils.directive('topfriendsFacebook', [
      '$rootScope', 'facebook', function($rootScope, facebook) {
        return {
          require: 'ngModel',
          scope: {
            ngModel: '=',
            fbScope: '=',
            complete: '&'
          },
          link: function(scope, element) {
            return element.click(function() {
              return FB.login((function(response) {
                if (!(response.authResponse != null)) {
                  $.pnotify({
                    type: 'alert',
                    text: __('Você precisa autorizar o aplicativo')
                  });
                }
                facebook.login(response, function(data) {
                  scope.ngModel.user = data.user;
                  scope.ngModel.authenticated = data.authenticated;
                  $rootScope.user = data.user;
                  scope.complete();
                });
              }), {
                scope: 'email'
              });
            });
          }
        };
      }
    ]);
    return utils.directive('topfriendsFacebookAuthorize', [
      'facebook', '$compile', '$http', '$templateCache', '$rootScope', function(facebook, $compile, $http, $templateCache, $rootScope) {
        return {
          scope: {
            topfriendsFacebookAuthorize: '@'
          },
          link: function(scope, element) {
            return $rootScope.$watch('user', function() {
              var bindAuth, hasPermissions, p, permissionsToCheck, _i, _len;
              element.hide();
              if ($rootScope.user && $rootScope.user.permissions) {
                hasPermissions = true;
                permissionsToCheck = scope.topfriendsFacebookAuthorize.split(/,/g);
                for (_i = 0, _len = permissionsToCheck.length; _i < _len; _i++) {
                  p = permissionsToCheck[_i];
                  if (!($rootScope.user.permissions[p] != null)) {
                    hasPermissions &= false;
                  }
                }
                if (!hasPermissions) {
                  bindAuth = function(el) {
                    el.find('.auth-button').click(function() {
                      return FB.login((function(response) {
                        facebook.login(response, function(data) {
                          console.log(data);
                          $rootScope.user = data.user;
                        });
                      }), {
                        scope: scope.topfriendsFacebookAuthorize
                      });
                    });
                  };
                  if (!element.hasClass('topfriends-facebook-authorize-ready')) {
                    element.addClass('topfriends-facebook-authorize-ready');
                    return $http.get('/templates/facebook_authorize', {
                      cache: $templateCache
                    }).success(function(res) {
                      var el;
                      el = $compile(res)(scope);
                      bindAuth(el);
                      return el.insertAfter(element);
                    });
                  }
                } else {
                  if (element.hasClass('topfriends-facebook-authorize-ready')) {
                    element.parent().find('.topfriends-facebook-authorize').remove();
                    element.removeClass('topfriends-facebook-authorize-ready');
                  }
                  return element.show();
                }
              }
            });
          }
        };
      }
    ]);
  });

}).call(this);
