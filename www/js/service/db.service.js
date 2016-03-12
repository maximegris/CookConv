// Définition du service de DB
(function(angular, undefined) {
  'use strict';

  angular.module('services').factory('DBFactory', DBFactory);

  DBFactory.$inject = ['$ionicPlatform', '$q', '$log', '$cordovaSQLite', '$translate', 'DB_CONFIG', 'IngredientsFactory', 'TypesFactory', 'LanguagesFactory'];

  function DBFactory($ionicPlatform, $q, $log, $cordovaSQLite, $translate, DB_CONFIG, IngredientsFactory, TypesFactory, LanguagesFactory, _bd) {

    // Methodes privees
    function isDBExists() {
      $log.debug("Vérification BDD existe ou non");
      var q = $q.defer();

      var dbQuery = 'SELECT current_lang, db_version FROM settings';

      $q.when($cordovaSQLite.execute(window._db, dbQuery))
        .then(function(res) {
          if (res && res.rows && res.rows.length > 0) {
            q.resolve({
              current_lang: res.rows.item(0).current_lang,
              version: res.rows.item(0).db_version
            });
          } else {
            q.reject();
          }

        }, function() {
          q.reject();
        });

      return q.promise;
    }

    function createDB() {
      $log.debug("Création de la BDD");
      var q = $q.defer();

      angular.forEach(DB_CONFIG.tables, function(table) {
        var columns = [];
        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });

        var dbQuery = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';

        $q.when($cordovaSQLite.execute(_db, dbQuery))
          .then(function() {
            q.resolve();
          }, function(error) {
            q.reject(error);
          });
      });

      return q.promise;
    }

    function insertDB() {
      $log.debug("Insertion dans la BDD");
      var q = $q.defer();

      angular.forEach(DB_CONFIG.datas, function(data) {
        angular.forEach(data.rows, function(row) {

          var dbQuery = 'INSERT INTO ' + data.name + '(' + data.columns + ') VALUES (' + row + ')';

          $q.when($cordovaSQLite.execute(window._db, dbQuery))
            .then(function() {
              q.resolve();
            }, function(error) {
              q.reject(error);
            });
        });
      });

      return q.promise;
    }

    function getSettings() {
      $log.debug("Récupération settings");
      var q = $q.defer();

      var dbQuery = 'SELECT current_lang, current_lang_label, db_version FROM settings';

      $q.when($cordovaSQLite.execute(window._db, dbQuery))
        .then(function(res) {
          q.resolve({
            current_lang: res.rows.item(0).current_lang,
            current_lang_label: res.rows.item(0).current_lang_label,
            db_version: res.rows.item(0).db_version
          });
        }, function(error) {
          q.reject(error);
        });

      return q.promise;
    }

    // Methodes publiques
    var initDB = function() {
      $log.debug("Initialisation de la BDD");
      var q = $q.defer();

      $ionicPlatform.ready(function() {

        isDBExists()
          .then(function(_current) {
            $translate.use(_current.current_lang);
            q.resolve(false);
          }, function() {
            createDB()
              .then(function() {
                return insertDB();
              }, function(error) {
                q.reject(error);
              })
              .then(function() {
                q.resolve(true);
              }, function(error) {
                q.reject(error);
              });
          });
      });

      return q.promise;
    };

    var getContextApplication = function(init, lang) {

      var q = $q.defer();

      if (init) {
        // On initialise la table settings avec la base langue
        LanguagesFactory.updateCurrentLanguage(lang)
          .then(function() {
            return $q.all([getSettings(), IngredientsFactory.getIngredients(lang), TypesFactory.getTypes(lang)]);
          }, function() {
            alert("Error init language");
          })
          .then(function(result) {
            q.resolve(result);
          }, function() {
            alert("Error init context");
          });

      } else {

        LanguagesFactory.getCurrentLanguage()
          .then(function(_current) {
            return $q.all([getSettings(), IngredientsFactory.getIngredients(_current.current_lang), TypesFactory.getTypes(_current.current_lang)]);
          }, function() {
            alert("Error init language");
          })
          .then(function(result) {
            q.resolve(result);
          }, function() {
            alert("Error init context");
          });

      }

      return q.promise;

    };

    // Public interface
    return {
      initDB: initDB,
      getContextApplication: getContextApplication
    };
  }

})(angular);
