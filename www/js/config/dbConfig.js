// Configuration des tables de la base de données
angular.module('db.config', [])
.constant('DB_CONFIG', {
  name: 'cookconv',
  tables: [
    {
      name: 'ingredients', // Liste des ingrédients
      columns:[
        {name: 'id', type: 'integer primary key'},
        {name: 'name_fr', type: 'text'},
        {name: 'name_en', type: 'text'},
        {name: 'name_de', type: 'text'},
        {name: 'masse_volumique', type: 'numeric'},
        {name: 'ref', type: 'boolean'} // True si référentiel, false si crée par utilisateur
      ]
    },
    {
      name: 'unit_type', // Type d'unité pour la conversion
      columns:[
        {name: 'id', type: 'integer primary key'},
        {name: 'code', type: 'text'},
        {name: 'name_fr', type: 'text'},
        {name: 'name_en', type: 'text'},
        {name: 'name_de', type: 'text'}
      ]
    },
    {
      name: 'types', // Type d'unité pour la conversion
      columns:[
        {name: 'id', type: 'integer primary key'},
        {name: 'code', type: 'text'},
        {name: 'name_fr', type: 'text'},
        {name: 'name_en', type: 'text'},
        {name: 'name_de', type: 'text'},
        {name: 'type', type: 'text'}, // Poids / volume
        {name: 'ref', type: 'text'}, // I: Imperial / M : Metric
        {name: 'rapport', type: 'numeric'} // Soit au litre, soit au kilo en fonction du type
      ]
    },
    {
      name: 'savings', // Liste des conversions sauvegardées
      columns:[
        {name: 'id', type: 'integer primary key'},
        {name: 'ingredient', type: 'integer'},
        {name: 'from_value', type: 'numeric'},
        {name: 'from_type', type: 'text'},
        {name: 'to_value', type: 'numeric'},
        {name: 'to_type', type: 'text'}
      ]
    },
    {
      name: 'languages', // Langue de l'application
      columns:[
        {name: 'code', type: 'text  primary key'}, // Langue de l'application
        {name: 'label', type: 'text'}
      ]
    },
    {
      name: 'settings',
      columns:[
        {name: 'current_lang', type: 'text'}, // Langue de l'application (code de la table languages),
        {name: 'current_lang_label', type: 'text'}, // Langue de l'application (label de la table languages),
        {name: 'current_unit', type: 'text'}, // Type de mesures (code de la table unit_type)
        {name: 'current_unit_label', type: 'text'}, // Type de mesures (label de la table unit_type),
        {name: 'db_version', type: 'integer'} // Version de la base de données

      ]
    }
  ],
  datas: [
    {
      name: 'ingredients',
      columns : ["'name_fr', 'name_en', 'name_de', 'masse_volumique', 'ref'"], // Masse volumique en g / L
      rows:[ "'Eau', 'Water',  '', '1', 1",
      "'Lait', 'Milk',  '', '1.030', 1",
      "'Chocolat noir', 'Black chocolate',  '', '1.2', 1",
      "'Beurre', 'Butter',  '', '0.91', 1",
      "'Farine de maïs', 'Cornflour',  '', '0.6', 1" ]
    },
    {
      name: 'unit_type', // Type Metrique, US, UK
      columns : ["'code', 'name_fr', 'name_en', 'name_de'"],
      rows:[
        "'M', 'Métrique', 'Metric',  ''",
        "'I', 'Impérial UK', 'Imperial UK', ''",
        "'A', 'Impérial US', 'Imperial US', ''" ]
      },
      {
        name: 'types', // Type d'unité pour la conversion (tout en Litre ou Kilo)
        columns : ["'code', 'name_fr', 'name_en', 'name_de', 'type', 'ref', 'rapport'"],
        rows:[
          "'tsp', 'cuillère café', 'teaspoon',  '', 'volume', 'M', 202.884136211058",
          "'Tbsp', 'cuillère soupe', 'tablespoon',  '', 'volume', 'M', 67.688045403686",
          "'cp', 'tasse', 'cup',  '', 'volume', 'I', 4",
          "'Ml', 'millilitre', 'milliliter',  '', 'volume', 'M', 1000",
          "'Cl', 'centilitre', 'centiliter',  '', 'volume', 'M', 100",
          "'Dl', 'décilitre', 'deciliter',  '', 'volume', 'M', 10",
          "'L', 'litre', 'liter',  '', 'volume', 'M', 1",
          "'Kg', 'kilogramme', 'kilogram',  '', 'poids', 'M', 1",
          "'g', 'gramme', 'gram',  '', 'poids', 'M', 1000",
          "'mg', 'milligramme', 'milligram',  '', 'poids', 'M', 1000000",

          "'tsp', 'cuillère café', 'teaspoon',  '', 'volume', 'A', 202.884136211058",
          "'Tbsp', 'cuillère soupe', 'tablespoon',  '', 'volume', 'A', 67.688045403686",
          "'fl oz US', 'once liquide', 'fuild ounce',  '', 'volume', 'A', 33.814022701843",
          "'cp US', 'tasse', 'cup',  '', 'volume', 'A', 4.226752837730",
          "'pt US', 'pinte', 'pint',  '', 'volume', 'A', 2.113376418865",
          "'qt US', 'quart', 'quart',  '', 'volume', 'A', 1.056688209433",
          "'gal US', 'gallon', 'gallon',  '', 'volume', 'A', 0.264172052358",
          "'oz', 'once', 'ounce',  '', 'poids', 'A', 35.273368606702",
          "'lbs', 'livre', 'pound',  '', 'poids', 'A', 2.204585537919",

          "'tsp', 'cuillère café', 'teaspoon',  '', 'volume', 'I', 202.884136211058",
          "'Tbsp', 'cuillère soupe', 'tablespoon',  '', 'volume', 'I', 67.688045403686",
          "'fl oz UK', 'once liquide', 'US fuild ounce',  '', 'volume', 'I', 35.222429643197",
          "'cp UK', 'tasse', 'cup',  '', 'volume', 'I', 3.531938659055",
          "'pt UK', 'pinte', 'pint',  '', 'volume', 'I', 1.733667122043",
          "'qt UK', 'quart', 'quart',  '', 'volume', 'I', 0.880591757661",
          "'gal UK', 'gallon', 'gallon',  '', 'volume', 'I', 0.220143093010",
          "'oz', 'once', 'ounce',  '', 'poids', 'I', 35.273368606702",
          "'lbs', 'livre', 'pound',  '', 'poids', 'I', 2.204585537919"
        ]
      },
      {
        name: 'languages',
        columns : ["'code', 'label'"],
        rows:[ "'de', 'Deutsh'",
        "'en', 'English'",
        "'fr', 'Français'"]
      },
      {
        name: 'settings',
        columns : ["'current_lang', 'current_lang_label', 'current_unit', 'current_unit_label', 'db_version'"],
        rows:[ "'en', 'English', 'M', 'Metric', '1'"]
      },

    ]
  });
