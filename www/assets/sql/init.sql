CREATE TABLE IF NOT EXISTS ingredients(id integer primary key, name_fr VARCHAR(100), name_en VARCHAR(100), name_de VARCHAR(100), name_es VARCHAR(100), name_pt VARCHAR(100), name_zh VARCHAR(100), masse_volumique numeric, ref boolean);
CREATE TABLE IF NOT EXISTS types(id integer primary key, code VARCHAR(10), name_fr VARCHAR(30), name_en VARCHAR(30), name_de VARCHAR(30), name_es VARCHAR(30), name_pt VARCHAR(30), name_zh VARCHAR(30), type VARCHAR(20), rapport NUMERIC);
CREATE TABLE IF NOT EXISTS savings(id integer primary key, ingredient integer, from_value numeric, from_type VARCHAR(20), to_value numeric, to_type VARCHAR(20));
CREATE TABLE IF NOT EXISTS languages(code VARCHAR(10) primary key, label VARCHAR(20));
CREATE TABLE IF NOT EXISTS settings(current_lang VARCHAR(10), current_lang_label VARCHAR(20), db_version integer);

INSERT INTO ingredients(name_fr, name_en, name_de, name_es, name_pt, name_zh, masse_volumique, ref)
VALUES
('Abricot (séché)', 'Apricot (dried)', 'Aprikose (getrocknet)', 'Albaricoque (seco)', 'Alperce (seco)', '杏（干）', '0.64', 1),
('Ail', 'Garlic', 'Knoblauch', 'Ajo', 'Alho', '大蒜', '0.68', 1),
('Arachides (haché)' , 'Peanuts (ground)' , 'Erdnüsse (gehackt)' , 'Cacahuetes (picados)' , 'Amendoins (picados)' , '花生（碎）', '0.68', 1),
('Beurre' , 'Butter' , 'Butter' , 'Mantequilla' , 'Manteiga' , '黄油', '0.97', 1),
('Beurre darachide' , 'Peanut butter' , 'Erdnussbutter' , 'Manteca de cacahuete' , 'Manteiga de amendoim' , '花生酱', '0.76', 1),
('Bicarbo. de soude' , 'Bicarbonate of soda' , 'Natriumbicarbonat' , 'Bicarbonato sódico' , 'Bicarb. de sódio' , '小苏打', '0.87', 1),
('Blanc d oeuf' , 'Egg white' , 'Eiweiß' , 'Clara de huevo' , 'Clara de ovo' , '蛋白', '0.93', 1),
('Café' , 'Coffee' , 'Kaffee' , 'Café' , 'Café' , '咖啡', '0.38', 1),
('Cannelle' , 'Cinnamon' , 'Zimt' , 'Canela' , 'Canela' , '桂皮', '0.51', 1),
('Cacao (poudre)' , 'Cocoa (powder)' , 'Kakao (Pulver)' , 'Cacao (polvo)' , 'Cacau (po)' , '可可（粉）', '0.47', 1),
('Chocolat (fondu)' , 'Chocolate (melted)' , 'Schokolade (geschmolzen)' , 'Chocolate (fundido)' , 'Chocolate (fundir)' , '巧克力（酱）', '1.02', 1),
('Chocolat (rapé)' , 'Chocolate (grated)' , 'Schokolade (geraspelt)' , 'Chocolate (rallado)' , 'Chocolate (raspas)' , '巧克力（碎）', '0.42', 1),
('Crème' , 'Cream' , 'Sahne' , 'Nata' , 'Natas' , '奶油', '0.51', 1),
('Eau' , 'Water' , 'Wasser' , 'Agua' , 'Água' , '水', '1', 1),
('Echalote' , 'Shallot' , 'Schalotte' , 'Chalote' , 'Chalotas' , '葱', '1.02', 1),
('Farine' , 'Flour' , 'Mehl' , 'Harina' , 'Farinha' , '面粉', '0.42', 1),
('Farine de blé' , 'Wheat flour' , 'Weizenmehl' , 'Harina de trigo' , 'Farinha de trigo' , '小麦粉', '0.42', 1),
('Fraine de blé entier' , 'Whole wheat flour' , 'Weizenvollkornmehl' , 'Harina de trigo integral' , 'Farinha de trigo integral' , '全麦粉', '0.55', 1),
('Farine de sarasin' , 'Buckwheat flour' , 'Buchweizenmehl' , 'Harina de trigo sarraceno' , 'Farinha de trigo-sarraceno' , '荞麦粉', '0.72', 1),
('Farine de seigle' , 'Rye flour' , 'Roggenmehl' , 'Harina de centeno' , 'Farinha de centeio' , '黑麦粉', '0.38', 1),
('Farine de semoule' , 'Semolina flour' , 'Grießmehl' , 'Harina de sémola' , 'Farinha de sêmola' , '粗麦粉', '0.74', 1),
('Farine de maïs' , 'Cornflour' , 'Maismehl' , 'Harina de maíz' , 'Farinha de milho' , '玉米粉', '0.64', 1),
('Farine de riz' , 'Rice flour' , 'Reismehl' , 'Harina de arroz' , 'Farinha de arroz' , '米粉', '0.64', 1),
('Figue (séché)' , 'Fig (dried)' , 'Feige (getrocknet)' , 'Higo (seco)' , 'Figo (seco)' , '无花果（干）', '0.7', 1),
('Fraise' , 'Strawberry' , 'Erdbeere' , 'Fresa' , 'Morango' , '草莓', '0.64', 1),
('Gélatine' , 'Gelatine' , 'Gelatine' , 'Gelatina' , 'Gelatina' , '明胶', '0.93', 1),
('Gingembre (frais)' , 'Ginger (fresh)' , 'Ingwer (frisch)' , 'Jengibre (fresco)' , 'Gengibre (fesco)' , '姜（鲜）', '0.97', 1),
('Graine de moutarde' , 'Mustard seed' , 'Senfkörner' , 'Mostaza en grano' , 'Mostarda em grão' , '芥菜籽', '0.64', 1),
('Graine de pavot' , 'Poppy seed' , 'Mohnkörner' , 'Adormidera en grano' , 'Sementes de papoila' , '罂粟种子', '0.57', 1),
('Graine de sésame' , 'Sesame seed' , 'Sesamkörner' , 'Semillas de sésamo' , 'Sementes de sésamo' , '芝麻种子', '0.68', 1),
('Groseille' , 'Gooseberry' , 'Rote Johannisbeere' , 'Grosella' , 'Groselha' , '醋栗', '0.64', 1),
('Huile d arachides' , 'Peanut oil' , 'Erdnussöl' , 'Aceite de cacahuete' , 'Óleo de amendoim' , '花生油', '0.64', 1),
('Huile d olive' , 'Olive oil' , 'Olivenöl' , 'Aceite de oliva' , 'Azeite' , '橄榄油', '0.81', 1),
('Jaune d oeuf' , 'Egg yolk' , 'Eigelb' , 'Yema de huevo' , 'Gema de ovo' , '蛋黄', '1.14', 1),
('Lait' , 'Milk' , 'Milch' , 'Leche' , 'Leite' , '牛奶', '1.032', 1),
('Lait en poudre' , 'Powdered milk' , 'Milchpulver' , 'Leche en polvo' , 'Leite em pó' , '奶粉', '0.49', 1),
('Lard' , 'Lard' , 'Speck' , 'Tocino' , 'Banha' , '猪油', '0.76', 1),
('Lentille' , 'Lentil' , 'Linsen' , 'Lentejas' , 'Lentilhas' , '扁豆', '0.85', 1),
('Margarine' , 'Margarine' , 'Margarine' , 'Margarina' , 'Margarina' , '人造黄油', '0.93', 1),
('Mayonnaise' , 'Mayonnaise' , 'Mayonnaise' , 'Mayonesa' , 'Maionese' , '蛋黄酱', '0.93', 1),
('Miel' , 'Honey' , 'Honig' , 'Miel' , 'Mel' , '蜂蜜', '1.44', 1),
('Noix' , 'Nut' , 'Nüsse' , 'Nuez' , 'Noz' , '核桃', '0.49', 1),
('Noix de cajou' , 'Cashew nut' , 'Cashewnüsse' , 'Anacardo' , 'Castanha de caju' , '腰果', '0.47', 1),
('Noix de pécan' , 'Pecan nut' , 'Pekannüsse' , 'Nuez de pecán' , 'Noz de pecã' , '碧根果', '0.51', 1),
('Oeuf (battus)' , 'Egg (beaten)' , 'Eier (geschlagen)' , 'Huevo (batido)' , 'Ovos (batidos)' , '鸡蛋（打散）', '0.97', 1),
('Oignon (haché)' , 'Onion (finely chopped)' , 'Zwiebel (gehackt)' , 'Cebolla (picada)' , 'Cebola (picada)' , '洋葱（碎末）', '0.64', 1),
('Paprika' , 'Paprika' , 'Paprikapulver' , 'Pimentón' , 'Colorau' , '辣椒', '0.49', 1),
('Pépite de chocolat' , 'Chocolate chip' , 'Schokotropf' , 'Pepita de chocolate' , 'Pepitas de chocolate' , '巧克力片', '0.76', 1),
('Pois (non cuit)' , 'Pea (uncooked)' , 'Erbse (roh)' , 'Guisante (crudo)' , 'Ervilha (cru)' , '豌豆（生）', '0.64', 1),
('Pomme (séchée)' , 'Apple (dried)' , 'Apfel (getrocknet)' , 'Manzana (seca)' , 'Maçã  (seca)' , '苹果（干）', '0.38', 1),
('Pomme (tranche)' , 'Apple (sliced)' , 'Apfel (Scheiben)' , 'Manzana (rodaja)' , 'Maçã  (fatiada)' , '苹果（片）', '0.76', 1),
('Pomme de terre' , 'Potato' , 'Kartoffel' , 'Patata' , 'Batata' , '土豆', '0.87', 1),
('Raisin sec' , 'Raisin' , 'Rosinen' , 'Uva pasa' , 'Passas de uva' , '葡萄干', '0.64', 1),
('Riz (non cuit)' , 'Rice (uncooked)' , 'Reis (ungekocht)' , 'Arroz (crudo)' , 'Arroz (cru)' , '大米（生）', '0.89', 1),
('Sel' , 'Salt' , 'Salz' , 'Sal' , 'Sal' , '盐', '1.02', 1),
('Semoule de maïs' , 'Corn meal' , 'Maisgrieß' , 'Sémola de maíz' , 'Sêmola de milho' , '玉米面', '0.72', 1),
('Spaghetti (non cuit)' , 'Spaghetti (uncooked)' , 'Spaghetti (ungekocht)' , 'Espagueti (crudo)' , 'Esparguete (cru)' , '意大利面（生）', '0.51', 1),
('Sucre (brun)' , 'Sugar (brown)' , 'Zucker (brauner)' , 'Azúcar (moreno)' , 'Açúcar (amarelo)' , '红糖', '0.85', 1),
('Sucre (en poudre)' , 'Sugar (powdered)' , 'Zucker (Puder)' , 'Azúcar (en polvo)' , 'Açúcar (em pó)' , '糖（粉末）', '0.55', 1),
('Thé' , 'Tea' , 'Tee' , 'Té' , 'Chá' , '茶水', '0.32', 1),
('Thon (en boîte)' , 'Tuna (tinned)' , 'Thunfisch (in der Dose)' , 'Atún (en lata)' , 'Atum (lata)' , '金枪鱼（罐头）', '0.85', 1),
('Tomate (haché)' , 'Tomato (finely chopped)' , 'Tomate (gewürfelt)' , 'Tomate (picado)' , 'Tomate (picado)' , '西红柿（切碎）', '0.68', 1),
('Zeste d orange' , 'Orange zest' , 'Orangenschale' , 'Cáscara de naranja' , 'Casca de laranja' , '橙子皮', '0.38', 1),
('Zeste de citron' , 'Lemon zest' , 'Zitronenschale' , 'Cáscara de limón' , 'Casca de limão' , '柠檬皮', '0.64', 1);

