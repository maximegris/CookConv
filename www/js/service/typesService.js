// Factory des types
angular.module('types.service', ['ionic', 'ngCordova']
).factory('Types', function($ionicPlatform, $q, $log, $cordovaSQLite) {

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView(),

  // Data pour le browser
  _types_from = [{
       id : 1, code: 'L', name: 'litre', type : 'volume', rapport : '1',id_radio : "L_from"
    }, {
       id : 2, code: 'dL', name: 'décilitre', type : 'volume', rapport : '10', id_radio : "Dl_from"
    }, {
       id : 3, code: 'cL', name: 'centilitre', type : 'volume', rapport : '100', id_radio : "Cl_from"
    }, {
       id : 4, code: 'mL', name: 'millilitre', type : 'volume', rapport : '1000', id_radio : "Ml_from"
    }, {
       id : 5, code: 'Kg', name: 'kilogramme', type : 'poids', rapport : '1', id_radio : "Kg_from"
    }, {
       id : 6, code: 'g', name: 'gramme', type : 'poids', rapport : '1000', id_radio : "g_from"
    }, {
       id : 7, code: 'mg', name: 'milligramme', type : 'poids', rapport : '1000000', id_radio : "mg_from"
    }],

    _types_to = [{
       id : 1, code: 'L', name: 'litre', type : 'volume', rapport : '1', id_radio : "L_to"
    }, {
       id : 2, code: 'dL', name: 'décilitre', type : 'volume', rapport : '10', id_radio : "Dl_to"
    }, {
       id : 3, code: 'cL', name: 'centilitre', type : 'volume', rapport : '100', id_radio : "Cl_to"
    }, {
       id : 4, code: 'mL', name: 'millilitre', type : 'volume', rapport : '1000', id_radio : "Ml_to"
    }, {
       id : 5, code: 'Kg', name: 'kilogramme', type : 'poids', rapport : '1', id_radio : "Kg_to"
    }, {
       id : 6, code: 'g', name: 'gramme', type : 'poids', rapport : '1000', id_radio : "g_from"
    }, {
       id : 7, code: 'mg', name: 'milligramme', type : 'poids', rapport : '1000000', id_radio : "mg_to"
    }];


  // Méthodes publiques
  var getTypes = function(type) {

      $log.debug("Récupération des types");

      var q = $q.defer();

      if(_isWebView) {

      var _types = [],
      ext = "_" + type;

      var dbQuery = "SELECT id, code, name_fr, type, rapport FROM types ORDER BY id";
      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
          if(res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _types.push({ id : res.rows.item(i)["id"] , code : res.rows.item(i)["code"], name : res.rows.item(i)["name_fr"],
              type : res.rows.item(i)["type"], rapport : res.rows.item(i)["rapport"], id_radio : res.rows.item(i)["code"] + ext });
            }

          }

          q.resolve(_types);

        }, function (err) {
          alert("Error get types : " + JSON.stringify(err));
        });


      } // Fallback si pas de BDD disponible
      else {
        if(type === "from") {
            q.resolve(_types_from);
        } else {
            q.resolve(_types_to);
        }

      }

      return q.promise;

    };

    return {
        getTypes:getTypes
    };

});
