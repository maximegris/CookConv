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
                name: 'type', // Type d'unité pour la conversion
                columns:[
                            {name: 'id', type: 'integer primary key'},
                            {name: 'name', type: 'text'},
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
                name: 'parameters',
                columns:[
                            {name: 'version', type: 'text'}, // Version de l'application
                            {name: 'lang', type: 'text'}, // Langue de l'application
                            {name: 'init', type: 'boolean'}
                ]
            }
        ],
        datas: [
            {
                name: 'ingredients',
                columns : ["'name_fr', 'name_en', 'name_ge', 'masse_volumique', 'ref'"],
                rows:[ "'Eau', 'Water',  '', 1, 1",
                       "'Farine', 'Flour',  '', 0.5, 1",
                ]
            },
            /*{
                name: 'type', // Type d'unité pour la conversion
                rows:[
                            {name: 'id', type: 'integer primary key', rapport: ''},

                ]
            },
            {
                name: 'parameters',
                rows:[
                            {name: 'version', type: 'text'}, // Version de l'application
                            {name: 'lang', type: 'text'}, // Langue de l'application
                            {name: 'init', type: 'boolean'}
                ]
            }*/
        ]
    });