INSERT INTO types(code, name_fr, name_en, name_de, name_es, name_pt, name_zh, type, rapport)
VALUES
('tsp', 'cuillère à café', 'teaspoon', 'kaffeelöffel', 'cucharilla ', 'colher de cafe', '茶匙', 'volume', 202.884136211058),
('Tbsp', 'cuillère à soupe', 'tablespoon', 'suppenlöffel', 'cucharada', 'colher de sopa', '汤匙', 'volume', 67.688045403686),
('cp', 'tasse', 'cup', 'tasse', 'taza', 'taça', '杯', 'volume', 4),
('Ml', 'millilitre', 'milliliter', 'milliliter', 'mililitro', 'mililitro', '毫升', 'volume', 1000),
('Cl', 'centilitre', 'centiliter', 'zentiliter', 'centilitro', 'centilitro', '厘升', 'volume', 100),
('Dl', 'décilitre', 'deciliter', 'deziliter', 'decilitro', 'decilitro', '分升', 'volume', 10),
('L', 'litre', 'liter', 'liter', 'litro', 'litro', '升', 'volume', 1),
('mg', 'milligramme', 'milligram', 'milligramm', 'miligramo', 'miligrama', '毫克', 'poids', 1000000),
('g', 'gramme', 'gram', 'gramm', 'gramo', 'grama', '克', 'poids', 1000),
('Kg', 'kilogramme', 'kilogram', 'kilogramm', 'kilogramo', 'quilograma', '公斤', 'poids', 1),
('fl oz UK', 'once liquide UK', 'fuild ounce UK', 'flüssigunzen UK', 'oz de líquido UK', 'onça fluida UK', '液体盎司 UK', 'volume', 35.222429643197),
('fl oz US', 'once liquide US', 'fuild ounce US', 'flüssigunzen US', 'oz de líquido US', 'onça fluida US', '液体盎司 US', 'volume', 33.814022701843),
('cp UK', 'tasse UK', 'cup UK', 'tasse UK', 'taza UK', 'taça UK', '杯 UK', 'volume', 3.531938659055),
('cp US', 'tasse US', 'cup US', 'tasse US', 'taza US', 'taça US', '杯 US', 'volume', 4.226752837730),
('pt UK', 'pinte UK', 'pint UK', 'pint UK', 'pinta UK', 'quartilho UK', '品脱 UK', 'volume', 1.733667122043),
('pt US', 'pinte US', 'pint US', 'pint US', 'pinta US', 'quartilho US', '品脱 US', 'volume', 2.113376418865),
('gal UK', 'gallon UK', 'gallon UK', 'gallone UK', 'galón UK', 'galão UK', '加仑 UK', 'volume', 0.220143093010),
('gal US', 'gallon US', 'gallon US', 'gallone US', 'galón US', 'galão US', '加仑 US', 'volume', 0.264172052358),
('oz', 'once', 'ounce', 'unze', 'onza', 'onça', '盎司', 'poids', 35.273368606702),
('lbs', 'livre', 'pound', 'pfund', 'libra', 'libra', '磅', 'poids', 2.204585537919);

INSERT INTO languages(code, label )
VALUES
('de', 'Deutsh'),
('en', 'English'),
('es', 'Español'),
('fr', 'Français'),
('pt', 'Português'),
('zh', '华人');

INSERT INTO settings(current_lang, current_lang_label, db_version)
VALUES
('en', 'English', '1');
