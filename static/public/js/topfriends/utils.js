(function() {

  define(['angular', 'bootstrap', 'bootstrap.selectize'], function(angular) {
    var utils;
    utils = angular.module('topfriends.utils', []);
    utils.directive('schDropdown', function() {
      return {
        link: function(scope, element) {
          if (!element.hasClass('has-dropdown')) {
            return $(element).dropdown().addClass('has-dropdown');
          }
        }
      };
    });
    utils.directive('coolSelect', function() {
      return {
        require: 'ngModel',
        scope: {
          ngModel: '='
        },
        link: function(scope, element) {
          scope.$watch('ngModel', function(val) {
            element.selectize({
              create: true
            });
          });
        }
      };
    });
    utils.directive('schAccountCreation', function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/sch/account_creation',
        replace: true,
        scope: {
          type: '@',
          label: '@'
        },
        link: function(scope, element) {
          element.find(".modal-trigger").click(function() {
            return element.find(".modal").modal({
              keyboard: true,
              backdrop: true
            });
          });
          scope.hide = function() {
            console.log(element.find(".modal"));
            element.find(".modal").modal('hide');
          };
        }
      };
    });
    return utils.directive('schTooltip', function() {
      return {
        scope: {
          schTooltip: '=',
          schTooltipPlacement: '@'
        },
        link: function(scope, element) {
          return scope.$watchCollection("[schTooltipPlacement, schTooltip]", function() {
            console.log(scope.schTooltipPlacement);
            $(element).tooltip('destroy');
            return $(element).tooltip({
              container: 'body',
              placement: scope.schTooltipPlacement
            });
          });
        }
      };
    });
  });

}).call(this);
