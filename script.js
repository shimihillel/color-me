
'use strict';

const STORAGE_KEY = 'color-me-v1';

const COLORS = {
  cherry:{name:'Cherry Red',he:'אדום דובדבן',hex:'#A6192E',family:'אדומים',weight:7},
  classicRed:{name:'Classic Red',he:'אדום קלאסי',hex:'#C41E3A',family:'אדומים',weight:7},
  chili:{name:'Chili Red',he:'אדום צ׳ילי',hex:'#B9222C',family:'אדומים',weight:6},
  cardinal:{name:'Cardinal Red',he:'אדום קרדינל',hex:'#C62935',family:'אדומים',weight:6},
  strawberry:{name:'Strawberry Red',he:'אדום תות',hex:'#D53C4D',family:'אדומים',weight:6},
  watermelon:{name:'Watermelon Red',he:'אדום אבטיח',hex:'#E14B5C',family:'אדומים',weight:5},
  tomato:{name:'Tomato Red',he:'אדום עגבנייה',hex:'#C73E2D',family:'אדומים',weight:5},
  scarlet:{name:'Scarlet',he:'אדום סקרלט',hex:'#D4313D',family:'אדומים',weight:6},
  vermilion:{name:'Vermilion',he:'אדום ורמיליון',hex:'#D04A2B',family:'אדומים',weight:5},
  hibiscus:{name:'Hibiscus',he:'אדום היביסקוס',hex:'#C72F4C',family:'אדומים',weight:5},
  brick:{name:'Brick Red',he:'אדום לבנים',hex:'#A8443B',family:'אדומים',weight:5},
  rubyRed:{name:'Ruby Red',he:'אדום רובי',hex:'#A51636',family:'אדומים',weight:6},
  mahoganyRed:{name:'Mahogany Red',he:'מהגוני אדמדם',hex:'#7E2D2E',family:'אדומים',weight:4},
  poppy:{name:'Poppy Red',he:'אדום פרג',hex:'#E34234',family:'אדומים',weight:5},
  bordeaux:{name:'Deep Bordeaux',he:'בורדו עמוק',hex:'#5C1A2E',family:'בורדו',weight:7},
  merlot:{name:'Merlot',he:'מרלו',hex:'#5C2233',family:'בורדו',weight:6},
  cabernet:{name:'Cabernet',he:'קברנה',hex:'#4A1628',family:'בורדו',weight:6},
  marsala:{name:'Marsala',he:'מרסלה',hex:'#87424D',family:'בורדו',weight:5},
  oxblood:{name:'Oxblood',he:'אוקסבלד',hex:'#4E1825',family:'בורדו',weight:6},
  sangria:{name:'Sangria',he:'סנגריה',hex:'#6E1F3A',family:'בורדו',weight:5},
  blackCherry:{name:'Black Cherry',he:'דובדבן שחור',hex:'#3F1827',family:'בורדו',weight:6},
  darkFig:{name:'Dark Fig',he:'תאנה כהה',hex:'#62304C',family:'בורדו',weight:5},
  wine:{name:'Wine',he:'יין',hex:'#6A2037',family:'בורדו',weight:6},
  plumWine:{name:'Plum Wine',he:'שזיף יין',hex:'#5D2C46',family:'בורדו',weight:5},
  berryWine:{name:'Berry Wine',he:'ברי כהה',hex:'#7F294A',family:'בורדו',weight:5},
  mulledWine:{name:'Mulled Wine',he:'יין מתובל',hex:'#703242',family:'בורדו',weight:4},
  cranberryWine:{name:'Cranberry Wine',he:'חמוציות יין',hex:'#8B2E46',family:'בורדו',weight:5},
  port:{name:'Port',he:'פורט',hex:'#512030',family:'בורדו',weight:4},
  babyPink:{name:'Baby Pink',he:'ורוד בייבי',hex:'#F5C9D8',family:'ורודים',weight:4},
  powderPink:{name:'Powder Pink',he:'ורוד פודרה',hex:'#EAC2CF',family:'ורודים',weight:4},
  rosePink:{name:'Rose Pink',he:'ורוד רוז',hex:'#D88FA7',family:'ורודים',weight:5},
  dustyRose:{name:'Dusty Rose',he:'ורוד מעושן',hex:'#C88A97',family:'ורודים',weight:5},
  blushPink:{name:'Blush Pink',he:'בלוש',hex:'#E6AAB9',family:'ורודים',weight:5},
  bubblegum:{name:'Bubblegum Pink',he:'ורוד מסטיק',hex:'#F36FB1',family:'ורודים',weight:5},
  barbie:{name:'Barbie Pink',he:'ברבי',hex:'#F267AC',family:'ורודים',weight:5},
  flamingoPink:{name:'Flamingo Pink',he:'פלמינגו',hex:'#F68BA9',family:'ורודים',weight:5},
  coralPink:{name:'Coral Pink',he:'קורל ורוד',hex:'#F7868B',family:'ורודים',weight:5},
  peonyPink:{name:'Peony Pink',he:'ורוד אדמונית',hex:'#DE7BA1',family:'ורודים',weight:5},
  fuchsia:{name:'Fuchsia',he:'פוקסיה',hex:'#D63384',family:'ורודים',weight:6},
  magentaPink:{name:'Magenta Pink',he:'מג׳נטה',hex:'#C62E74',family:'ורודים',weight:6},
  raspberryPink:{name:'Raspberry Pink',he:'ורוד פטל',hex:'#C93867',family:'ורודים',weight:6},
  hotPink:{name:'Hot Pink',he:'ורוד חם',hex:'#E54495',family:'ורודים',weight:6},
  coolPink:{name:'Cool Pink',he:'ורוד קר',hex:'#D47FA4',family:'ורודים',weight:5},
  neonPink:{name:'Neon Pink',he:'ורוד ניאון',hex:'#FF4FA3',family:'ורודים',weight:4},
  lavender:{name:'Lavender',he:'לבנדר',hex:'#B59AD7',family:'סגולים',weight:5},
  lilac:{name:'Lilac',he:'לילך',hex:'#C6B0E3',family:'סגולים',weight:5},
  orchid:{name:'Orchid',he:'אורכידאה',hex:'#A04FA3',family:'סגולים',weight:6},
  violet:{name:'Violet',he:'ויולט',hex:'#7F4FB1',family:'סגולים',weight:5},
  iris:{name:'Iris',he:'איריס',hex:'#7A5FB8',family:'סגולים',weight:5},
  periwinkle:{name:'Periwinkle',he:'פריוינקל',hex:'#8D92D7',family:'סגולים',weight:4},
  amethyst:{name:'Amethyst',he:'אמטיסט',hex:'#7B4BA3',family:'סגולים',weight:6},
  royalPurple:{name:'Royal Purple',he:'סגול מלכותי',hex:'#5E3A99',family:'סגולים',weight:6},
  grape:{name:'Grape',he:'ענבים',hex:'#68428C',family:'סגולים',weight:5},
  plum:{name:'Plum',he:'שזיף',hex:'#5B294A',family:'סגולים',weight:6},
  eggplant:{name:'Eggplant',he:'חציל',hex:'#43233D',family:'סגולים',weight:5},
  smokyPurple:{name:'Smoky Purple',he:'סגול מעושן',hex:'#73617D',family:'סגולים',weight:4},
  ultraViolet:{name:'Ultra Violet',he:'אולטרה ויולט',hex:'#6B42D6',family:'סגולים',weight:4},
  mulberryPurple:{name:'Mulberry Purple',he:'תות יער כהה',hex:'#6F456D',family:'סגולים',weight:4},
  peach:{name:'Peach',he:'אפרסק',hex:'#F4A978',family:'כתומים',weight:4},
  apricot:{name:'Apricot',he:'משמש',hex:'#F5A26C',family:'כתומים',weight:4},
  coral:{name:'Coral',he:'קורל',hex:'#F77B64',family:'כתומים',weight:5},
  mandarin:{name:'Mandarin',he:'מנדרינה',hex:'#F47C32',family:'כתומים',weight:5},
  tangerine:{name:'Tangerine',he:'תפוז',hex:'#F68A1E',family:'כתומים',weight:5},
  rust:{name:'Rust',he:'חלודה',hex:'#B65B3B',family:'כתומים',weight:5},
  terracotta:{name:'Terracotta',he:'טרקוטה',hex:'#B6614D',family:'כתומים',weight:5},
  pumpkin:{name:'Pumpkin',he:'דלעת',hex:'#D16D2E',family:'כתומים',weight:4},
  gingerOrange:{name:'Ginger Orange',he:'ג׳ינג׳ר',hex:'#C76D3D',family:'כתומים',weight:4},
  burntOrange:{name:'Burnt Orange',he:'כתום שרוף',hex:'#B8572A',family:'כתומים',weight:4},
  butter:{name:'Butter',he:'חמאה',hex:'#F6DF8E',family:'צהובים',weight:4},
  vanilla:{name:'Vanilla',he:'וניל',hex:'#F5E8B8',family:'צהובים',weight:4},
  lemon:{name:'Lemon',he:'לימון',hex:'#F4E55C',family:'צהובים',weight:4},
  banana:{name:'Banana',he:'בננה',hex:'#F2D84A',family:'צהובים',weight:4},
  sunflower:{name:'Sunflower',he:'חמנייה',hex:'#E7B928',family:'צהובים',weight:5},
  mustard:{name:'Mustard',he:'חרדל',hex:'#BC8C22',family:'צהובים',weight:5},
  saffron:{name:'Saffron',he:'זעפרן',hex:'#D8A62A',family:'צהובים',weight:5},
  amberYellow:{name:'Amber Yellow',he:'ענבר',hex:'#D39A1F',family:'צהובים',weight:4},
  neonYellow:{name:'Neon Yellow',he:'צהוב ניאון',hex:'#EAF249',family:'צהובים',weight:3},
  honeyYellow:{name:'Honey Yellow',he:'דבש',hex:'#D4A531',family:'צהובים',weight:4},
  sage:{name:'Sage',he:'מרווה',hex:'#98A88A',family:'ירוקים',weight:5},
  olive:{name:'Olive',he:'זית',hex:'#6B6A38',family:'ירוקים',weight:5},
  khaki:{name:'Khaki',he:'חאקי',hex:'#7A7B4A',family:'ירוקים',weight:5},
  pine:{name:'Pine',he:'אורן',hex:'#28513B',family:'ירוקים',weight:5},
  emerald:{name:'Emerald',he:'אמרלד',hex:'#057A55',family:'ירוקים',weight:6},
  bottleGreen:{name:'Bottle Green',he:'ירוק בקבוק',hex:'#234538',family:'ירוקים',weight:6},
  forestGreen:{name:'Forest Green',he:'ירוק יער',hex:'#2E5D41',family:'ירוקים',weight:6},
  mint:{name:'Mint',he:'מנטה',hex:'#8ED1C2',family:'ירוקים',weight:4},
  pistachio:{name:'Pistachio',he:'פיסטוק',hex:'#A8C98E',family:'ירוקים',weight:4},
  lime:{name:'Lime',he:'ליים',hex:'#A7D94A',family:'ירוקים',weight:4},
  avocado:{name:'Avocado',he:'אבוקדו',hex:'#6C8A3B',family:'ירוקים',weight:5},
  eucalyptus:{name:'Eucalyptus',he:'אקליפטוס',hex:'#7BA79A',family:'ירוקים',weight:4},
  jade:{name:'Jade',he:'ג׳ייד',hex:'#2D8A73',family:'ירוקים',weight:5},
  appleGreen:{name:'Apple Green',he:'ירוק תפוח',hex:'#7CCB52',family:'ירוקים',weight:4},
  navy:{name:'Navy',he:'נייבי',hex:'#1F4065',family:'כחולים',weight:6},
  royalBlue:{name:'Royal Blue',he:'כחול רויאל',hex:'#294FA3',family:'כחולים',weight:6},
  cobalt:{name:'Cobalt',he:'קובלט',hex:'#2A4A8A',family:'כחולים',weight:6},
  denim:{name:'Denim',he:'דנים',hex:'#5878A8',family:'כחולים',weight:5},
  indigo:{name:'Indigo',he:'אינדיגו',hex:'#3B4E8A',family:'כחולים',weight:5},
  skyBlue:{name:'Sky Blue',he:'תכלת',hex:'#8CB8E8',family:'כחולים',weight:4},
  babyBlue:{name:'Baby Blue',he:'כחול בייבי',hex:'#B9D6F4',family:'כחולים',weight:4},
  powderBlue:{name:'Powder Blue',he:'כחול אבקתי',hex:'#A8C5E7',family:'כחולים',weight:4},
  petrolBlue:{name:'Petrol Blue',he:'כחול פטרול',hex:'#295C72',family:'כחולים',weight:5},
  peacockBlue:{name:'Peacock Blue',he:'כחול טווס',hex:'#176A80',family:'כחולים',weight:5},
  oceanBlue:{name:'Ocean Blue',he:'אוקיינוס',hex:'#1D74A6',family:'כחולים',weight:5},
  sapphireBlue:{name:'Sapphire Blue',he:'ספיר',hex:'#214C9A',family:'כחולים',weight:5},
  midnightBlue:{name:'Midnight Blue',he:'כחול לילה',hex:'#121F3D',family:'כחולים',weight:6},
  electricBlue:{name:'Electric Blue',he:'כחול חשמלי',hex:'#2E6CF6',family:'כחולים',weight:3},
  turquoise:{name:'Turquoise',he:'טורקיז',hex:'#2CB6B2',family:'טורקיז',weight:5},
  tiffany:{name:'Tiffany',he:'טיפאני',hex:'#7FD0D2',family:'טורקיז',weight:4},
  lagoon:{name:'Lagoon',he:'לגונה',hex:'#35A6B8',family:'טורקיז',weight:5},
  aqua:{name:'Aqua',he:'אקווה',hex:'#65C9CF',family:'טורקיז',weight:4},
  caribbean:{name:'Caribbean',he:'קריבי',hex:'#2CB9C5',family:'טורקיז',weight:4},
  miamiBlue:{name:'Miami Blue',he:'מיאמי',hex:'#49C8D3',family:'טורקיז',weight:4},
  cyan:{name:'Cyan',he:'ציאן',hex:'#2AA7E0',family:'טורקיז',weight:4},
  deepTurquoise:{name:'Deep Turquoise',he:'טורקיז כהה',hex:'#1B8E98',family:'טורקיז',weight:5},
  espresso:{name:'Espresso',he:'אספרסו',hex:'#2E211E',family:'חומים',weight:5},
  coffeeBrown:{name:'Coffee Brown',he:'קפה',hex:'#5A3729',family:'חומים',weight:5},
  mocha:{name:'Mocha',he:'מוקה',hex:'#73503D',family:'חומים',weight:5},
  cocoa:{name:'Cocoa',he:'קקאו',hex:'#6A493A',family:'חומים',weight:5},
  chocolate:{name:'Chocolate',he:'שוקולד',hex:'#4D2418',family:'חומים',weight:6},
  caramelBrown:{name:'Caramel Brown',he:'קרמל',hex:'#B47B4F',family:'חומים',weight:4},
  latte:{name:'Latte',he:'לאטה',hex:'#B89274',family:'חומים',weight:4},
  cinnamon:{name:'Cinnamon',he:'קינמון',hex:'#A05A3C',family:'חומים',weight:5},
  chestnut:{name:'Chestnut',he:'ערמון',hex:'#7B4A36',family:'חומים',weight:5},
  taupeBrown:{name:'Taupe Brown',he:'טאופ',hex:'#9A7D6E',family:'חומים',weight:4},
  hazelnut:{name:'Hazelnut',he:'לוז',hex:'#8A6848',family:'חומים',weight:4},
  camel:{name:'Camel',he:'קאמל',hex:'#C3986B',family:'חומים',weight:4},
  clayBrown:{name:'Clay Brown',he:'חמרה',hex:'#A46042',family:'חומים',weight:4},
  walnut:{name:'Walnut',he:'אגוז',hex:'#654230',family:'חומים',weight:5},
  milkyNude:{name:'Milky Nude',he:'חלבי',hex:'#F2DDD7',family:'ניוד',weight:4},
  creamNude:{name:'Cream Nude',he:'שמנת',hex:'#EDE5D4',family:'ניוד',weight:4},
  beigeNude:{name:'Beige Nude',he:'בז׳',hex:'#D6C1AE',family:'ניוד',weight:4},
  pinkNude:{name:'Pink Nude',he:'ורוד ניוד',hex:'#EAC6C6',family:'ניוד',weight:4},
  peachNude:{name:'Peach Nude',he:'אפרסק ניוד',hex:'#E8C0AD',family:'ניוד',weight:4},
  warmNude:{name:'Warm Nude',he:'ניוד חם',hex:'#D2AE93',family:'ניוד',weight:4},
  coolNude:{name:'Cool Nude',he:'ניוד קר',hex:'#D8C5C2',family:'ניוד',weight:4},
  biscuitNude:{name:'Biscuit Nude',he:'ביסקוויט',hex:'#C9A98E',family:'ניוד',weight:4},
  greigeNude:{name:'Greige Nude',he:'גרייג׳',hex:'#B7ACA1',family:'ניוד',weight:4},
  sandNude:{name:'Sand Nude',he:'חול',hex:'#CEB79B',family:'ניוד',weight:4},
  cashmereNude:{name:'Cashmere Nude',he:'קשמיר',hex:'#D5B8AF',family:'ניוד',weight:4},
  stoneNude:{name:'Stone Nude',he:'אבן',hex:'#BFA898',family:'ניוד',weight:4},
  almondNude:{name:'Almond Nude',he:'שקד',hex:'#D8B8A2',family:'ניוד',weight:4},
  toffeeNude:{name:'Toffee Nude',he:'טופי',hex:'#BC8D69',family:'ניוד',weight:4},
  silverGray:{name:'Silver Gray',he:'כסף',hex:'#BCC3CC',family:'אפורים',weight:4},
  graphite:{name:'Graphite',he:'גרפיט',hex:'#3D4148',family:'אפורים',weight:5},
  concrete:{name:'Concrete',he:'בטון',hex:'#A2A6A1',family:'אפורים',weight:4},
  charcoalGray:{name:'Charcoal Gray',he:'פחם',hex:'#585C63',family:'אפורים',weight:5},
  warmGray:{name:'Warm Gray',he:'אפור חם',hex:'#A89E98',family:'אפורים',weight:4},
  coolGray:{name:'Cool Gray',he:'אפור קר',hex:'#B4BCC8',family:'אפורים',weight:4},
  steelGray:{name:'Steel Gray',he:'פלדה',hex:'#7A8592',family:'אפורים',weight:4},
  smokeGray:{name:'Smoke Gray',he:'עשן',hex:'#8C9098',family:'אפורים',weight:4},
  blueGray:{name:'Blue Gray',he:'אפור כחול',hex:'#7F8FA7',family:'אפורים',weight:4},
  mauveGray:{name:'Mauve Gray',he:'אפור סגלגל',hex:'#A18F9A',family:'אפורים',weight:4},
  glossyBlack:{name:'Glossy Black',he:'שחור קלאסי',hex:'#111114',family:'כהים',weight:6},
  onyx:{name:'Onyx',he:'אוניקס',hex:'#1B1B1F',family:'כהים',weight:6},
  inkBlack:{name:'Ink Black',he:'דיו',hex:'#171A27',family:'כהים',weight:5},
  blackPlum:{name:'Black Plum',he:'שחור סגול',hex:'#241B24',family:'כהים',weight:5},
  blackBlue:{name:'Black Blue',he:'שחור כחול',hex:'#172233',family:'כהים',weight:5},
  coal:{name:'Coal',he:'פחם כהה',hex:'#2A2B2E',family:'כהים',weight:5},
  obsidian:{name:'Obsidian',he:'אובסידיאן',hex:'#221C22',family:'כהים',weight:5},
  raven:{name:'Raven',he:'עורב',hex:'#26242B',family:'כהים',weight:5},
  pureWhite:{name:'Pure White',he:'שלג',hex:'#FAFAF7',family:'בהירים',weight:4},
  pearlWhite:{name:'Pearl White',he:'פנינה',hex:'#EEEAE3',family:'בהירים',weight:4},
  ivoryWhite:{name:'Ivory White',he:'שנהב',hex:'#F2EFE4',family:'בהירים',weight:4},
  chalkWhite:{name:'Chalk White',he:'גיר',hex:'#F5F5F1',family:'בהירים',weight:4},
  opalWhite:{name:'Opal White',he:'אופל',hex:'#F1EEF7',family:'בהירים',weight:4},
  snowWhite:{name:'Snow White',he:'חלבי לבן',hex:'#F8F8F5',family:'בהירים',weight:4},
  gold:{name:'Gold Rush',he:'זהב',hex:'#C8A030',family:'מטאלי',weight:6,finish:'metallic'},
  champagneMetal:{name:'Champagne Metal',he:'שמפניה',hex:'#D2B789',family:'מטאלי',weight:5,finish:'metallic'},
  roseGold:{name:'Rose Gold',he:'רוז גולד',hex:'#C4847A',family:'מטאלי',weight:6,finish:'metallic'},
  silver:{name:'Silver Moon',he:'כסף ירחי',hex:'#A8B0BC',family:'מטאלי',weight:6,finish:'metallic'},
  chromePink:{name:'Chrome Pink',he:'כרום ורוד',hex:'#D58AA8',family:'מטאלי',weight:5,finish:'metallic'},
  chromeBlue:{name:'Chrome Blue',he:'כרום כחול',hex:'#7A98CC',family:'מטאלי',weight:5,finish:'metallic'},
  copper:{name:'Copper Dusk',he:'נחושת',hex:'#A05A32',family:'מטאלי',weight:5,finish:'metallic'},
  bronze:{name:'Bronze Glow',he:'ברונזה',hex:'#8C613C',family:'מטאלי',weight:5,finish:'metallic'},
  metallicEmerald:{name:'Metallic Emerald',he:'אמרלד מטאלי',hex:'#1B8C6F',family:'מטאלי',weight:4,finish:'metallic'},
  metallicBordeaux:{name:'Metallic Bordeaux',he:'בורדו מטאלי',hex:'#7B2747',family:'מטאלי',weight:4,finish:'metallic'},
  rubyGlitter:{name:'Ruby Glitter',he:'רובי גליטר',hex:'#8B1A2E',family:'גליטר',weight:5,finish:'glitter'},
  roseGlitter:{name:'Rose Glitter',he:'ורוד גליטר',hex:'#D4909A',family:'גליטר',weight:5,finish:'glitter'},
  goldGlitter:{name:'Gold Dust',he:'אבק זהב',hex:'#D4A853',family:'גליטר',weight:5,finish:'glitter'},
  silverGlitter:{name:'Silver Glitter',he:'כסף גליטר',hex:'#AEB7C7',family:'גליטר',weight:5,finish:'glitter'},
  midnightSparkle:{name:'Midnight Sparkle',he:'נצנוץ לילה',hex:'#1C1C3A',family:'גליטר',weight:5,finish:'glitter'},
  holoGlitter:{name:'Holographic',he:'הולוגרפי',hex:'#C9D0E8',family:'גליטר',weight:5,finish:'glitter'},
  rainbowSpark:{name:'Rainbow Spark',he:'קשת נצנצים',hex:'#E1C6F0',family:'גליטר',weight:5,finish:'glitter'},
  blueGlitter:{name:'Blue Glitter',he:'כחול גליטר',hex:'#3B5CCF',family:'גליטר',weight:4,finish:'glitter'},
  blackGlitter:{name:'Black Glitter',he:'שחור גליטר',hex:'#2C2830',family:'גליטר',weight:4,finish:'glitter'},
  emeraldGlitter:{name:'Emerald Glitter',he:'אמרלד גליטר',hex:'#1A7C68',family:'גליטר',weight:4,finish:'glitter'},
  catEyePlum:{name:'Cat Eye Plum',he:'מגנטי שזיף',hex:'#5C2A4A',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeTeal:{name:'Cat Eye Teal',he:'מגנטי טיל',hex:'#3A5A5C',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeForest:{name:'Cat Eye Forest',he:'מגנטי ירוק',hex:'#2A4A3A',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeRose:{name:'Cat Eye Rose',he:'מגנטי ורוד',hex:'#9B5C7A',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeBlue:{name:'Cat Eye Blue',he:'מגנטי כחול',hex:'#355D87',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeBordeaux:{name:'Cat Eye Bordeaux',he:'מגנטי בורדו',hex:'#6D2941',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeCopper:{name:'Cat Eye Copper',he:'מגנטי נחושת',hex:'#7B4A31',family:'מגנטי',weight:4,finish:'magnetic'},
  catEyeGoldOlive:{name:'Cat Eye Gold Olive',he:'מגנטי זהב זית',hex:'#76743B',family:'מגנטי',weight:4,finish:'magnetic'},
  jellyMilk:{name:'Milk Jelly',he:'חלב ג׳לי',hex:'#F7DDE4',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyPink:{name:'Pink Jelly',he:'ורוד ג׳לי',hex:'#F0AFC4',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyRose:{name:'Rose Jelly',he:'רוז ג׳לי',hex:'#D98BA0',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyCherry:{name:'Cherry Jelly',he:'דובדבן ג׳לי',hex:'#A9324C',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyBerry:{name:'Berry Jelly',he:'פירות יער ג׳לי',hex:'#8F3B62',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyLavender:{name:'Lavender Jelly',he:'לבנדר ג׳לי',hex:'#BFA7D8',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyPeach:{name:'Peach Jelly',he:'אפרסק ג׳לי',hex:'#F0B89A',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyNude:{name:'Nude Jelly',he:'ניוד ג׳לי',hex:'#E8BFAE',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyApricot:{name:'Apricot Jelly',he:'משמש ג׳לי',hex:'#F3B37A',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyCoral:{name:'Coral Jelly',he:'קורל ג׳לי',hex:'#EA8A7E',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyBlue:{name:'Blue Jelly',he:'כחול ג׳לי',hex:'#88A9E0',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyMint:{name:'Mint Jelly',he:'מנטה ג׳לי',hex:'#A9D9CF',family:'ג׳לי',weight:4,finish:'jelly'},
  cranberryRed:{name:'Cranberry Red',he:'אדום חמוציות',hex:'#B51F3B',family:'אדומים',weight:5},
  rosewoodRed:{name:'Rosewood Red',he:'אדום רוזווד',hex:'#9E3945',family:'אדומים',weight:4},
  garnetWine:{name:'Garnet Wine',he:'גרנט יין',hex:'#6C1F38',family:'בורדו',weight:5},
  berryMerlot:{name:'Berry Merlot',he:'ברי מרלו',hex:'#7C3048',family:'בורדו',weight:4},
  balletPink:{name:'Ballet Pink',he:'ורוד בלט',hex:'#EFCAD5',family:'ורודים',weight:4},
  candyPink:{name:'Candy Pink',he:'ורוד קנדי',hex:'#F46AAC',family:'ורודים',weight:4},
  shellPink:{name:'Shell Pink',he:'ורוד צדף',hex:'#E7BBC7',family:'ורודים',weight:4},
  mallowPink:{name:'Mallow Pink',he:'ורוד חלמית',hex:'#DB88B4',family:'ורודים',weight:4},
  heatherPurple:{name:'Heather Purple',he:'סגול הת׳ר',hex:'#8E76A6',family:'סגולים',weight:4},
  inkViolet:{name:'Ink Violet',he:'ויולט דיו',hex:'#4A356F',family:'סגולים',weight:4},
  violetSmoke:{name:'Violet Smoke',he:'עשן ויולט',hex:'#7E6C90',family:'סגולים',weight:4},
  jamPurple:{name:'Jam Purple',he:'סגול ריבה',hex:'#6F3265',family:'סגולים',weight:4},
  papayaOrange:{name:'Papaya Orange',he:'כתום פפאיה',hex:'#F08A4B',family:'כתומים',weight:4},
  melonOrange:{name:'Melon Orange',he:'כתום מלון',hex:'#F4A062',family:'כתומים',weight:4},
  cornsilkYellow:{name:'Cornsilk Yellow',he:'צהוב משי תירס',hex:'#F5E6A1',family:'צהובים',weight:4},
  marigoldYellow:{name:'Marigold Yellow',he:'צהוב ציפורני חתול',hex:'#E5AA28',family:'צהובים',weight:4},
  seafoamGreen:{name:'Seafoam Green',he:'ירוק סי-פום',hex:'#9FD5C3',family:'ירוקים',weight:4},
  mossGreen:{name:'Moss Green',he:'ירוק מוס',hex:'#66754A',family:'ירוקים',weight:4},
  fernGreen:{name:'Fern Green',he:'ירוק שרך',hex:'#4F7B50',family:'ירוקים',weight:4},
  matchaGreen:{name:'Matcha Green',he:'ירוק מאצ׳ה',hex:'#87A85C',family:'ירוקים',weight:4},
  cornflowerBlue:{name:'Cornflower Blue',he:'כחול קורנפלור',hex:'#7294D4',family:'כחולים',weight:4},
  steelBlue:{name:'Steel Blue',he:'כחול פלדה',hex:'#5E7E9E',family:'כחולים',weight:4},
  iceBlue:{name:'Ice Blue',he:'כחול קרח',hex:'#C7DBF1',family:'כחולים',weight:4},
  stormBlue:{name:'Storm Blue',he:'כחול סערה',hex:'#435A7A',family:'כחולים',weight:4},
  poolTurquoise:{name:'Pool Turquoise',he:'טורקיז בריכה',hex:'#58C7C9',family:'טורקיז',weight:4},
  glassTurquoise:{name:'Glass Turquoise',he:'טורקיז זכוכית',hex:'#8DDBDF',family:'טורקיז',weight:4},
  reefTurquoise:{name:'Reef Turquoise',he:'טורקיז ריף',hex:'#28AAB0',family:'טורקיז',weight:4},
  opalAqua:{name:'Opal Aqua',he:'אופל אקווה',hex:'#9ED9D6',family:'טורקיז',weight:4},
  truffleBrown:{name:'Truffle Brown',he:'חום טראפל',hex:'#5A4036',family:'חומים',weight:4},
  mapleBrown:{name:'Maple Brown',he:'חום מייפל',hex:'#A56A45',family:'חומים',weight:4},
  linenNude:{name:'Linen Nude',he:'ניוד פשתן',hex:'#DCCABD',family:'ניוד',weight:4},
  petalNude:{name:'Petal Nude',he:'ניוד עלי כותרת',hex:'#E5C4C3',family:'ניוד',weight:4},
  latteNude:{name:'Latte Nude',he:'ניוד לאטה',hex:'#C9A88F',family:'ניוד',weight:4},
  macaronNude:{name:'Macaron Nude',he:'ניוד מקרון',hex:'#E8D5CE',family:'ניוד',weight:4},
  fogGray:{name:'Fog Gray',he:'אפור ערפל',hex:'#C6C9CD',family:'אפורים',weight:4},
  stoneGray:{name:'Stone Gray',he:'אפור אבן',hex:'#9A9793',family:'אפורים',weight:4},
  creamWhite:{name:'Cream White',he:'לבן קרם',hex:'#F7F2EA',family:'בהירים',weight:4},
  blushWhite:{name:'Blush White',he:'לבן סומק',hex:'#F4ECEF',family:'בהירים',weight:4},
  midnightPlum:{name:'Midnight Plum',he:'שזיף חצות',hex:'#261D2D',family:'כהים',weight:4},
  petrolBlack:{name:'Petrol Black',he:'שחור פטרול',hex:'#1F2A31',family:'כהים',weight:4},
  metallicLilac:{name:'Metallic Lilac',he:'לילך מטאלי',hex:'#B09AC8',family:'מטאלי',weight:4,finish:'metallic'},
  metallicTeal:{name:'Metallic Teal',he:'טיל מטאלי',hex:'#2E7E82',family:'מטאלי',weight:4,finish:'metallic'},
  pinkGlitter:{name:'Pink Glitter',he:'ורוד גליטר',hex:'#E48EB6',family:'גליטר',weight:4,finish:'glitter'},
  champagneGlitter:{name:'Champagne Glitter',he:'שמפניה גליטר',hex:'#D5C2A0',family:'גליטר',weight:4,finish:'glitter'},
  catEyeSapphire:{name:'Cat Eye Sapphire',he:'מגנטי ספיר',hex:'#2D457C',family:'מגנטי',weight:4,finish:'magnetic'},
  catEyeMauve:{name:'Cat Eye Mauve',he:'מגנטי מאוב',hex:'#8E627C',family:'מגנטי',weight:4,finish:'magnetic'},
  jellyPlum:{name:'Plum Jelly',he:'שזיף ג׳לי',hex:'#7A3E68',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyLemon:{name:'Lemon Jelly',he:'לימון ג׳לי',hex:'#EFE48E',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyAqua:{name:'Aqua Jelly',he:'אקווה ג׳לי',hex:'#95D4D9',family:'ג׳לי',weight:4,finish:'jelly'},
  jellySmoke:{name:'Smoke Jelly',he:'עשן ג׳לי',hex:'#C8BCC6',family:'ג׳לי',weight:4,finish:'jelly'}
};

const FAMILY_ORDER = ['אדומים','בורדו','ורודים','סגולים','כתומים','צהובים','ירוקים','כחולים','טורקיז','חומים','ניוד','אפורים','כהים','בהירים','ג׳לי','מטאלי','גליטר','מגנטי'];

const TWIST_TYPES = ['accent','twoTone','topper','metallic','multi3','multi4','multi5'];

const MOODS = [
  {id:'drama', label:'בא לי דרמה', families:['כהים','בורדו','אדומים','מגנטי','מטאלי'], courage:'שימי'},
  {id:'clean', label:'נקי אבל לא ניוד', families:['ג׳לי','בהירים','ורודים','אפורים','ניוד'], courage:'רגוע'},
  {id:'color', label:'בא לי צבע', families:['כחולים','טורקיז','ירוקים','סגולים','כתומים','צהובים'], courage:'שימי'},
  {id:'dark', label:'כהה', families:['כהים','בורדו','כחולים','ירוקים','סגולים'], courage:'שימי'},
  {id:'weird', label:'משהו מוזר וטוב', families:['מטאלי','מגנטי','גליטר','טורקיז','ירוקים','צהובים'], courage:'מוגזם בקטע טוב'},
  {id:'surprise', label:'לא לחשוב', families:null, courage:'שימי'}
];
function currentMood(){
  return MOODS.find(m=>m.id==='surprise');
}
function colorInMood(color,mood=currentMood()){
  if(!mood || !mood.families) return true;
  return mood.families.includes(color.family);
}
function moodLabel(id){
  return (MOODS.find(m=>m.id===id)||MOODS.find(m=>m.id==='surprise')).label;
}
function courageFor(combo){
  if(combo.type === 'solid' && combo.colors.length === 1){
    const k = polishKind(combo.colors[0]);
    if(k === 'רגיל' || k === 'ג׳לי') return currentMood().courage || 'רגוע';
  }
  if(combo.colors.some(c=>['מגנטי','מטאלי','גליטר'].includes(polishKind(c)))) return 'מוגזם בקטע טוב';
  return currentMood().courage || 'שימי';
}
function finishSummary(combo){
  const types=[...new Set((combo.colors||[]).map(c=>polishKind(c)))];
  return types.join(' + ');
}
function setLookTitle(combo){
  const base = combo.colors[0];
  const second = combo.colors[1];
  const kind = finishSummary(combo);
  const titles = {
    drama:[`דרמה ב${base.he}`, `${base.he} של אישה שיודעת`, `לא לדבר איתי, אני מבריקה`, `מנהלת את האירוע`],
    clean:[`${base.he} נקי אבל לא משעמם`, `שקט עם קטע`, `ידיים מסודרות, נשמה צבעונית`, `מינימלי בלי להיות עציץ`],
    color:[`${base.he} עם קריצה`, `צבע שעושה מצב רוח`, `לא בסיסי וטוב שכך`, `הלק בא לעבוד היום`],
    dark:[`כהה עם אופי`, `${base.he} בלילה טוב`, `דרמטי אבל לביש`, `גותית במידה מסחרית`],
    weird:[`מוזר וטוב`, `הבחירה הלא צפויה`, `מה זה? יפה. זה מה שזה`, `לא ברור למה זה עובד, אבל זה עובד`],
    surprise:[`${base.he} וזהו, החלטנו`, `הסט הבא שלך`, `מריחה עם אופי`, `לא לשאול שאלות`]
  };
  const arr=titles.surprise;
  return combo.type==='solid' ? pick(arr) : `${base.he}${second?` + ${second.he}`:''} · ${kind}`;
}
function setWhy(combo){
  if(combo.type==='solid') return `סט ידיים אחיד ב${displayName(combo.colors[0])}. נקי מספיק ליום־יום, אבל עם גימור שנותן לו אופי.`;
  if(combo.type==='accent') return `הבסיס מחזיק את כל היד, והקמיצה נותנת טוויסט קטן בלי להפוך את זה לקרקס.`;
  if(combo.type==='twoTone') return `שני גוונים שמדברים באותה שפה, אבל לא נראים כאילו התייאשת באמצע.`;
  if(combo.type==='topper') return `רוב היד נשארת לבישה, והנצנוץ נותן רגע קטן של וואו.`;
  if(combo.type==='multi3') return `שלושה גוונים מתואמים שנותנים עניין בלי להרגיש אקראיים.`;
  if(combo.type==='multi4') return `ארבעה גוונים עם קצב ברור — צבעוני, אבל עדיין נראה מתוכנן.`;
  if(combo.type==='multi5') return `כל אצבע מקבלת צבע משלה, מתוך פלטה אחת שמחזיקה את כל הסט יחד.`;
  return `סט ידיים עם גימור מיוחד — מספיק דרמטי כדי להרגיש חדש, בלי רגליים ובלי בלגן.`;
}


let state = loadState();

const $ = (id) => document.getElementById(id);

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      current: saved.current || null,
      saved: saved.saved || [],
      recentShown: saved.recentShown || [],
      selectedFamily: saved.selectedFamily || 'בורדו',
      selectedColorId: saved.selectedColorId || 'bordeaux',
      screen: saved.screen || 'homeScreen',
      selectedMood: 'surprise',
      disliked: saved.disliked || [],
      favoritesFilterFamily: saved.favoritesFilterFamily || 'all',
      favoritesFilterKind: saved.favoritesFilterKind || 'all',
      favoritesFilterSet: saved.favoritesFilterSet || 'all',
      favoritesSort: saved.favoritesSort || 'newest'
    };
  } catch {
    return { current:null, saved:[], recentShown:[], disliked:[], selectedFamily:'בורדו', selectedColorId:'bordeaux', selectedMood:'surprise', screen:'homeScreen', favoritesFilterFamily:'all', favoritesFilterKind:'all', favoritesFilterSet:'all', favoritesSort:'newest' };
  }
}

function persist(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function comboHistoryItem(combo){
  return {
    type: combo.type,
    colorIds: combo.colors.map(c => c.id),
    families: combo.colors.map(c => c.family),
    polishKinds: combo.colors.map(c => polishKind(c)),
    primary: combo.nails?.[0]?.id || combo.colors?.[0]?.id || '',
    pattern: (combo.nails || []).map(c => `${c.id}:${polishKind(c)}`).join('|')
  };
}

function rememberShown(combo){
  state.recentShown = state.recentShown || [];
  state.recentShown.unshift(comboHistoryItem(combo));
  state.recentShown = state.recentShown.slice(0, 12);
}

function rememberDisliked(combo){
  if(!combo) return;
  state.disliked = state.disliked || [];
  state.disliked.unshift({
    ...comboHistoryItem(combo),
    mood: state.selectedMood || 'surprise',
    at: new Date().toISOString()
  });
  state.disliked = state.disliked.slice(0, 24);
}

function dislikedPenaltyFor(combo){
  const disliked = (state.disliked || []).slice(0, 16);
  if(!disliked.length) return 0;
  const item = comboHistoryItem(combo);
  let penalty = 0;
  disliked.forEach((bad, index) => {
    const freshness = Math.max(1, 16 - index) / 16;
    if(bad.pattern === item.pattern) penalty += 70 * freshness;
    if(bad.primary === item.primary) penalty += 32 * freshness;
    penalty += overlapsCount(bad.colorIds || [], item.colorIds || []) * 18 * freshness;
    penalty += overlapsCount(bad.families || [], item.families || []) * 9 * freshness;
    penalty += overlapsCount(bad.polishKinds || [], item.polishKinds || []) * 5 * freshness;
    if(bad.type === item.type) penalty += 6 * freshness;
    if(bad.mood && bad.mood === (state.selectedMood || 'surprise')) penalty += 6 * freshness;
  });
  return penalty;
}

function overlapsCount(a,b){
  const set = new Set(a || []);
  return (b || []).filter(x => set.has(x)).length;
}

function violatesThreeClickRule(combo){
  const recent = (state.recentShown || []).slice(0, 3);
  if(!recent.length) return false;
  const item = comboHistoryItem(combo);
  return recent.some(prev => {
    if(prev.pattern === item.pattern) return true;
    if(prev.primary === item.primary) return true;
    if(prev.type === item.type && overlapsCount(prev.colorIds, item.colorIds) >= 1) return true;
    if(overlapsCount(prev.colorIds, item.colorIds) >= 2) return true;
    if(overlapsCount(prev.families, item.families) >= 2) return true;
    if(prev.type === item.type && overlapsCount(prev.polishKinds || [], item.polishKinds || []) >= 1) return true;
    return false;
  });
}

function softlyRepeats(combo){
  const recent = (state.recentShown || []).slice(0, 3);
  if(!recent.length) return false;
  const item = comboHistoryItem(combo);
  return recent.some(prev => prev.primary === item.primary || overlapsCount(prev.colorIds, item.colorIds) >= 1);
}

function init(){
  if(!state.current){
    state.current = generateBestCombo();
    rememberShown(state.current);
    persist();
  } else if(!(state.recentShown || []).length){
    rememberShown(state.current);
    persist();
  }
  bindEvents();
  renderAll();
  showScreen(state.screen || 'homeScreen');
  showSplash();
}

function bindEvents(){
  $('nextBtn').addEventListener('click', nextCombo);
  $('saveBtn').addEventListener('click', saveCurrent);
  $('goColorBtn').addEventListener('click', chooseSelectedColor);
  $('lookbookSearch')?.addEventListener?.('input', renderFavorites);
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
  });
  $('closeDialogBtn').addEventListener('click', () => $('detailDialog').close());
  $('infoBtn').addEventListener('click', () => $('infoDialog').showModal());
  $('closeInfoBtn').addEventListener('click', () => $('infoDialog').close());
  $('closeInfoCta').addEventListener('click', () => $('infoDialog').close());

  ['favoritesColorFilter','favoritesKindFilter','favoritesSetFilter','favoritesSort'].forEach(id => {
    $(id)?.addEventListener('change', handleFavoritesControls);
  });
}

function renderAll(){
  renderHome();
  renderFavorites();
  renderStats();
  renderColors();
}

function showScreen(screenId){
  state.screen = screenId;
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === screenId));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
  persist();
}

function nextCombo(){
  const stage = $('handStage');
  stage.classList.add('rolling');

  let flashes = 0;
  const timer = setInterval(() => {
    const temp = generateCombo();
    paintHand(temp);
    flashes++;
    if(flashes >= 6){
      clearInterval(timer);
      state.current = generateBestCombo();
      rememberShown(state.current);
      persist();
      renderHome();
      stage.classList.remove('rolling');
      toast('הבא בתור ✨');
    }
  }, 120);
}


function chooseSelectedColor(){
  const anchor = COLORS[state.selectedColorId] || COLORS.bordeaux;
  state.current = generateBestCombo(anchor);
  rememberShown(state.current);
  persist();
  renderHome();
  showScreen('homeScreen');
  toast('הלכנו על זה 💅');
}

function saveCurrent(){
  if(!state.current) return;
  const item = {...state.current, savedAt:new Date().toISOString()};
  state.saved.unshift(item);
  state.saved = state.saved.slice(0, 300);
  persist();
  renderAll();
  toast('נשמרה המריחה 💅');
}



function renderHome(){
  const combo = state.current;
  $('comboName').textContent = combo.name;
  $('comboStyle').textContent = combo.styleLabel;
  if($('comboWhy')) $('comboWhy').textContent = combo.why || setWhy(combo);
  if($('comboCourage')) $('comboCourage').textContent = `דרגת אומץ: ${combo.courage || courageFor(combo)}`;
  if($('comboFinish')) $('comboFinish').textContent = `גימור: ${combo.finishSummary || finishSummary(combo)}`;
  renderSwatches($('swatchesRow'), combo.colors);
  renderInstructions($('instructionsList'), combo.instructions);
  paintHand(combo);
  renderLastStatus();
}

function renderLastStatus(){
  if(!state.saved.length){
    $('lastStatusTitle').textContent = 'עדיין אין מריחה שמורה';
    $('lastStatusText').textContent = 'כשתלחצי אהבתי, נתחיל לספור ימים.';
    return;
  }
  const last = state.saved[0];
  const days = daysBetween(new Date(last.savedAt), new Date());
  let text = 'עדיין טרי ✨';
  if(days >= 28) text = 'שימי, די, להחליף 😄';
  else if(days >= 21) text = 'זמן להחליף';
  else if(days >= 15) text = 'מתחיל להתקרב';
  $('lastStatusTitle').textContent = `עברו ${days} ימים מהמריחה האחרונה`;
  $('lastStatusText').textContent = text;
}

function paintHand(combo){
  const shapes = ['n1','n2','n3','n4','n5'].map(id => document.getElementById(id));
  const shapeColors = combo.nails || [combo.colors[0], combo.colors[0], combo.colors[0], combo.colors[0], combo.colors[0]];
  shapes.forEach((shape, index) => {
    if(!shape) return;
    const color = shapeColors[index] || combo.colors[0];
    const hex = color.hex || '#b31545';

    shape.classList.remove('finish-glitter','finish-jelly','finish-metallic','finish-magnetic');
    const finish = color.finish || '';
    if(finish) shape.classList.add(`finish-${finish}`);

    // v14: keep the nail color as a clear base color. Effects are CSS pseudo-layers only.
    shape.style.setProperty('--nail-color', hex);
    shape.style.setProperty('--nail-light', lighten(hex, 34));
    shape.style.setProperty('--nail-dark', darken(hex, 14));
    shape.style.backgroundColor = hex;
    shape.style.backgroundImage = 'none';
  });
}

function renderSwatches(container, colors){
  container.innerHTML = colors.map(c => `
    <div class="swatch-item">
      <span class="swatch-dot" style="background:${swatchBackground(c)}"></span>
      <strong>${c.he}</strong>
    </div>
  `).join('');
}

function renderInstructions(container, instructions){
  container.innerHTML = instructions.map(row => `
    <div class="instruction-row">
      <small>${row.area}</small>
      <strong>${row.text}</strong>
    </div>
  `).join('');
}



function showSplash(){
  const splash = $('splashScreen');
  if(!splash) return;
  requestAnimationFrame(() => splash.classList.add('show'));
  setTimeout(() => splash.classList.add('hide'), 1150);
  setTimeout(() => splash.remove(), 1750);
}

function handleFavoritesControls(){
  state.favoritesFilterFamily = $('favoritesColorFilter')?.value || 'all';
  state.favoritesFilterKind = $('favoritesKindFilter')?.value || 'all';
  state.favoritesFilterSet = $('favoritesSetFilter')?.value || 'all';
  state.favoritesSort = $('favoritesSort')?.value || 'newest';
  persist();
  renderFavorites();
}

function favoriteSetLabel(item){
  return item.type === 'solid' ? 'אחיד' : 'שילוב';
}

function favoriteKinds(item){
  return [...new Set((item.colors || []).map(c => polishKind(c)))];
}

function renderFavoritesControls(){
  const colorEl = $('favoritesColorFilter');
  const kindEl = $('favoritesKindFilter');
  const setEl = $('favoritesSetFilter');
  const sortEl = $('favoritesSort');
  if(!colorEl || !kindEl || !setEl || !sortEl) return;

  const familiesInSaved = [...new Set(state.saved.flatMap(item => (item.colors || []).map(c => c.family)))];
  const familyOptions = FAMILY_ORDER.filter(fam => familiesInSaved.includes(fam));
  colorEl.innerHTML = [`<option value="all">כל הצבעים</option>`, ...familyOptions.map(fam => `<option value="${fam}">${fam}</option>`)].join('');
  colorEl.value = familyOptions.includes(state.favoritesFilterFamily) || state.favoritesFilterFamily === 'all' ? state.favoritesFilterFamily : 'all';
  state.favoritesFilterFamily = colorEl.value;

  const KIND_ORDER = ['רגיל','ג׳לי','גליטר','מטאלי','מגנטי'];
  const kindsInSaved = [...new Set(state.saved.flatMap(item => favoriteKinds(item)))];
  const kindOptions = KIND_ORDER.filter(kind => kindsInSaved.includes(kind));
  kindEl.innerHTML = [`<option value="all">כל הסוגים</option>`, ...kindOptions.map(kind => `<option value="${kind}">${kind}</option>`)].join('');
  kindEl.value = kindOptions.includes(state.favoritesFilterKind) || state.favoritesFilterKind === 'all' ? state.favoritesFilterKind : 'all';
  state.favoritesFilterKind = kindEl.value;

  setEl.value = ['all','solid','twist'].includes(state.favoritesFilterSet) ? state.favoritesFilterSet : 'all';
  state.favoritesFilterSet = setEl.value;

  sortEl.value = ['newest','oldest','name','family','kind'].includes(state.favoritesSort) ? state.favoritesSort : 'newest';
  state.favoritesSort = sortEl.value;
}

function filteredFavorites(){
  let items = [...state.saved];

  if(state.favoritesFilterFamily !== 'all'){
    items = items.filter(item => (item.colors || []).some(c => c.family === state.favoritesFilterFamily));
  }
  if(state.favoritesFilterKind !== 'all'){
    items = items.filter(item => favoriteKinds(item).includes(state.favoritesFilterKind));
  }
  if(state.favoritesFilterSet === 'solid'){
    items = items.filter(item => item.type === 'solid');
  }
  if(state.favoritesFilterSet === 'twist'){
    items = items.filter(item => item.type !== 'solid');
  }

  const familyRank = fam => {
    const idx = FAMILY_ORDER.indexOf(fam);
    return idx === -1 ? 999 : idx;
  };
  const kindRank = kind => ({'רגיל':0,'ג׳לי':1,'גליטר':2,'מטאלי':3,'מגנטי':4}[kind] ?? 99);

  items.sort((a,b) => {
    if(state.favoritesSort === 'oldest') return new Date(a.savedAt) - new Date(b.savedAt);
    if(state.favoritesSort === 'name') return (a.name || '').localeCompare((b.name || ''), 'he');
    if(state.favoritesSort === 'family') return familyRank(a.colors?.[0]?.family) - familyRank(b.colors?.[0]?.family);
    if(state.favoritesSort === 'kind') return kindRank(favoriteKinds(a)[0]) - kindRank(favoriteKinds(b)[0]);
    return new Date(b.savedAt) - new Date(a.savedAt);
  });

  return items;
}

function lookbookPreviewMarkup(item){
  const nails = item.nails || [item.colors?.[0], item.colors?.[0], item.colors?.[0], item.colors?.[0], item.colors?.[0]];
  return `
    <div class="lookbook-visual-shell">
      <div class="lookbook-mini-stage">
        ${nails.slice(0,5).map((c, index) => `
          <span class="lookbook-mini-shape mini-${index+1} ${c?.finish ? `finish-${c.finish}` : ''}" style="--mini-bg:${c?.hex || '#b31545'}; --mini-light:${lighten(c?.hex || '#b31545', 34)}; --mini-dark:${darken(c?.hex || '#b31545', 14)}"></span>
        `).join('')}
      </div>
      <div class="lookbook-mini-swatches">
        ${item.colors.slice(0,4).map(c => `<span class="lookbook-mini-dot" title="${c.he}" style="background:${swatchBackground(c)}"></span>`).join('')}
      </div>
    </div>
  `;
}



function renderFavorites(){
  renderFavoritesControls();
  const items = filteredFavorites();
  $('favoritesCount').textContent = items.length;
  if(!state.saved.length){
    $('favoritesList').innerHTML = `<div class="card empty-state"><strong>אין עדיין מריחות שמורות</strong><br>כשתלחצי אהבתי, הן יופיעו כאן.</div>`;
    return;
  }
  if(!items.length){
    $('favoritesList').innerHTML = `<div class="card empty-state"><strong>לא נמצאו מריחות</strong><br>נסי לשחרר אחד הסינונים או לבחור מיון אחר.</div>`;
    return;
  }
  $('favoritesList').innerHTML = items.map(item => `
    <article class="lookbook-card">
      <button class="lookbook-card-main" data-open="${item.signature}" type="button">
        ${lookbookPreviewMarkup(item)}
        <div class="lookbook-card-copy">
          <p class="lookbook-card-date">${formatDate(item.savedAt)}</p>
          <h3 class="lookbook-card-title">${item.name}</h3>
          <p class="lookbook-card-meta">${item.styleLabel} · ${favoriteSetLabel(item)} · ${favoriteKinds(item).join(' + ')}</p>
        </div>
      </button>
      <button class="lookbook-card-delete" data-delete="${item.signature}" type="button" aria-label="מחיקה">×</button>
    </article>
  `).join('');
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => openDetail(btn.dataset.open)));
  document.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => {
    state.saved = state.saved.filter(x => x.signature !== btn.dataset.delete);
    persist();
    renderAll();
    toast('נמחק');
  }));
}

function openDetail(signature){
  const item = state.saved.find(x => x.signature === signature);
  if(!item) return;
  $('dialogDate').textContent = formatDate(item.savedAt);
  $('dialogName').textContent = item.name;
  $('dialogStyle').textContent = item.styleLabel;
  if($('dialogWhy')) $('dialogWhy').textContent = item.why || setWhy(item);
  if($('dialogCourage')) $('dialogCourage').textContent = `דרגת אומץ: ${item.courage || courageFor(item)}`;
  if($('dialogFinish')) $('dialogFinish').textContent = `גימור: ${item.finishSummary || finishSummary(item)}`;
  renderSwatches($('dialogSwatches'), item.colors);
  renderInstructions($('dialogInstructions'), item.instructions);
  $('detailDialog').showModal();
}

function renderStats(){
  const count = state.saved.length;
  const lastDays = count ? daysBetween(new Date(state.saved[0].savedAt), new Date()) : null;
  const colorCounts = {};
  state.saved.forEach(item => item.colors.forEach(c => colorCounts[c.family] = (colorCounts[c.family] || 0) + 1));
  const topFamilies = Object.entries(colorCounts).sort((a,b) => b[1]-a[1]).slice(0,4);
  const topText = topFamilies.length ? topFamilies.map(x => x[0]).join(' · ') : 'עדיין אין מספיק נתונים';
  const twistCount = state.saved.filter(x => x.type !== 'solid').length;

  $('cuteStats').innerHTML = `
    <section class="stat-card">
      <h3>${count} מריחות שמורות</h3>
      <p>${count ? 'הקולקציה שלך מתחילה לקבל אופי.' : 'כשתשמרי מריחות, יהיה כאן סיכום קטן וחמוד.'}</p>
    </section>
    <section class="stat-card">
      <h3>${lastDays === null ? 'אין ספירה עדיין' : `${lastDays} ימים מהאחרונה`}</h3>
      <p>${lastDays === null ? 'לחצי אהבתי כדי להתחיל לספור.' : lastStatusText(lastDays)}</p>
    </section>
    <section class="stat-card">
      <h3>הצבעים שלך</h3>
      <p>${topText}</p>
      <div class="mini-palette">${topFamilies.map(([fam]) => `<span class="swatch-dot" style="background:${familyPreview(fam)}"></span>`).join('')}</div>
    </section>
    <section class="stat-card">
      <h3>${twistCount} מריחות עם טוויסט</h3>
      <p>בלי פרנץ׳, בלי מאט, בלי אומברה. בדיוק כמו שסגרנו.</p>
    </section>
  `;
}

function renderColors(){
  $('familyStrip').innerHTML = FAMILY_ORDER.map(fam => `
    <button class="family-btn ${state.selectedFamily === fam ? 'selected' : ''}" data-family="${fam}" type="button">${fam}</button>
  `).join('');
  document.querySelectorAll('#familyStrip .family-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedFamily = btn.dataset.family;
      const first = colorList().find(c => c.family === state.selectedFamily) || colorList()[0];
      state.selectedColorId = first.id;
      persist();
      renderColors();
    });
  });

  
const shades = colorList().filter(c => c.family === state.selectedFamily);
$('shadeGrid').innerHTML = shades.map(c => `
  <button class="shade-btn ${state.selectedColorId === c.id ? 'selected' : ''}" data-color="${c.id}" type="button">
    <span class="shade-copy">
      <strong>${c.he}</strong>
      <small>${effectLabel(polishKind(c))}</small>
    </span>
    <span class="color-chip" style="background:${swatchBackground(c)}"></span>
  </button>
`).join('');
  document.querySelectorAll('#shadeGrid .shade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedColorId = btn.dataset.color;
      persist();
      renderColors();
    });
  });
}

function polishKind(c){
  if(!c) return 'רגיל';
  if(c.finish === 'magnetic' || c.family === 'מגנטי') return 'מגנטי';
  if(c.finish === 'glitter' || c.family === 'גליטר') return 'גליטר';
  if(c.finish === 'metallic' || c.family === 'מטאלי') return 'מטאלי';
  if(c.finish === 'jelly' || c.family === 'ג׳לי') return 'ג׳לי';
  return 'רגיל';
}
function isKind(c, kind){ return polishKind(c) === kind; }
function notMagnetic(c){ return polishKind(c) !== 'מגנטי'; }
function regularColor(c){ return polishKind(c) === 'רגיל'; }
function effectLabel(kind){
  return kind === 'רגיל' ? 'רגיל' : kind;
}
function weightedPick(items){
  const total = items.reduce((sum,x)=>sum+(x.weight||1),0);
  let r = Math.random()*total;
  for(const item of items){
    r -= item.weight || 1;
    if(r <= 0) return item.value ?? item;
  }
  return items[0]?.value ?? items[0];
}
function pickSolidKind(anchorColor=null){
  if(anchorColor) return polishKind(anchorColor);
  return weightedPick([
    {value:'רגיל', weight:52},
    {value:'ג׳לי', weight:17},
    {value:'מטאלי', weight:12},
    {value:'גליטר', weight:10},
    {value:'מגנטי', weight:9}
  ]);
}
function colorForKind(kind, extraFilter = () => true){
  return pickColorWeighted(c => isKind(c, kind) && extraFilter(c));
}
function displayName(c){
  return `${c.name} / ${polishKind(c)}`;
}
function shouldPreferSolid(){
  const recent = (state.recentShown || []).slice(0, 10);
  const solidCount = recent.filter(x => x.type === 'solid').length;
  const solidRatio = recent.length ? solidCount / recent.length : 0;

  // True 70% solid target, with guardrails against boring streaks.
  const last3 = recent.slice(0,3);
  const last3Solid = last3.filter(x => x.type === 'solid').length;

  if(last3Solid >= 3) return false;
  if(solidRatio < 0.60) return true;
  if(solidRatio > 0.78) return false;

  return Math.random() < 0.70;
}

function generateBestCombo(anchorColor = null){
  const targetType = shouldPreferSolid() ? 'solid' : 'twist';
  const pool = Array.from({length: 420}, () => generateCombo(anchorColor, targetType));

  const strict = pool.filter(c => !violatesThreeClickRule(c));
  const notDisliked = pool.filter(c => dislikedPenaltyFor(c) < 28);
  const strictNotDisliked = strict.filter(c => dislikedPenaltyFor(c) < 28);
  const soft = pool.filter(c => !softlyRepeats(c) && dislikedPenaltyFor(c) < 48);
  const candidates = strictNotDisliked.length ? strictNotDisliked : (strict.length ? strict : (notDisliked.length ? notDisliked : (soft.length ? soft : pool)));

  return candidates.sort((a,b) => scoreCombo(b) - scoreCombo(a))[0];
}


function pickTwistType(){
  return weightedPick([
    {value:'accent', weight:22},
    {value:'twoTone', weight:33},
    {value:'topper', weight:12},
    {value:'metallic', weight:8},
    {value:'multi3', weight:15},
    {value:'multi4', weight:7},
    {value:'multi5', weight:3}
  ]);
}

function uniqueCompatibleColors(base, count){
  const picked = [base];
  let guard = 0;
  while(picked.length < count && guard < 80){
    guard++;
    const reference = pick(picked);
    const candidate = pickCompatible(reference, c =>
      notMagnetic(c) &&
      polishKind(c) !== 'גליטר' &&
      !picked.some(x => x.id === c.id)
    );
    if(candidate && !picked.some(x => x.id === candidate.id)) picked.push(candidate);
  }
  while(picked.length < count){
    const candidate = pickColorWeighted(c => notMagnetic(c) && !picked.some(x => x.id === c.id));
    if(candidate) picked.push(candidate); else break;
  }
  return picked;
}

function multicolorBase(anchorColor=null){
  return (anchorColor && notMagnetic(anchorColor))
    ? anchorColor
    : pickColorWeighted(c => notMagnetic(c) && polishKind(c) !== 'גליטר');
}


function generateCombo(anchorColor = null, targetType = null){
  // Magnetic stays solid, always — even when selected from the shade screen.
  if(anchorColor && polishKind(anchorColor) === 'מגנטי') return solidCombo(anchorColor);

  let type;
  if(targetType === 'solid'){
    type = 'solid';
  }else if(targetType === 'twist'){
    type = anchorColor ? pickAnchoredTwistType(anchorColor) : pickTwistType();
  }else{
    type = anchorColor ? pickAnchoredType(anchorColor) : (shouldPreferSolid() ? 'solid' : pickTwistType());
  }

  if(type === 'solid') return solidCombo(anchorColor);
  if(type === 'accent') return accentCombo(anchorColor);
  if(type === 'twoTone') return twoToneCombo(anchorColor);
  if(type === 'topper') return topperCombo(anchorColor);
  if(type === 'metallic') return metallicCombo(anchorColor);
  if(type === 'multi3') return threeColorCombo(anchorColor);
  if(type === 'multi4') return fourColorCombo(anchorColor);
  return fiveColorCombo(anchorColor);
}

function solidCombo(anchorColor){
  const kind = pickSolidKind(anchorColor);
  const base = anchorColor || colorForKind(kind);
  const label = polishKind(base);
  return makeCombo({
    type:'solid',
    polishType:label,
    styleLabel:`אחיד · ${effectLabel(label)}`,
    name:displayName(base),
    colors:[base],
    nails:[base,base,base,base,base],
    instructions:[{area:'כל האצבעות', text:displayName(base)}]
  });
}

function accentCombo(anchorColor){
  const base = (anchorColor && notMagnetic(anchorColor)) ? anchorColor : pickColorWeighted(c => notMagnetic(c) && polishKind(c) !== 'גליטר');
  const baseKind = polishKind(base);
  const accentPool = [
    () => colorForKind('גליטר', c => c.id !== base.id),
    () => colorForKind('מטאלי', c => c.id !== base.id),
    () => pickCompatible(base, c => c.id !== base.id && notMagnetic(c))
  ];
  const accent = pick(accentPool)();
  return makeCombo({
    type:'accent',
    styleLabel:`שילוב · ${effectLabel(baseKind)} + ${effectLabel(polishKind(accent))}`,
    name:`${displayName(base)} + ${displayName(accent)}`,
    colors:[base, accent],
    nails:[base,base,base,accent,base],
    instructions:[
      {area:'רוב האצבעות', text:displayName(base)},
      {area:'קמיצה', text:displayName(accent)}
    ]
  });
}

function twoToneCombo(anchorColor){
  const base = (anchorColor && notMagnetic(anchorColor)) ? anchorColor : pickColorWeighted(c => notMagnetic(c) && polishKind(c) !== 'גליטר');
  const baseKind = polishKind(base);
  let second;
  if(baseKind === 'ג׳לי'){
    second = Math.random() < 0.45
      ? colorForKind('ג׳לי', c => c.id !== base.id)
      : pickCompatible(base, c => c.id !== base.id && notMagnetic(c) && polishKind(c) !== 'גליטר');
  }else{
    second = pickCompatible(base, c => c.id !== base.id && notMagnetic(c) && polishKind(c) !== 'מגנטי');
  }
  return makeCombo({
    type:'twoTone',
    styleLabel:`שילוב · שני גוונים`,
    name:`${displayName(base)} & ${displayName(second)}`,
    colors:[base, second],
    nails:[base,second,base,second,base],
    instructions:[
      {area:'אגודל/אמה/זרת', text:displayName(base)},
      {area:'אצבע/קמיצה', text:displayName(second)}
    ]
  });
}


function threeColorCombo(anchorColor){
  const base = multicolorBase(anchorColor);
  const [c1,c2,c3] = uniqueCompatibleColors(base,3);
  const patterns = [
    [c1,c2,c3,c2,c1],
    [c1,c1,c2,c3,c2],
    [c1,c2,c1,c3,c1]
  ];
  const nails = pick(patterns);
  return makeCombo({
    type:'multi3',
    styleLabel:'שילוב · שלושה גוונים',
    name:`${displayName(c1)} + ${displayName(c2)} + ${displayName(c3)}`,
    colors:[c1,c2,c3],
    nails,
    instructions:[
      {area:'אגודל וזרת', text:displayName(nails[0])},
      {area:'אצבע ואמה', text:`${displayName(nails[1])} / ${displayName(nails[2])}`},
      {area:'קמיצה', text:displayName(nails[3])}
    ]
  });
}

function fourColorCombo(anchorColor){
  const base = multicolorBase(anchorColor);
  const [c1,c2,c3,c4] = uniqueCompatibleColors(base,4);
  const nails = pick([
    [c1,c2,c3,c4,c1],
    [c1,c2,c3,c2,c4],
    [c1,c1,c2,c3,c4]
  ]);
  return makeCombo({
    type:'multi4',
    styleLabel:'שילוב · ארבעה גוונים',
    name:`${c1.he} + ${c2.he} + ${c3.he} + ${c4.he}`,
    colors:[c1,c2,c3,c4],
    nails,
    instructions:nails.map((c,i)=>({area:['אגודל','אצבע','אמה','קמיצה','זרת'][i], text:displayName(c)}))
  });
}

function fiveColorCombo(anchorColor){
  const base = multicolorBase(anchorColor);
  const colors = uniqueCompatibleColors(base,5);
  return makeCombo({
    type:'multi5',
    styleLabel:'שילוב · כל אצבע בצבע אחר',
    name:colors.map(c=>c.he).join(' · '),
    colors,
    nails:colors,
    instructions:colors.map((c,i)=>({area:['אגודל','אצבע','אמה','קמיצה','זרת'][i], text:displayName(c)}))
  });
}

function topperCombo(anchorColor){
  const base = (anchorColor && notMagnetic(anchorColor) && polishKind(anchorColor) !== 'גליטר') ? anchorColor : pickColorWeighted(c => notMagnetic(c) && polishKind(c) !== 'גליטר');
  const glitter = colorForKind('גליטר');
  return makeCombo({
    type:'topper',
    styleLabel:`שילוב · ${polishKind(base) === 'ג׳לי' ? 'ג׳לי + גליטר עדין' : 'גליטר עדין'}`,
    name:`${displayName(base)} + ${displayName(glitter)}`,
    colors:[base, glitter],
    nails:[base,base,base,glitter,base],
    instructions:[
      {area:'רוב האצבעות', text:displayName(base)},
      {area:'קמיצה / מעל שכבה אחת', text:displayName(glitter)}
    ]
  });
}

function metallicCombo(anchorColor){
  const base = (anchorColor && notMagnetic(anchorColor) && polishKind(anchorColor) !== 'מטאלי') ? anchorColor : pickColorWeighted(c => notMagnetic(c) && polishKind(c) !== 'מטאלי' && polishKind(c) !== 'גליטר');
  const metallic = colorForKind('מטאלי');
  return makeCombo({
    type:'metallic',
    styleLabel:`שילוב · ${effectLabel(polishKind(base))} + מטאלי`,
    name:`${displayName(base)} + ${displayName(metallic)}`,
    colors:[base, metallic],
    nails:[base,base,metallic,base,metallic],
    instructions:[
      {area:'רוב האצבעות', text:displayName(base)},
      {area:'אקסנט מטאלי', text:displayName(metallic)}
    ]
  });
}

function magneticCombo(anchorColor){
  const magnetic = anchorColor && polishKind(anchorColor) === 'מגנטי' ? anchorColor : colorForKind('מגנטי');
  return makeCombo({
    type:'solid',
    polishType:'מגנטי',
    styleLabel:'אחיד · מגנטי',
    name:displayName(magnetic),
    colors:[magnetic],
    nails:[magnetic,magnetic,magnetic,magnetic,magnetic],
    instructions:[{area:'כל האצבעות', text:`${displayName(magnetic)} · Cat Eye`}]
  });
}

function pickAnchoredType(anchorColor){
  if(polishKind(anchorColor) === 'מגנטי') return 'solid';
  if(polishKind(anchorColor) === 'מטאלי') return Math.random() < 0.70 ? 'solid' : 'metallic';
  if(polishKind(anchorColor) === 'גליטר') return Math.random() < 0.60 ? 'solid' : 'accent';
  if(polishKind(anchorColor) === 'ג׳לי') return Math.random() < 0.70 ? 'solid' : pick(['twoTone','topper','accent']);
  return Math.random() < 0.70 ? 'solid' : pickTwistType();
}

function pickAnchoredTwistType(anchorColor){
  if(polishKind(anchorColor) === 'מגנטי') return 'solid';
  if(polishKind(anchorColor) === 'מטאלי') return 'metallic';
  if(polishKind(anchorColor) === 'גליטר') return 'accent';
  if(polishKind(anchorColor) === 'ג׳לי') return pick(['twoTone','topper','accent']);
  return pickTwistType();
}


function makeCombo(obj){
  const polishTypes = [...new Set((obj.colors || []).map(c => polishKind(c)))];
  const enriched = {...obj, polishTypes};
  enriched.courage = obj.courage || courageFor(enriched);
  enriched.finishSummary = obj.finishSummary || polishTypes.join(' + ');
  enriched.why = obj.why || setWhy(enriched);
  enriched.lookName = obj.lookName || setLookTitle(enriched);
  enriched.name = enriched.lookName;
  return {
    ...enriched,
    signature:`v26|${state.selectedMood||'surprise'}|${enriched.type}|${polishTypes.join('+')}|${enriched.colors.map(c => c.id).join('|')}|${enriched.nails.map(c => `${c.id}:${polishKind(c)}`).join('-')}`,
    createdAt:new Date().toISOString()
  };
}

function scoreCombo(combo){
  let s = 100;
  const recentShown = (state.recentShown || []).slice(0, 8);
  const recentSaved = state.saved.slice(0, 12);
  const recentShownIds = recentShown.flatMap(x => x.colorIds || []);
  const recentShownFamilies = recentShown.flatMap(x => x.families || []);
  const recentSavedIds = recentSaved.flatMap(x => x.colors.map(c => c.id));
  const recentTypeCount = recentShown.filter(x => x.type === combo.type).length;
  const recentKindCount = recentShown.flatMap(x => x.polishKinds || []).filter(k => combo.polishTypes?.includes(k)).length;

  combo.colors.forEach(c => {
    s -= recentShownIds.filter(id => id === c.id).length * 24;
    s -= recentShownFamilies.filter(f => f === c.family).length * 7;
    s -= recentSavedIds.filter(id => id === c.id).length * 8;
    if(colorInMood(c)) s += 18;
    else s -= 6;
  });

  const uniqueFamilies = new Set(combo.colors.map(c => c.family)).size;
  s += uniqueFamilies * 7;
  s -= recentTypeCount * 4;
  s -= recentKindCount * 3;
  if(combo.type !== 'solid') s += 1;
  if(combo.type === 'topper' || combo.type === 'accent' || combo.type === 'twoTone') s += 1;
  if(combo.colors.some(c => ['מטאלי','גליטר','מגנטי','ג׳לי'].includes(polishKind(c)))) s += 3;

  const last3Families = new Set((state.recentShown || []).slice(0,3).flatMap(x => x.families || []));
  combo.colors.forEach(c => {
    if(!last3Families.has(c.family)) s += 6;
  });

  s -= dislikedPenaltyFor(combo);

  return s + Math.random() * 4;
}


function colorList(){
  return Object.entries(COLORS).map(([id, c]) => ({...c, id}));
}

function pickColorWeighted(filter = () => true){
  const options = colorList().filter(filter);
  const total = options.reduce((sum,c) => sum + (c.weight || 5), 0);
  let r = Math.random() * total;
  for(const c of options){
    r -= (c.weight || 5);
    if(r <= 0) return c;
  }
  return options[0] || colorList()[0];
}

function pickCompatible(base, filter = () => true){
  const preferred = {
    'אדומים':['בורדו','ורודים','מטאלי','גליטר','ניוד','בהירים','אפורים','כתומים'],
    'בורדו':['אדומים','ורודים','מטאלי','גליטר','כהים','חומים','בהירים'],
    'ורודים':['בורדו','אדומים','סגולים','מטאלי','גליטר','ניוד','בהירים','אפורים'],
    'סגולים':['ורודים','בורדו','כחולים','טורקיז','מטאלי','גליטר','אפורים','בהירים'],
    'כתומים':['צהובים','חומים','אדומים','מטאלי','גליטר','בהירים'],
    'צהובים':['כתומים','חומים','מטאלי','גליטר','אפורים','כחולים','טורקיז','בהירים'],
    'ירוקים':['מטאלי','גליטר','כהים','חומים','כחולים','טורקיז','צהובים','אפורים'],
    'כחולים':['מטאלי','גליטר','כהים','ירוקים','טורקיז','אפורים','בהירים','סגולים'],
    'טורקיז':['כחולים','ירוקים','מטאלי','גליטר','אפורים','בהירים'],
    'חומים':['מטאלי','גליטר','בורדו','אדומים','ירוקים','ניוד','צהובים'],
    'ניוד':['אדומים','בורדו','ורודים','מטאלי','גליטר','אפורים','כהים','בהירים'],
    'אפורים':['אדומים','בורדו','ורודים','מטאלי','גליטר','כחולים','טורקיז','ירוקים','צהובים'],
    'כהים':['מטאלי','גליטר','בורדו','כחולים','טורקיז','ירוקים','בהירים','אפורים'],
    'בהירים':['אדומים','בורדו','ורודים','מטאלי','גליטר','אפורים','כחולים','טורקיז','ירוקים'],
    'ג׳לי':['ורודים','ניוד','בהירים','אדומים','סגולים','טורקיז'],
    'מטאלי':['בורדו','כהים','אדומים','חומים','ירוקים','כחולים','טורקיז','ורודים','אפורים'],
    'גליטר':['בורדו','אדומים','כהים','ורודים','חומים','כחולים','טורקיז','ירוקים','בהירים'],
    'מגנטי':['כהים','מטאלי','בורדו','כחולים','טורקיז','ירוקים','ורודים']
  }[base.family] || ['בורדו','כהים','מטאלי','ורודים','כחולים'];
  const options = colorList().filter(c => filter(c) && preferred.includes(c.family));
  return pick(options.length ? options : colorList().filter(filter));
}



function nailBackground(c){
  if(!c) return '#f3c7d5';
  const base = c.hex || '#f3c7d5';

  if(c.finish === 'jelly'){
    // translucent feel, but still visibly colored on the nail preview
    return `linear-gradient(135deg, ${lighten(base, 42)} 0%, ${base} 55%, ${darken(base, 10)} 100%)`;
  }

  if(c.finish === 'glitter'){
    return `
      radial-gradient(circle at 28% 24%, rgba(255,255,255,.95) 0 2.2px, transparent 2.8px),
      radial-gradient(circle at 62% 38%, rgba(255,255,255,.82) 0 1.8px, transparent 2.4px),
      radial-gradient(circle at 46% 70%, rgba(255,255,255,.72) 0 1.6px, transparent 2.3px),
      linear-gradient(135deg, ${darken(base, 8)}, ${base} 58%, ${lighten(base, 26)})
    `;
  }

  if(c.finish === 'metallic'){
    return `linear-gradient(135deg, ${darken(base, 14)}, ${lighten(base, 48)} 42%, ${base} 68%, ${darken(base, 10)})`;
  }

  if(c.finish === 'magnetic'){
    return `linear-gradient(120deg, ${darken(base, 24)}, ${lighten(base, 54)} 45%, ${base} 58%, ${darken(base, 18)})`;
  }

  return base;
}

function swatchBackground(c){
  if(c.finish === 'metallic') return `linear-gradient(135deg, ${c.hex}, ${lighten(c.hex, 50)}, ${c.hex})`;
  if(c.finish === 'glitter') return `radial-gradient(circle at 35% 30%, rgba(255,255,255,.9) 0 3px, transparent 4px), radial-gradient(circle at 70% 65%, rgba(255,255,255,.78) 0 2px, transparent 3px), linear-gradient(135deg, ${darken(c.hex, 6)}, ${c.hex} 55%, ${lighten(c.hex, 32)})`;
  if(c.finish === 'magnetic') return `linear-gradient(120deg, ${darken(c.hex, 20)}, ${lighten(c.hex, 45)} 48%, ${c.hex} 60%, ${darken(c.hex, 18)})`;
  if(c.finish === 'jelly') return `linear-gradient(135deg, ${lighten(c.hex, 38)}, ${c.hex} 58%, ${darken(c.hex, 8)})`;
  return c.hex;
}

function finishOverlay(c){
  return '';
}

function lighten(hex, amount){ return shift(hex, amount); }
function darken(hex, amount){ return shift(hex, -amount); }
function shift(hex, amount){
  const n = hex.replace('#','');
  const r = Math.max(0, Math.min(255, parseInt(n.slice(0,2),16)+amount));
  const g = Math.max(0, Math.min(255, parseInt(n.slice(2,4),16)+amount));
  const b = Math.max(0, Math.min(255, parseInt(n.slice(4,6),16)+amount));
  return `rgb(${r},${g},${b})`;
}

function familyPreview(fam){
  const c = colorList().find(x => x.family === fam);
  return c ? swatchBackground(c) : '#ccc';
}

function daysBetween(a,b){
  return Math.max(0, Math.floor((b - a) / (1000*60*60*24)));
}

function lastStatusText(days){
  if(days >= 28) return 'שימי, די, להחליף 😄';
  if(days >= 21) return 'זמן להחליף';
  if(days >= 15) return 'מתחיל להתקרב';
  return 'עדיין טרי ✨';
}

function formatDate(iso){
  return new Date(iso).toLocaleDateString('he-IL', {day:'numeric', month:'long'});
}

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', init);
