angular.module('languages.service', [])
.factory('Languages', function($ionicPlatform, $q, $log, $cordovaSQLite) {
  'use strict';
  // Détection WebView Android ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isAndroid(),

  // Data pour le browser
  _languages = [{ code: 'de', label: 'Deutsch'},
  { code: 'en', label: 'English'},
  { code: 'fr', label: 'Français'}];

  // Méthodes publiques
  var getLanguages = function() {

    var q = $q.defer();

    if(_isWebView) {

      _languages = [];

      var dbQuery = "SELECT code, label FROM languages ORDER BY label";

      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _languages.push({ code : res.rows.item(i).code , label : res.rows.item(i).label });
          }

        }
        q.resolve(_languages);
      },
      function (err) {
        alert("Error get types : " + JSON.stringify(err));
      });


    } // Fallback si pas de BDD disponible
    else {
      q.resolve(_languages);
    }

    return q.promise;

  };

  var updateCurrentLanguage = function(language) {

    var q = $q.defer();

    if(_isWebView) {

      var dbQuery = 'UPDATE settings SET current_lang = ?, current_lang_label = (SELECT label FROM languages WHERE code = ?), current_unit_label = (SELECT name_' + language  + ' FROM unit_type WHERE code = (SELECT current_unit FROM settings))';

      $cordovaSQLite.execute(_db, dbQuery, [language, language])
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
    getLanguages:getLanguages,
    updateCurrentLanguage:updateCurrentLanguage
  };

});
