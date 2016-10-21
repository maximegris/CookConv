export default class TypesService {
  /* @ngInject */
  constructor($q, $log, $cordovaSQLite) {
    this.$q = $q
    this.$log = $log
    this.$cordovaSQLite = $cordovaSQLite
  }

  getTypes(language) {
    var q = this.$q.defer()

    var _types = []

    var dbQuery = 'SELECT id, code, name_' + language + ', type, rapport FROM types ORDER BY id'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _types.push({
              id: res.rows.item(i).id,
              code: res.rows.item(i).code,
              name: res.rows.item(i)['name_' + language],
              type: res.rows.item(i).type,
              rapport: res.rows.item(i).rapport
            })
          }
        }

        q.resolve(_types)
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }
}

