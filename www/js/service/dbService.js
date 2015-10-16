 // Définition du service de DB
 angular.module('db.service', ['ionic', 'db.config', 'ngCordova']
 ).factory('DBFactory', function($ionicPlatform, $q, $log, $cordovaSQLite, DB_CONFIG) {

  // Détection WebView ou non pour utiliser SQLite
    var _isWebView = ionic.Platform.isWebView();

    // Méthodes publique
    var initDB = function() {

      var q = $q.defer();

      $ionicPlatform.ready(function () {
            $log.debug("Création de la BDD");
            if(_isWebView) {

            angular.forEach(DB_CONFIG.tables, function(table) {
              var columns = [];
              angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
              });

              var dbQuery = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
              $cordovaSQLite.execute(_db, dbQuery)
              .then(
                function(res) {
                },function (err) {
                alert("Error create " + table.name +  " " + JSON.stringify(err));
                $log.debug("Problème création de la BDD");
                }
              );
            });

            angular.forEach(DB_CONFIG.datas, function(data) {
              angular.forEach(data.rows, function(row) {

                var dbQuery = 'INSERT INTO ' + data.name + '('+ data.columns + ') VALUES (' + row + ')';
                $cordovaSQLite.execute(_db, dbQuery)
                .then(function(res) {
                  },function (err) {
                    alert("Error insert " + data.name +  " " + JSON.stringify(err));
                    $log.debug("PB insertion dans la BDD");

                  }
                );
              });

            });

            // Quand tout est fait, resolve le promise
              q.resolve("Type : SmartPhone (SQLite) => Alimentation de la base effectuée");
            } else {
              q.resolve("Type : Browser");
            }
          });

      return q.promise;
    };


    return {
        initDB:initDB
    };
})
