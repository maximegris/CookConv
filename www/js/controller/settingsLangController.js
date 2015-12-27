// Contrller de l'onglet settings
angular.module('settings.lang.controller', ['languages.service', 'db.service'])
.controller('SettingsLangCtrl',  function($controller, $scope, $rootScope, $translate, Languages, DBFactory) {
  'use strict';

  var langvm = this;

  // IoC
  $controller('LoadCtrl');

  // Chargement des données
  langvm.current = {
    lang : $translate.use()
  };

  Languages.getLanguages().then(function(_languages) {

    langvm.languages = _languages;

    $scope.$watch('langvm.current.lang', changeLanguage, false);
  });

  // Fonctions privées
  function changeLanguage() {
    if(langvm.current) {

      $rootScope.show();

      DBFactory.getContextApplication(true, langvm.current.lang)
      .then(function(success) {

        if($translate.use() !== langvm.current.lang) {
          $rootScope.init = true;
          $translate.use(langvm.current.lang);
          $rootScope.settings = success[0];
          $rootScope.ingredients = success[1];
          $rootScope.types  = success[2];
        }

        // On laisse pendant 1 seconde la fenêtre pour montrer qu'il se passe quelquechose.
        setTimeout(function() {
          $rootScope.hide();
        }, 500);

      },
      function(error){
        alert("Error update Language" + error);
        $rootScope.hide();
      });

    }
  }

});
