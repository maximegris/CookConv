// Factory des types
angular.module('types.service', ['ionic', 'ngCordova']
).factory('Types', function($ionicPlatform, $q, $log, $cordovaSQLite, $translate) {
  'use strict';

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView(),

  // Data pour le browser
  _types = [{
    id : 1, code: 'L', name: 'litre', type : 'volume', ref : 'M',  rapport : '1'
  }, {
    id : 2, code: 'dL', name: 'décilitre', type : 'volume', ref : 'M', rapport : '10'
  }, {
    id : 3, code: 'cL', name: 'centilitre', type : 'volume', ref : 'M', rapport : '100'
  }, {
    id : 4, code: 'mL', name: 'millilitre', type : 'volume', ref : 'M', rapport : '1000'
  }, {
    id : 5, code: 'Kg', name: 'kilogramme', type : 'poids', ref : 'M', rapport : '1'
  }, {
    id : 6, code: 'g', name: 'gramme', type : 'poids', ref : 'M', rapport : '1000'
  }, {
    id : 7, code: 'mg', name: 'milligramme', type : 'poids', ref : 'M', rapport : '1000000'
  }],

  _unit = [{
    id : 1, code: 'M', name: 'Métrique'
  }, {
    id : 2, code: 'I', name: 'Imperial UK'
  }, {
    id : 3, code: 'A', name: 'Imperial US'
  }];

  // Méthodes publiques
  var getTypes = function() {

    var q = $q.defer();

    if(_isWebView) {

      _types = [];
      var dbQuery = "SELECT id, code, name_" +  $translate.use()  + ", type, rapport FROM types WHERE ref = (SELECT current_unit FROM settings) ORDER BY id";

      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _types.push({ id : res.rows.item(i).id , code : res.rows.item(i).code , name : res.rows.item(i)["name_" +  $translate.use()] ,
            type : res.rows.item(i).type , rapport : res.rows.item(i).rapport });
          }

        }

        q.resolve(_types);

      }, function (err) {
        alert("Error get types : " + JSON.stringify(err));
      });


    } // Fallback si pas de BDD disponible
    else {
      q.resolve(_types);
    }

    return q.promise;

  };

  // Méthodes publiques
  var getUnitTypes = function() {

    var q = $q.defer();

    if(_isWebView) {

      _unit = [];
      var dbQuery = "SELECT id, code, name_" +  $translate.use()  + " FROM unit_type ORDER BY id";

      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _unit.push({ id : res.rows.item(i).id , code : res.rows.item(i).code , name : res.rows.item(i)["name_" +  $translate.use()] });
          }

        }

        q.resolve(_unit);

      }, function (err) {
        alert("Error get unit : " + JSON.stringify(err));
      });


    } // Fallback si pas de BDD disponible
    else {
      q.resolve(_unit);
    }

    return q.promise;

  };


  var updateCurrentUnitType = function(type) {

    var q = $q.defer();

    if(_isWebView) {

      var dbQuery = 'UPDATE settings SET current_unit = ?';

      $cordovaSQLite.execute(_db, dbQuery, [type])
      .then(function() {
        q.resolve();
      },
      function(error) {
        q.reject(error);
      });

    } // Fallback si pas de BDD disponible
    else {
      q.resolve();
    }

    return q.promise;

  };

  return {
    getTypes:getTypes,
    getUnitTypes:getUnitTypes,
    updateCurrentUnitType:updateCurrentUnitType
  };

});
