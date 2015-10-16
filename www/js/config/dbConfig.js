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
                            {name: 'name_ge', type: 'text'},
                            {name: 'masse_volumique', type: 'numeric'},
                            {name: 'ref', type: 'boolean'} // True si référentiel, false si crée par utilisateur
                ]
            },
            {
                name: 'types', // Type d'unité pour la conversion
                columns:[
                            {name: 'id', type: 'integer primary key'},
                            {name: 'code', type: 'text'},
                            {name: 'name_fr', type: 'text'},
                            {name: 'name_en', type: 'text'},
                            {name: 'name_ge', type: 'text'},
                            {name: 'type', type: 'text'}, // Poids / volume
                            {name: 'rapport', type: 'numeric'} // Soit au litre, soit au kilo en fonction du type
                ]
            },

            {
                name: 'saving', // Liste des conversions sauvegardées
                columns:[
                            {name: 'id', type: 'integer primary key'},
                            {name: 'ingredient', type: 'integer'},
                            {name: 'from_value', type: 'numeric'},
                            {name: 'from_type', type: 'integer'},
                            {name: 'to_value', type: 'numeric'},
                            {name: 'to_type', type: 'integer'}
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
                            {name: 'lang', type: 'text'}, // Langue de l'application (code de la table languages)
                            {name: 'init', type: 'boolean'}
                ]
            }
        ],
        datas: [
            {
                name: 'ingredients',
                columns : ["'name_fr', 'name_en', 'name_ge', 'masse_volumique', 'ref'"], // Masse volumique en g / L
                rows:[ "'Eau', 'Water',  '', '1', 1",
                       "'Lait', 'Milk',  '', '1.030', 1",
                       "'Chocolat noir', 'Black chocolate',  '', '1.2', 1",
                       "'Beurre', 'Butter',  '', '0.91', 1",
                       "'Farine de maïs', 'Cornflour',  '', '0.6', 1",
                ]
            },
            {
                name: 'types', // Type d'unité pour la conversion
                columns : ["'code', 'name_fr', 'name_en', 'name_ge', 'type', 'rapport'"],
                rows:[ "'L', 'litre', 'liter',  '', 'volume', 1",
                       "'Dl', 'décilitre', 'deciliter',  '', 'volume', 10",
                       "'Cl', 'centilitre', 'centiliter',  '', 'volume', 100",
                       "'Ml', 'millilitre', 'milliliter',  '', 'volume', 1000",
                       "'Kg', 'kilogramme', 'kilogram',  '', 'poids', 1",
                       "'g', 'gramme', 'gram',  '', 'poids', 1000",
                       "'mg', 'milligramme', 'milligram',  '', 'poids', 1000000",
                ]
            },
            {
                name: 'languages',
                columns : ["'code', 'label'"],
                rows:[ "'GER', 'Allemand'",
                       "'ENG', 'Anglais'",
                       "'FRA', 'Français'",
                ]
            },

        ]
    });
