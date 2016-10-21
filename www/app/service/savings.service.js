export default class SavingsService {
  /* @ngInject */
  constructor($q, $log, $translate, $cordovaSQLite) {
    this.$q = $q
    this.$log = $log
    this.$translate = $translate
    this.$cordovaSQLite = $cordovaSQLite
  }

  getSavings() {
    var q = this.$q.defer()

    var _savings = []

    var dbQuery = 'SELECT s.id, i.name_' + this.$translate.use() + ', s.from_value, s.from_type, s.to_value, s.to_type FROM savings s INNER JOIN ingredients i ON i.id = s.ingredient ORDER BY s.id'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _savings.push({
              id: res.rows.item(i).id,
              fromVal: res.rows.item(i).from_value,
              fromType: res.rows.item(i).from_type,
              toVal: res.rows.item(i).to_value,
              toType: res.rows.item(i).to_type,
              ingredient: res.rows.item(i)['name_' + this.$translate.use()]
            })
          }
        }
        q.resolve(_savings)
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }

  addSaving(record) {
    var q = this.$q.defer()

    var dbQuery = 'INSERT INTO savings(ingredient, from_value, from_type, to_value, to_type) VALUES (?,?,?,?,?)'

    this.$cordovaSQLite.execute(window._db, dbQuery, [record.ingredient, record.fromVal, record.fromType, record.toVal, record.toType])
      .then(() => {
        q.resolve()
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }

  removeSaving(record) {
    var q = this.$q.defer()

    var dbQuery = 'DELETE FROM savings WHERE id = ?'

    this.$cordovaSQLite.execute(window._db, dbQuery, [record.id])
      .then(() => {
        q.resolve()
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }

  resetSavings() {
    var q = this.$q.defer()

    var dbQuery = 'DELETE FROM savings'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then(() => {
        q.resolve()
      }, (err) => {
        q.reject(err)
      })

    return q.promise
  }
}

