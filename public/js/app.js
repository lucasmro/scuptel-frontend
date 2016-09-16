'use strict';

var scupTelApp = angular.module('scupTelApp', []);

scupTelApp.controller('scupTelController', function($scope, $http, $filter) {

  var backendEndpoint = 'http://localhost';

  $http.get(backendEndpoint + '/area-codes').success(function(areaCodes) {
    $scope.areaCodes = areaCodes.data;
  });

  $scope.simulatePrice = function() {

    var fromAreaCode = $scope.originAreaCode;
    var toAreaCode = $scope.destinyAreaCode;
    var timeInMinutes = $scope.timeInMinutes;

    if ((typeof fromAreaCode != "undefined") && (typeof toAreaCode != "undefined") && (typeof timeInMinutes != "undefined")) {

      var priceSimulatorResource = '/price-simulator/origin/' + fromAreaCode + '/destiny/' + toAreaCode + '/time/' + $scope.timeInMinutes;

      $http.get(backendEndpoint + priceSimulatorResource).success(function(data) {
        $scope.planFaleMais30 = 0;
        $scope.planFaleMais60 = 0;
        $scope.planFaleMais120 = 0;
        $scope.planNormal = 0;

        if (data['falemais-30'] > 0) {
          $scope.planFaleMais30 = $filter('currency')(data['falemais-30'], 'R$ ');
        }

        if (data['falemais-60'] > 0) {
          $scope.planFaleMais60 = $filter('currency')(data['falemais-60'], 'R$ ');
        }

        if (data['falemais-120'] > 0) {
          $scope.planFaleMais120 = $filter('currency')(data['falemais-120'], 'R$ ');
        }

        if (data['no-plan'] > 0) {
          $scope.planNormal = $filter('currency')(data['no-plan'], 'R$ ');
        }
      });
    }
  };
});
