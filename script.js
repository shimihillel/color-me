
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
  catEyeRose:{name:'Cat Eye Rose',he:'מגנטי ורוד',hex:'#9B5C7A',family:'מגנטי',weight:5,finish:'magnetic'}
};

const FAMILY_ORDER = ['אדומים','בורדו','ורודים','כתומים','צהובים','סגולים','כהים','כחולים','ירוקים','חומים','ניוד','בהירים','אפורים','מטאלי','גליטר','מגנטי'];

const TWIST_TYPES = ['accent','twoTone','topper','metallic','magnetic'];

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
    primary: combo.nails?.[0]?.id || combo.colors?.[0]?.id || '',
    pattern: (combo.nails || []).map(c => c.id).join('|')
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
    shape.style.background = color.hex || color;
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

function renderFavorites(){
  $('favoritesCount').textContent = state.saved.length;
  if(!state.saved.length){
    $('favoritesList').innerHTML = `<div class="card empty-state"><strong>אין עדיין מריחות שמורות</strong><br>כשתלחצי שומרת, הן יופיעו כאן.</div>`;
    return;
  }
  $('favoritesList').innerHTML = state.saved.map(item => `
    <article class="saved-card">
      <div class="saved-top">
        <div>
          <h3 class="saved-title">${item.name}</h3>
          <p class="saved-meta">${item.styleLabel}</p>
        </div>
        <span class="saved-date">${formatDate(item.savedAt)}</span>
      </div>
      <div class="swatches-row">${item.colors.map(c => `<span class="swatch-dot" style="background:${swatchBackground(c)}"></span>`).join('')}</div>
      <div class="saved-actions">
        <button class="text-btn" data-open="${item.signature}" type="button">פתחי</button>
        <button class="text-btn" data-delete="${item.signature}" type="button">מחיקה</button>
      </div>
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

function generateBestCombo(anchorColor = null){
  const pool = Array.from({length: 220}, () => generateCombo(anchorColor));
  const strict = pool.filter(c => !violatesThreeClickRule(c));
  const soft = pool.filter(c => !softlyRepeats(c));
  const candidates = strict.length ? strict : (soft.length ? soft : pool);
  return candidates.sort((a,b) => scoreCombo(b) - scoreCombo(a))[0];
}


function generateCombo(anchorColor = null){
  const recent = (state.recentShown && state.recentShown.length ? state.recentShown : state.saved).slice(0,6);
  const recentTypes = recent.map(x => x.type);
  const solidRecently = recentTypes.filter(t => t === 'solid').length;

  // v10 tuning: around 70% solid overall, but without creating boring streaks.
  let solidChance = 0.70;
  if(solidRecently >= 5) solidChance = 0.50;
  else if(solidRecently >= 4) solidChance = 0.58;
  else if(solidRecently <= 1) solidChance = 0.76;

  const preferSolid = Math.random() < solidChance;
  const type = anchorColor ? pickAnchoredType(anchorColor) : (preferSolid ? 'solid' : pick(TWIST_TYPES));

  if(type === 'solid') return solidCombo(anchorColor);
  if(type === 'accent') return accentCombo(anchorColor);
  if(type === 'twoTone') return twoToneCombo(anchorColor);
  if(type === 'topper') return topperCombo(anchorColor);
  if(type === 'metallic') return metallicCombo(anchorColor);
  return magneticCombo(anchorColor);
}

function solidCombo(anchorColor){
  const base = anchorColor || pickColorWeighted(c => !['גליטר','מגנטי'].includes(c.family));
  return makeCombo({
    type:'solid',
    styleLabel:'אחיד · מבריק',
    name:base.name,
    colors:[base],
    nails:[base,base,base,base,base],
    instructions:[{area:'כל האצבעות', text:base.name}]
  });
}

function accentCombo(anchorColor){
  const base = anchorColor || pickColorWeighted(c => true);
  const accent = pickCompatible(base, c => c.id !== base.id);
  return makeCombo({
    type:'accent',
    styleLabel:'טוויסט · אצבע אקסנט',
    name:`${base.name} + ${accent.name}`,
    colors:[base, accent],
    nails:[base,base,base,accent,base],
    instructions:[
      {area:'רוב האצבעות', text:base.name},
      {area:'קמיצה', text:accent.name}
    ]
  });
}

function twoToneCombo(anchorColor){
  const base = anchorColor || pickColorWeighted(c => !['מגנטי'].includes(c.family));
  const second = pickCompatible(base, c => c.id !== base.id);
  return makeCombo({
    type:'twoTone',
    styleLabel:'טוויסט · שני גוונים',
    name:`${base.name} & ${second.name}`,
    colors:[base, second],
    nails:[base,second,base,second,base],
    instructions:[
      {area:'אגודל/אמה/זרת', text:base.name},
      {area:'אצבע/קמיצה', text:second.name}
    ]
  });
}

function topperCombo(anchorColor){
  const base = anchorColor || pickColorWeighted(c => !['גליטר','מטאלי','מגנטי'].includes(c.family));
  const glitter = pickColorWeighted(c => c.family === 'גליטר');
  return makeCombo({
    type:'topper',
    styleLabel:'טוויסט · גליטר עדין',
    name:`${base.name} + ${glitter.name}`,
    colors:[base, glitter],
    nails:[base,base,base,glitter,base],
    instructions:[
      {area:'כל האצבעות', text:base.name},
      {area:'מעל קמיצה', text:glitter.name}
    ]
  });
}

function metallicCombo(anchorColor){
  const base = anchorColor || pickColorWeighted(c => c.family === 'מטאלי');
  const companion = base.family === 'מטאלי' ? pickCompatible(base, c => c.id !== base.id) : pickColorWeighted(c => c.family === 'מטאלי');
  return makeCombo({
    type:'metallic',
    styleLabel:'טוויסט · מטאלי',
    name:`${base.name} + ${companion.name}`,
    colors:[base, companion],
    nails:[base,base,companion,base,companion],
    instructions:[
      {area:'רוב האצבעות', text:base.name},
      {area:'אקסנט מטאלי', text:companion.name}
    ]
  });
}

function magneticCombo(anchorColor){
  const magnetic = anchorColor?.family === 'מגנטי' ? anchorColor : pickColorWeighted(c => c.family === 'מגנטי');
  return makeCombo({
    type:'magnetic',
    styleLabel:'מגנטי · Cat Eye',
    name:magnetic.name,
    colors:[magnetic],
    nails:[magnetic,magnetic,magnetic,magnetic,magnetic],
    instructions:[{area:'כל האצבעות', text:`${magnetic.name} · Cat Eye`}]
  });
}

function pickAnchoredType(anchorColor){
  if(anchorColor.family === 'מגנטי') return 'magnetic';
  if(anchorColor.family === 'מטאלי') return Math.random() < 0.68 ? 'solid' : 'metallic';
  if(anchorColor.family === 'גליטר') return Math.random() < 0.35 ? 'solid' : (Math.random() < 0.5 ? 'accent' : 'topper');
  return Math.random() < 0.70 ? 'solid' : pick(TWIST_TYPES.filter(t => t !== 'magnetic'));
}

function makeCombo(obj){
  return {
    ...obj,
    signature:`${obj.type}|${obj.colors.map(c => c.id).join('|')}|${obj.nails.map(c => c.id).join('-')}`,
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
  if(combo.type !== 'solid') s += 8;
  if(combo.type === 'topper' || combo.type === 'accent' || combo.type === 'twoTone') s += 5;
  if(combo.colors.some(c => ['מטאלי','גליטר','מגנטי'].includes(c.family))) s += 3;

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


function swatchBackground(c){
  if(c.finish === 'metallic') return `linear-gradient(135deg, ${c.hex}, ${lighten(c.hex, 50)}, ${c.hex})`;
  if(c.finish === 'glitter') return `radial-gradient(circle at 35% 30%, rgba(255,255,255,.8) 0 3px, transparent 4px), radial-gradient(circle at 70% 65%, rgba(255,255,255,.65) 0 2px, transparent 3px), linear-gradient(135deg, ${c.hex}, ${lighten(c.hex, 38)})`;
  if(c.finish === 'magnetic') return `linear-gradient(120deg, ${darken(c.hex, 20)}, ${lighten(c.hex, 45)} 48%, ${c.hex} 60%, ${darken(c.hex, 18)})`;
  return c.hex;
}

function finishOverlay(c){
  if(c.finish === 'glitter') return `radial-gradient(circle at 32% 28%, rgba(255,255,255,.85) 0 2px, transparent 3px), radial-gradient(circle at 70% 62%, rgba(255,255,255,.72) 0 1.8px, transparent 3px)`;
  if(c.finish === 'metallic') return `linear-gradient(135deg, rgba(255,255,255,.35), transparent 45%, rgba(255,255,255,.20))`;
  if(c.finish === 'magnetic') return `linear-gradient(120deg, transparent, rgba(255,255,255,.45) 46%, transparent 64%)`;
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
