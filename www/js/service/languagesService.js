angular.module('languages.service', [])
.factory('Languages', function($ionicPlatform, $q, $log, $cordovaSQLite) {

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView(),

  // Data pour le browser
  _languages = [{ code: 'GER', label: 'Allemand'},
    { code: 'ENG', label: 'Anglais'},
    { code: 'FRA', label: 'Français'}];

  // Méthodes publiques
  var getLanguages = function() {

      var q = $q.defer();

      $log.debug("Récupération des langues");

      if(_isWebView) {

      _languages = [];

      var dbQuery = "SELECT code, label FROM languages ORDER BY code";
      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
          if(res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _languages.push({ code : res.rows.item(i)["code"] , label : res.rows.item(i)["label"] });
            }

          }

          q.resolve(_languages);

        }, function (err) {
          alert("Error get types : " + JSON.stringify(err));
        });


      } // Fallback si pas de BDD disponible
      else {
        q.resolve(_languages);
      }

      return q.promise;

    };

    return {
        getLanguages:getLanguages
    };

});
