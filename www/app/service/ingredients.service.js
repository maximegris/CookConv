export default class IngredientsService {
  /* @ngInject */
  constructor($q, $log, $translate, $cordovaSQLite) {
    this.$q = $q
    this.$log = $log
    this.$translate = $translate
    this.$cordovaSQLite = $cordovaSQLite
  }

  getIngredients(language) {
    var q = this.$q.defer()

    var _ingredients = []

    var dbQuery = 'SELECT id, name_' + language + ', masse_volumique, ref FROM ingredients ORDER BY name_' + language

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then(function (res) {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _ingredients.push({
              id: res.rows.item(i).id,
              name: res.rows.item(i)['name_' + language],
              masse_volumique: res.rows.item(i).masse_volumique,
              ref: res.rows.item(i).ref
            })
          }
        }

        q.resolve(_ingredients)
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }

  getIngredientsByRef(ref) {
    var q = this.$q.defer()

    var _ingredients = []

    var dbQuery = 'SELECT id, name_' + this.$translate.use() + ', masse_volumique FROM ingredients WHERE ref = ' + ref + ' ORDER BY name_' + this.$translate.use()

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then(function (res) {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _ingredients.push({
              id: res.rows.item(i).id,
              name: res.rows.item(i)['name_' + this.$translate.use()],
              masse_volumique: res.rows.item(i).masse_volumique
            })
          }
        }

        q.resolve(_ingredients)
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }

  resetIngredients() {
    var q = this.$q.defer()

    var dbQuery = 'DELETE FROM ingredients WHERE ref <> 1'

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then(function (res) {
        q.resolve()
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }

  createUserIngredient(record) {
    var q = this.$q.defer()

    var dbQuery = 'INSERT INTO ingredients(masse_volumique ,ref, name_de, name_en, name_es, name_fr, name_pt, name_zh)  VALUES (?,?,?,?,?,?,?,?)'

    this.$cordovaSQLite.execute(window._db, dbQuery, [record.masse_volumique, 0, record.name, record.name, record.name, record.name, record.name, record.name])
      .then(function (res) {
        q.resolve()
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }

  updateUserIngredient(record) {
    var q = this.$q.defer()

    var dbQuery = 'UPDATE ingredients SET masse_volumique = ?, name_de = ?, name_en = ?, name_es = ?, name_fr = ?, name_pt = ?, name_zh = ? WHERE id = ? AND ref = ?'

    this.$cordovaSQLite.execute(window._db, dbQuery, [record.masse_volumique, record.name, record.name, record.name, record.name, record.name, record.name, record.id, 0])
      .then(function (res) {
        q.resolve()
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }

  removeUserIngredient(ingredient) {
    var q = this.$q.defer()

    var dbQuery = 'DELETE FROM ingredients WHERE id =' + ingredient.id

    this.$cordovaSQLite.execute(window._db, dbQuery)
      .then(function (res) {
        q.resolve()
      }, function (err) {
        q.reject(err)
      })

    return q.promise
  }
}


