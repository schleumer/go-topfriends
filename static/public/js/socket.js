(function() {

  define(['angular', 'socket.io'], function(angular, io) {
    var socket;
    socket = angular.module('socket', []);
    socket.factory("socket", [
      '$rootScope', '$location', function($rootScope, $location) {
        return function(address) {
          socket = io.connect(address);
          if (socket.socket.connected) {
            socket.socket.disconnect();
            socket.socket.reconnect();
          }
          socket.on('error', function(info) {
            $location.path("/error").search(info).replace();
            $rootScope.$apply();
          });
          return {
            on: function(eventName, callback) {
              return socket.on(eventName, function() {
                var args;
                args = arguments;
                return $rootScope.$apply(function() {
                  return callback.apply(socket, args);
                });
              });
            },
            emit: function(eventName, data, callback) {
              return socket.emit(eventName, data, function() {
                var args;
                args = arguments;
                return $rootScope.$apply(function() {
                  if (callback) {
                    return callback.apply(socket, args);
                  }
                });
              });
            }
          };
        };
      }
    ]);
  });

}).call(this);
