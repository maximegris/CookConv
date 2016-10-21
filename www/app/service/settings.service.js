export default class SettingsService {
  /* @ngInject */
  constructor($q, $log, $cordovaSQLite) {
    this.$q = $q
    this.$log = $log
    this.$cordovaSQLite = $cordovaSQLite
    this.settings = null
  }

  getLocalSettings() {
    return this._settings
  }

  setLocalSettings(settings) {
    this._settings = settings
  }

  getSettings() {
    this.$log.debug('Récupération settings')
    var q = this.$q.defer()

    var dbQuery = 'SELECT current_lang, current_lang_label, db_version FROM settings'

    this.$q.when(this.$cordovaSQLite.execute(window._db, dbQuery))
      .then((res) => {
        q.resolve({
          current_lang: res.rows.item(0).current_lang,
          current_lang_label: res.rows.item(0).current_lang_label,
          db_version: res.rows.item(0).db_version
        })
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }
}

