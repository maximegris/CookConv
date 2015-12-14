// Définition du service de DB
angular.module('db.service', ['ionic', 'db.config', 'ngCordova', 'ingredients.service', 'types.service', 'languages.service']
).factory('DBFactory', function($ionicPlatform, $q, $log, $cordovaSQLite, $translate, DB_CONFIG, Ingredients, Types, Languages) {
  'use strict';

  // Détection WebView Android ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isAndroid();

  // Methodes privees
  function isDBExists() {
    $log.debug("Vérification BDD existe ou non");
    var q = $q.defer();

    var dbQuery = 'SELECT current_lang, db_version FROM settings';

    $q.when($cordovaSQLite.execute(_db, dbQuery))
    .then(function(res) {
      $translate.use(res.rows.item(0).current_lang);
      q.resolve();
    },
    function() {
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
      },
      function(error) {
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

        var dbQuery = 'INSERT INTO ' + data.name + '('+ data.columns + ') VALUES (' + row + ')';

        $q.when($cordovaSQLite.execute(_db, dbQuery))
        .then(function() {
          q.resolve();
        },
        function(error) {
          //alert(dbQuery);
          q.reject(error);
        });
      });
    });

    return q.promise;
  }

  function getSettings() {
    $log.debug("Récupération settings");
    var q = $q.defer();

    if(_isWebView) {
      var dbQuery = 'SELECT current_lang, current_lang_label, current_unit, current_unit_label, db_version FROM settings';

      $q.when($cordovaSQLite.execute(_db, dbQuery))
      .then(function(res) {
        q.resolve({current_lang : res.rows.item(0).current_lang , current_lang_label : res.rows.item(0).current_lang_label ,
          current_unit : res.rows.item(0).current_unit , current_unit_label : res.rows.item(0).current_unit_label ,  db_version : res.rows.item(0).db_version });
      },
      function(error) {
        q.reject(error);
      });

    } else {
      q.resolve({current_lang : 'fr', current_lang_label : 'Français', current_unit : 'M', current_unit_label: 'Métrique', db_version : 1});
    }

    return q.promise;
  }


  // Methodes publiques
  var initDB = function() {
    $log.debug("Initialisation de la BDD");
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      if(_isWebView) {

        isDBExists()
        .then(function() {
          q.resolve(false);
        },
        function() {
          createDB()
          .then(function() { return insertDB(); }, function(error) { q.reject(error); })
          .then(function() { q.resolve(true); }, function(error) { q.reject(error); });
        });

      } else {
        q.resolve(true);
      }
    });

    return q.promise;
  };

  var getContextApplication = function(init, lang) {

    var q= $q.defer();

    if(init) {
      // On initialise la table settings avec la base langue
      Languages.updateCurrentLanguage(lang)
      .then(function(){
        return $q.all([getSettings(), Ingredients.getIngredients(), Types.getTypes()]);
      },
      function(){
        alert("Error init language");
      })
      .then(function(result) {
        q.resolve(result);
      },
      function() {
        alert("Error init context");
      });

    } else {

      $q.all([getSettings(), Ingredients.getIngredients(), Types.getTypes()])
      .then(function(result) {
        q.resolve(result);
      },
      function() {
        alert("Error init context");
      });

    }

    return q.promise;

  };

  return {
    initDB:initDB,
    getContextApplication:getContextApplication
  };
});
