// Factory des sauvergardes
angular.module('savings.service', ['ionic', 'ngCordova']
).factory('Savings', function($ionicPlatform, $q, $log, $cordovaSQLite) {
  'use strict';

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView();

  // Méthodes publiques
  var getSavings = function() {



  };

  var addSaving = function() {


  };

  return {
    getSavings:getSavings,
    addSaving:addSaving
  };

});
