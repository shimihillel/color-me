
'use strict';

const STORAGE_KEY = 'color-me-v1';

const COLORS = {
  cherry:{name:'Cherry',he:'דובדבן',hex:'#8B1A2E',family:'אדומים',weight:7},
  crimson:{name:'Crimson',he:'קרימזון',hex:'#C41E3A',family:'אדומים',weight:7},
  venetian:{name:'Venetian Red',he:'אדום ונציאני',hex:'#A83828',family:'אדומים',weight:6},
  scarlet:{name:'Scarlet',he:'אדום ארגמן',hex:'#D4313D',family:'אדומים',weight:6},
  poppy:{name:'Poppy Red',he:'אדום פרג',hex:'#E34234',family:'אדומים',weight:6},
  tomato:{name:'Tomato Red',he:'אדום עגבניה',hex:'#C73E2D',family:'אדומים',weight:6},
  bordeaux:{name:'Deep Bordeaux',he:'בורדו עמוק',hex:'#5C1A2E',family:'בורדו',weight:7},
  ruby:{name:'Ruby',he:'רובי',hex:'#9B123D',family:'בורדו',weight:7},
  mulberry:{name:'Mulberry',he:'תות יער כהה',hex:'#8B4B6B',family:'בורדו',weight:6},
  wine:{name:'Wine',he:'יין',hex:'#6A2037',family:'בורדו',weight:6},
  berry:{name:'Berry Jam',he:'ריבת פירות יער',hex:'#7F294A',family:'בורדו',weight:6},
  plum:{name:'Smoked Plum',he:'שזיף מעושן',hex:'#5B294A',family:'סגולים',weight:6},
  orchid:{name:'Orchid',he:'אורכידאה',hex:'#A04FA3',family:'סגולים',weight:6},
  lavender:{name:'Lavender',he:'לבנדר',hex:'#B59AD7',family:'סגולים',weight:5},
  lilac:{name:'Lilac',he:'לילך',hex:'#C6B0E3',family:'סגולים',weight:5},
  amethyst:{name:'Amethyst',he:'אמטיסט',hex:'#7B4BA3',family:'סגולים',weight:6},
  noir:{name:'Noir',he:'שחור מבריק',hex:'#151116',family:'כהים',weight:6},
  graphite:{name:'Graphite',he:'גרפיט',hex:'#3D4148',family:'כהים',weight:5},
  espresso:{name:'Espresso',he:'אספרסו',hex:'#2E211E',family:'כהים',weight:5},
  midnight:{name:'Midnight Blue',he:'כחול לילה',hex:'#121F3D',family:'כהים',weight:6},
  forest:{name:'Bottle Green',he:'ירוק בקבוק',hex:'#123A2E',family:'כהים',weight:6},
  navy:{name:'Navy Gloss',he:'כחול עמוק',hex:'#1F4065',family:'כחולים',weight:6},
  cobalt:{name:'Cobalt',he:'קובלט',hex:'#2A4A8A',family:'כחולים',weight:6},
  teal:{name:'Deep Teal',he:'טיל כהה',hex:'#1F6667',family:'כחולים',weight:6},
  sapphire:{name:'Sapphire',he:'ספיר',hex:'#214C9A',family:'כחולים',weight:6},
  denim:{name:'Denim',he:'דנים',hex:'#5878A8',family:'כחולים',weight:5},
  sky:{name:'Sky Blue',he:'תכלת',hex:'#8CB8E8',family:'כחולים',weight:5},
  powderBlue:{name:'Powder Blue',he:'כחול אבקתי',hex:'#A8C5E7',family:'כחולים',weight:4},
  emerald:{name:'Emerald',he:'אמרלד',hex:'#057A55',family:'ירוקים',weight:6},
  moss:{name:'Moss',he:'טחב',hex:'#5C6B4A',family:'ירוקים',weight:5},
  olive:{name:'Olive',he:'זית',hex:'#6B6A38',family:'ירוקים',weight:5},
  pistachio:{name:'Pistachio',he:'פיסטוק',hex:'#A8C98E',family:'ירוקים',weight:5},
  mint:{name:'Mint',he:'מנטה',hex:'#8ED1C2',family:'ירוקים',weight:5},
  jade:{name:'Jade',he:'ג׳ייד',hex:'#2D8A73',family:'ירוקים',weight:5},
  chocolate:{name:'Chocolate',he:'שוקולד',hex:'#4D2418',family:'חומים',weight:6},
  cognac:{name:'Cognac',he:'קוניאק',hex:'#8B5E3C',family:'חומים',weight:6},
  terracotta:{name:'Terracotta',he:'טרה קוטה',hex:'#C4714A',family:'חומים',weight:6},
  cinnamon:{name:'Cinnamon',he:'קינמון',hex:'#9B5C3E',family:'חומים',weight:5},
  mocha:{name:'Mocha',he:'מוקה',hex:'#8A6A57',family:'חומים',weight:5},
  taupe:{name:'Taupe',he:'טאופ',hex:'#8D7D74',family:'חומים',weight:5},
  fuchsia:{name:'Fuchsia',he:'פוקסיה',hex:'#C0186A',family:'ורודים',weight:6},
  rose:{name:'Antique Rose',he:'ורוד עתיק',hex:'#B87878',family:'ורודים',weight:5},
  coral:{name:'Coral',he:'קורל',hex:'#D4604A',family:'ורודים',weight:5},
  hotPink:{name:'Hot Pink',he:'ורוד לוהט',hex:'#E6408B',family:'ורודים',weight:6},
  ballerina:{name:'Ballerina Pink',he:'ורוד בלרינה',hex:'#E6B9C8',family:'ורודים',weight:4},
  dustyRose:{name:'Dusty Rose',he:'ורוד מאובק',hex:'#C08A98',family:'ורודים',weight:4},
  peach:{name:'Peach',he:'אפרסק',hex:'#F0A37D',family:'כתומים',weight:5},
  apricot:{name:'Apricot',he:'משמש',hex:'#F1B278',family:'כתומים',weight:5},
  tangerine:{name:'Tangerine',he:'קלמנטינה',hex:'#EA7B34',family:'כתומים',weight:5},
  burntOrange:{name:'Burnt Orange',he:'כתום שרוף',hex:'#B95A29',family:'כתומים',weight:5},
  mango:{name:'Mango',he:'מנגו',hex:'#F2A900',family:'צהובים',weight:4},
  lemon:{name:'Lemon',he:'לימון',hex:'#F5DD4B',family:'צהובים',weight:4},
  mustard:{name:'Mustard',he:'חרדל',hex:'#C89B21',family:'צהובים',weight:5},
  butter:{name:'Butter',he:'חמאה',hex:'#F2E29B',family:'צהובים',weight:4},
  champagne:{name:'Champagne',he:'שמפניה',hex:'#D4C090',family:'ניוד',weight:4},
  caramel:{name:'Caramel Nude',he:'קרמל ניוד',hex:'#B89060',family:'ניוד',weight:4},
  cream:{name:'Cream',he:'שמנת',hex:'#EDE5D4',family:'ניוד',weight:4},
  milkyPink:{name:'Milky Pink',he:'ורוד חלבי',hex:'#EFD5DB',family:'ניוד',weight:4},
  sand:{name:'Sand',he:'חול',hex:'#CEB79B',family:'ניוד',weight:4},
  white:{name:'Pure White',he:'לבן',hex:'#FAFAF7',family:'בהירים',weight:4},
  pearl:{name:'Pearl',he:'פנינה',hex:'#EEEAE3',family:'בהירים',weight:4},
  dove:{name:'Dove Gray',he:'אפור יונה',hex:'#B7BCC5',family:'אפורים',weight:4},
  smoke:{name:'Smoke',he:'אפור עשן',hex:'#8C9098',family:'אפורים',weight:4},
  cement:{name:'Cement',he:'אפור בטון',hex:'#A2A6A1',family:'אפורים',weight:4},
  gold:{name:'Gold Rush',he:'זהב',hex:'#C8A030',family:'מטאלי',weight:6,finish:'metallic'},
  roseGold:{name:'Rose Gold',he:'רוז גולד',hex:'#C4847A',family:'מטאלי',weight:6,finish:'metallic'},
  silver:{name:'Silver Moon',he:'כסף ירחי',hex:'#A8B0BC',family:'מטאלי',weight:6,finish:'metallic'},
  copper:{name:'Copper Dusk',he:'נחושת',hex:'#A05A32',family:'מטאלי',weight:5,finish:'metallic'},
  chromePink:{name:'Chrome Pink',he:'כרום ורוד',hex:'#D58AA8',family:'מטאלי',weight:5,finish:'metallic'},
  chromeBlue:{name:'Chrome Blue',he:'כרום כחול',hex:'#7A98CC',family:'מטאלי',weight:5,finish:'metallic'},
  rubyGlitter:{name:'Ruby Glitter',he:'רובי גליטר',hex:'#8B1A2E',family:'גליטר',weight:5,finish:'glitter'},
  goldGlitter:{name:'Gold Dust',he:'אבק זהב',hex:'#D4A853',family:'גליטר',weight:5,finish:'glitter'},
  roseGlitter:{name:'Rose Glitter',he:'ורוד גליטר',hex:'#D4909A',family:'גליטר',weight:5,finish:'glitter'},
  midnightSparkle:{name:'Midnight Sparkle',he:'נצנוץ לילה',hex:'#1C1C3A',family:'גליטר',weight:5,finish:'glitter'},
  holographic:{name:'Holographic',he:'הולוגרפי',hex:'#C9D0E8',family:'גליטר',weight:5,finish:'glitter'},
  rainbowSpark:{name:'Rainbow Spark',he:'קשת נצנצים',hex:'#E1C6F0',family:'גליטר',weight:5,finish:'glitter'},
  catEyePlum:{name:'Cat Eye Plum',he:'מגנטי שזיף',hex:'#5C2A4A',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeTeal:{name:'Cat Eye Teal',he:'מגנטי טיל',hex:'#3A5A5C',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeForest:{name:'Cat Eye Forest',he:'מגנטי ירוק',hex:'#2A4A3A',family:'מגנטי',weight:5,finish:'magnetic'},
  catEyeRose:{name:'Cat Eye Rose',he:'מגנטי ורוד',hex:'#9B5C7A',family:'מגנטי',weight:5,finish:'magnetic'},
  jellyMilk:{name:'Milk Jelly',he:'חלב ג׳לי',hex:'#F7DDE4',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyPink:{name:'Pink Jelly',he:'ורוד ג׳לי',hex:'#F0AFC4',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyRose:{name:'Rose Jelly',he:'רוז ג׳לי',hex:'#D98BA0',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyCherry:{name:'Cherry Jelly',he:'דובדבן ג׳לי',hex:'#A9324C',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyBerry:{name:'Berry Jelly',he:'פירות יער ג׳לי',hex:'#8F3B62',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyCaramel:{name:'Caramel Jelly',he:'קרמל ג׳לי',hex:'#C8895C',family:'ג׳לי',weight:4,finish:'jelly'},
  jellyNude:{name:'Nude Jelly',he:'ניוד ג׳לי',hex:'#E8BFAE',family:'ג׳לי',weight:5,finish:'jelly'},
  jellyLavender:{name:'Lavender Jelly',he:'לבנדר ג׳לי',hex:'#BFA7D8',family:'ג׳לי',weight:4,finish:'jelly'}
};

const FAMILY_ORDER = ['אדומים','בורדו','ורודים','כתומים','צהובים','סגולים','כהים','כחולים','ירוקים','חומים','ניוד','בהירים','אפורים','ג׳לי','מטאלי','גליטר','מגנטי'];

const TWIST_TYPES = ['accent','twoTone','topper','metallic'];

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
      screen: saved.screen || 'homeScreen'
    };
  } catch {
    return { current:null, saved:[], recentShown:[], selectedFamily:'בורדו', selectedColorId:'bordeaux', screen:'homeScreen' };
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
  renderSwatches($('swatchesRow'), combo.colors);
  renderInstructions($('instructionsList'), combo.instructions);
  paintHand(combo);
  renderLastStatus();
}

function renderLastStatus(){
  if(!state.saved.length){
    $('lastStatusTitle').textContent = 'עדיין אין מריחה שמורה';
    $('lastStatusText').textContent = 'כשתלחצי שומרת, נתחיל לספור ימים.';
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

    // v13: apply one full background image.
    // Setting background + backgroundImage separately made jelly/glitter look almost blank.
    shape.style.background = nailBackground(color);
    shape.style.backgroundImage = '';
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

function renderFavorites(){
  $('favoritesCount').textContent = state.saved.length;
  if(!state.saved.length){
    $('favoritesList').innerHTML = `<div class="card empty-state"><strong>אין עדיין מריחות שמורות</strong><br>כשתלחצי שומרת, הן יופיעו כאן.</div>`;
    return;
  }
  $('favoritesList').innerHTML = state.saved.map(item => `
    <article class="compact-saved-card">
      <button class="compact-saved-main" data-open="${item.signature}" type="button">
        <div class="compact-saved-info">
          <h3 class="compact-saved-title">${item.name}</h3>
          <p class="compact-saved-meta">${formatDate(item.savedAt)} · ${item.styleLabel}</p>
        </div>
        <div class="compact-saved-dots">
          ${item.colors.slice(0,4).map(c => `<span class="compact-saved-dot" title="${c.he}" style="background:${swatchBackground(c)}"></span>`).join('')}
        </div>
      </button>
      <button class="compact-saved-delete" data-delete="${item.signature}" type="button" aria-label="מחיקה">×</button>
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
      <p>${lastDays === null ? 'לחצי שומרת כדי להתחיל לספור.' : lastStatusText(lastDays)}</p>
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
      <span class="color-chip" style="background:${swatchBackground(c)}"></span>
      <strong>${c.he}</strong>
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
  const pool = Array.from({length: 300}, () => generateCombo(anchorColor, targetType));

  const strict = pool.filter(c => !violatesThreeClickRule(c));
  const soft = pool.filter(c => !softlyRepeats(c));
  const candidates = strict.length ? strict : (soft.length ? soft : pool);

  return candidates.sort((a,b) => scoreCombo(b) - scoreCombo(a))[0];
}

function generateCombo(anchorColor = null, targetType = null){
  let type;

  if(targetType === 'solid'){
    type = 'solid';
  }else if(targetType === 'twist'){
    // Magnetic is never part of a mixed combo.
    type = anchorColor ? pickAnchoredTwistType(anchorColor) : pick(TWIST_TYPES);
  }else{
    type = anchorColor ? pickAnchoredType(anchorColor) : (shouldPreferSolid() ? 'solid' : pick(TWIST_TYPES));
  }

  if(type === 'solid') return solidCombo(anchorColor);
  if(type === 'accent') return accentCombo(anchorColor);
  if(type === 'twoTone') return twoToneCombo(anchorColor);
  if(type === 'topper') return topperCombo(anchorColor);
  return metallicCombo(anchorColor);
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
  return Math.random() < 0.70 ? 'solid' : pick(TWIST_TYPES);
}

function pickAnchoredTwistType(anchorColor){
  if(polishKind(anchorColor) === 'מגנטי') return 'accent';
  if(polishKind(anchorColor) === 'מטאלי') return 'metallic';
  if(polishKind(anchorColor) === 'גליטר') return 'accent';
  if(polishKind(anchorColor) === 'ג׳לי') return pick(['twoTone','topper','accent']);
  return pick(TWIST_TYPES);
}


function makeCombo(obj){
  const polishTypes = [...new Set((obj.colors || []).map(c => polishKind(c)))];
  return {
    ...obj,
    polishTypes,
    signature:`${obj.type}|${polishTypes.join('+')}|${obj.colors.map(c => c.id).join('|')}|${obj.nails.map(c => `${c.id}:${polishKind(c)}`).join('-')}`,
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

  combo.colors.forEach(c => {
    s -= recentShownIds.filter(id => id === c.id).length * 16;
    s -= recentShownFamilies.filter(f => f === c.family).length * 5;
    s -= recentSavedIds.filter(id => id === c.id).length * 6;
  });

  const uniqueFamilies = new Set(combo.colors.map(c => c.family)).size;
  s += uniqueFamilies * 7;
  if(combo.type !== 'solid') s += 1;
  if(combo.type === 'topper' || combo.type === 'accent' || combo.type === 'twoTone') s += 1;
  if(combo.colors.some(c => ['מטאלי','גליטר','מגנטי','ג׳לי'].includes(polishKind(c)))) s += 3;

  const last3Families = new Set((state.recentShown || []).slice(0,3).flatMap(x => x.families || []));
  combo.colors.forEach(c => {
    if(!last3Families.has(c.family)) s += 6;
  });

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
    'כתומים':['צהובים','חומים','אדומים','מטאלי','גליטר','בהירים'],
    'צהובים':['כתומים','חומים','מטאלי','גליטר','אפורים','כחולים','בהירים'],
    'סגולים':['ורודים','בורדו','כחולים','מטאלי','גליטר','אפורים','בהירים'],
    'כהים':['מטאלי','גליטר','בורדו','כחולים','ירוקים','בהירים','אפורים'],
    'כחולים':['מטאלי','גליטר','כהים','ירוקים','אפורים','בהירים','סגולים'],
    'ירוקים':['מטאלי','גליטר','כהים','חומים','כחולים','צהובים','אפורים'],
    'חומים':['מטאלי','גליטר','בורדו','אדומים','ירוקים','ניוד','צהובים'],
    'ניוד':['אדומים','בורדו','ורודים','מטאלי','גליטר','אפורים','כהים','בהירים'],
    'בהירים':['אדומים','בורדו','ורודים','מטאלי','גליטר','אפורים','כחולים','ירוקים'],
    'אפורים':['אדומים','בורדו','ורודים','מטאלי','גליטר','כחולים','ירוקים','צהובים'],
    'מטאלי':['בורדו','כהים','אדומים','חומים','ירוקים','כחולים','ורודים','אפורים'],
    'גליטר':['בורדו','אדומים','כהים','ורודים','חומים','כחולים','ירוקים','בהירים'],
    'מגנטי':['כהים','מטאלי','בורדו','כחולים','ירוקים','ורודים']
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
