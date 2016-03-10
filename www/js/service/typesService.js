// Factory des types
angular.module('types.service', ['ionic', 'ngCordova']).factory('Types', function($q, $log, $cordovaSQLite) {
  'use strict';

  // Méthodes publiques
  var getTypes = function(language) {

    var q = $q.defer();

    var _types = [];

    var dbQuery = "SELECT id, code, name_" + language + ", type, rapport FROM types ORDER BY id";

    $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res) {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _types.push({
              id: res.rows.item(i).id,
              code: res.rows.item(i).code,
              name: res.rows.item(i)["name_" + language],
              type: res.rows.item(i).type,
              rapport: res.rows.item(i).rapport
            });
          }
        }

        q.resolve(_types);

      }, function(err) {
        alert("Error get types : " + JSON.stringify(err));
      });

    return q.promise;

  };

  // Public interface
  return {
    getTypes: getTypes
  };

});