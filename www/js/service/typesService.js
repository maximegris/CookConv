// Factory des types
angular.module('types.service', ['ionic', 'ngCordova']
).factory('Types', function($q, $log, $cordovaSQLite) {
  'use strict';

  // Méthodes publiques
  var getTypes = function(language) {

    var q = $q.defer();

    var _types = [];

    var dbQuery = "SELECT id, code, name_" +  language  + ", type, rapport FROM types WHERE ref = (SELECT current_unit FROM settings) ORDER BY id";

    $cordovaSQLite.execute(_db, dbQuery)
    .then(function(res){
      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          _types.push({ id : res.rows.item(i).id , code : res.rows.item(i).code , name : res.rows.item(i)["name_" +  language] ,
          type : res.rows.item(i).type , rapport : res.rows.item(i).rapport });
        }
      }

      q.resolve(_types);

    }, function (err) {
      alert("Error get types : " + JSON.stringify(err));
    });

    return q.promise;

  };

  // Méthodes publiques
  var getUnitTypes = function(language) {

    var q = $q.defer();

    var _unit = [];

    var dbQuery = "SELECT id, code, name_" +  language  + " FROM unit_type ORDER BY id";

    $cordovaSQLite.execute(_db, dbQuery)
    .then(function(res){
      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          _unit.push({ id : res.rows.item(i).id , code : res.rows.item(i).code , name : res.rows.item(i)["name_" +  language] });
        }

      }

      q.resolve(_unit);

    }, function (err) {
      alert("Error get unit : " + JSON.stringify(err));
    });

    return q.promise;

  };


  var updateCurrentUnitType = function(type) {

    var q = $q.defer();

    var dbQuery = 'UPDATE settings SET current_unit = ?';

    $cordovaSQLite.execute(_db, dbQuery, [type])
    .then(function() {
      q.resolve();
    },
    function(error) {
      q.reject(error);
    });

    return q.promise;

  };

  // Public interface
  return {
    getTypes:getTypes,
    getUnitTypes:getUnitTypes,
    updateCurrentUnitType:updateCurrentUnitType
  };

});
