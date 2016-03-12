(function(angular, undefined) {
  'use strict';
  angular.module('directives').directive('settingsLang', settingsLang);

  settingsLang.$inject = [];

  function settingsLang() {

    var directive = {
      restrict: 'E',
      templateUrl: 'settings/settings-lang.html',
      controller: settingsLangController,
      controllerAs: 'langvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  settingsLangController.$inject = ['$scope', '$rootScope', '$translate', 'LanguagesFactory', 'DBFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  function settingsLangController($scope, $rootScope, $translate, LanguagesFactory, DBFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

    var vm = this;

    // Chargement des données
    vm.current = {
      lang: $translate.use()
    };

    LanguagesFactory.getLanguages().then(function(_languages) {

      vm.languages = _languages;

      $scope.$watch('langvm.current.lang', changeLanguage, false);
    });

    // Fonctions privées
    function changeLanguage() {
      if (vm.current) {

        $rootScope.$broadcast(_LOADING_SPINNER_START_);

        DBFactory.getContextApplication(true, vm.current.lang)
          .then(function(success) {

              if ($translate.use() !== vm.current.lang) {
                $rootScope.init = true;
                $translate.use(vm.current.lang);
                $rootScope.settings = success[0];
                $rootScope.ingredients = success[1];
                $rootScope.types = success[2];
              }

              $rootScope.$broadcast(_LOADING_SPINNER_END_);
            },
            function(error) {
              alert("Error update Language" + error);
              $rootScope.$broadcast(_LOADING_SPINNER_END_);
            });

      }
    }

  }
})(angular);
