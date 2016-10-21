export default class DBService {
  /* @ngInject */
  constructor($q, IngredientsService, TypesService, LanguagesService, SettingsService) {
    this.$q = $q
    this.IngredientsService = IngredientsService
    this.TypesService = TypesService
    this.LanguagesService = LanguagesService
    this.SettingsService = SettingsService
  }

  getContextApplication(init, lang) {
    var q = this.$q.defer()
    if (init) {
      // Init table settings with language info
      this.LanguagesService.updateCurrentLanguage(lang)
        .then(() => {
          return this.$q.all([this.SettingsService.getSettings(), this.IngredientsService.getIngredients(lang), this.TypesService.getTypes(lang)])
        }, (err) => {
          q.reject(err)
        })
        .then((result) => {
          q.resolve(result)
        }, (err) => {
          q.reject(err)
        })
    } else {
      this.LanguagesService.getCurrentLanguage()
        .then((_current) => {
          return this.$q.all([this.SettingsService.getSettings(), this.IngredientsService.getIngredients(_current.current_lang), this.TypesService.getTypes(_current.current_lang)])
        }, (err) => {
          q.reject(err)
        })
        .then((result) => {
          q.resolve(result)
        }, (err) => {
          q.reject(err)
        })
    }

    return q.promise
  }
}
