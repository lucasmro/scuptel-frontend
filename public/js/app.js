'use strict';

var scupTelApp = angular.module('scupTelApp', []);

scupTelApp.controller('scupTelController', function($scope, $http) {

  $http.get('http://scuptel-api.dev/area-codes').success(function(areaCodes) {
    $scope.areaCodes = areaCodes.data;
  });

  $scope.simulatePrice = function() {

    var fromAreaCode = $scope.originAreaCode;
    var toAreaCode = $scope.destinyAreaCode;
    var timeInMinutes = $scope.timeInMinutes;

    if ((typeof fromAreaCode != "undefined") && (typeof toAreaCode != "undefined") && (typeof timeInMinutes != "undefined")) {

      var priceSimulatorResource = 'http://scuptel-api.dev/price-simulator';
      var priceSimulatorParams = '/origin/' + fromAreaCode + '/destiny/' + toAreaCode + '/time/' + $scope.timeInMinutes;
      var priceSimulatorUrl = priceSimulatorResource + priceSimulatorParams;

      $http.get(priceSimulatorUrl).success(function(data) {
        $scope.planFaleMais30 = data['falemais-30'];
        $scope.planFaleMais60 = data['falemais-60'];
        $scope.planFaleMais120 = data['falemais-120'];
        $scope.planNormal = data['no-plan'];
      });
    }
  };
});
