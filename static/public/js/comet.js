(function() {

  define(['angular'], function(angular, io) {
    var socket;
    socket = angular.module('comet', []);
    socket.factory("$comet", [
      '$rootScope', '$location', function($rootScope, $location) {
        return function(address, cb, data) {
          var fnName, form, id, iframe;
          fnName = _.uniqueId("cb_fn_krl_");
          id = _.uniqueId("krl-");
          if (!window.cb) {
            window.cb = {};
          }
          window.cb[fnName] = function(xd) {
            xd = JSON.parse(xd);
            $rootScope.$apply(function() {
              return cb(xd.type, xd.message);
            });
          };
          if (data) {
            iframe = angular.element('<iframe/>', {
              'id': id,
              'name': id
            }).hide();
            form = angular.element('<form/>', {
              'id': "form-" + id,
              'method': 'POST',
              'target': id,
              'action': address.replace(":cbFn", fnName)
            });
            form.append(angular.element('<input/>', {
              'type': 'hidden',
              'name': 'data',
              'value': JSON.stringify(data)
            }));
            angular.element('body').append(iframe);
            angular.element('body').append(form);
            form.submit();
          } else {
            iframe = angular.element('<iframe/>', {
              'id': id,
              'src': address.replace(":cbFn", fnName)
            }).hide();
            angular.element('body').append(iframe);
          }
          return {
            dispose: function() {
              iframe.remove();
            }
          };
        };
      }
    ]);
  });

}).call(this);
