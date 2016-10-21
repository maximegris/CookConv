export default class LanguagesService {
  /* @ngInject */
  constructor($q, $log, $cordovaSQLite) {
    this.$q = $q
    this.$log = $log
    this.$cordovaSQLite = $cordovaSQLite
  }

  getLanguages() {
    var q = this.$q.defer()

    var _languages = []

    var dbQuery = 'SELECT code, label FROM languages ORDER BY label'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _languages.push({
              code: res.rows.item(i).code,
              label: res.rows.item(i).label
            })
          }
        }
        q.resolve(_languages)
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }

  updateCurrentLanguage(language) {
    var q = this.$q.defer()

    var dbQuery = 'UPDATE settings SET current_lang = ?, current_lang_label = (SELECT label FROM languages WHERE code = ?)'

    this.$cordovaSQLite.execute(window._db, dbQuery, [language, language])
      .then(() => {
        q.resolve()
      }, (error) => {
        q.reject(error)
      })

    return q.promise
  }

  getCurrentLanguage() {
    var q = this.$q.defer()

    var _current = {
      current_lang: 'fr'
    }

    var dbQuery = 'SELECT current_lang FROM settings'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then((res) => {
        if (res.rows.length > 0) {
          _current.current_lang = res.rows.item(0).current_lang
        }
        q.resolve(_current)
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }
}

