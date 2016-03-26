(function(angular, undefined) {
  'use strict';

  angular.module('starter')
    .config(translateConfig);

  translateConfig.$inject = ['$translateProvider'];

  /* @ngInject */
  function translateConfig($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'assets/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'fr', 'de', 'es', 'pt', 'zh'], {
        'en': 'en',
        'en_*': 'en',
        'EN_*': 'en',
        'En_*': 'en',
        'fr': 'fr',
        'fr_*': 'fr',
        'FR_*': 'fr',
        'Fr_*': 'fr',
        'de': 'de',
        'de_*': 'de',
        'DE_*': 'de',
        'De_*': 'de',
        'es': 'es',
        'es_*': 'es',
        'ES_*': 'es',
        'Es_*': 'es',
        'pt': 'pt',
        'pt_*': 'pt',
        'PT_*': 'pt',
        'Pt_*': 'pt',
        'zh': 'zh',
        'zh_*': 'zh',
        'ZH_*': 'zh',
        'Zh_*': 'zh',
      })
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('escapeParameters');
  }


})(angular);
