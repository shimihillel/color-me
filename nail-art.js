'use strict';

// Reusable art geometry from the user's September 2026 references.
// Each placement is stored with the look, so reloading never redraws a design.
const NAIL_ART_TEMPLATES = [
  {id:'single', label:'נקודה של צבע', detail:'נקודה אחת בכל ציפורן'},
  {id:'accent', label:'קריצה קטנה', detail:'נקודה על שתי ציפורניים'},
  {id:'polka', label:'נקודות', detail:'נקודות מרווחות'},
  {id:'inverse', label:'הפכים מנוקדים', detail:'שני גוונים, נקודות הפוכות'},
  {id:'trio', label:'שלושה ונקודה', detail:'שלושה גוונים ונקודה'},
  {id:'accent-polka', label:'קמיצה מנוקדת', detail:'צבעים חלקים וקמיצה מנוקדת'},
  {id:'partial-polka', label:'קצת נקודות', detail:'בסיס אחיד ונקודות על חלק מהציפורניים'},
  {id:'color-polka', label:'חלק ומנוקד', detail:'שני גוונים, ציפורניים חלקות ומנוקדות'},
  {id:'contrast-polka', label:'נקודות עם צבע', detail:'צבע בולט לצד שתי ציפורניים מנוקדות'},
  {id:'confetti', label:'קונפטי', detail:'נקודות בשלושה צבעים'},
  {id:'star', label:'כוכב קטן', detail:'כוכב על ציפורן אחת או שתיים', skill:'מדבקה או מברשת דקה'},
  {id:'heart', label:'לב בין הנקודות', detail:'נקודות ולב קטן', skill:'מנקד ומברשת דקה'},
  {id:'stripes', label:'פסים ונקודות', detail:'קישוט על שתי ציפורניים', skill:'מברשת דקה'},
  {id:'line-accent', label:'פס אחד קטן', detail:'שני גוונים וציפורן עם פס עדין', skill:'מברשת דקה'},
  {id:'flower', label:'פרח קטן', detail:'פרח עדין מנקודות', skill:'קל עם מנקד'},
  {id:'french', label:'קצה של צבע', detail:'פרנץ׳ צבעוני דק', skill:'מברשת דקה'},
  {id:'french-shimmer', label:'קצה מנצנץ', detail:'בסיס צבעוני ופרנץ׳ מטאלי או גליטר', skill:'מברשת דקה'},
  {id:'french-rainbow', label:'צבע בקצות האצבעות', detail:'פרנץ׳ בצבע אחר בכל אצבע', skill:'מברשת דקה'},
  {id:'french-flower', label:'פרנץ׳ עם פרח', detail:'קצוות צבעוניים ופרח בקמיצה', skill:'מברשת דקה ומנקד'}
];

// Templates contain geometry only. Colors come from the existing color engine,
// never a list of palettes copied from the reference images.

const NAIL_ART_FINGERS = ['אגודל','אצבע','אמה','קמיצה','זרת'];
const NAIL_ART_DOT_TEMPLATES = new Set(['single','accent','polka','inverse','trio','accent-polka','partial-polka','color-polka','contrast-polka','confetti','heart','stripes']);
const NAIL_ART_LUMINANCE = new Map();
// Base-to-tip axis and transverse width in the original 1122 x 1402 photograph.
const NAIL_ART_FRAMES = [
  {base:[932,981], tip:[1011,875], width:68},
  {base:[922,407], tip:[981,291], width:69},
  {base:[822,259], tip:[878,132], width:79},
  {base:[634,295], tip:[693,176], width:74},
  {base:[391,442], tip:[438,342], width:59}
];

function nailArtColor(id){
  return {...COLORS[id], id};
}

function pickNextNailArtTemplate(){
  const recent = (state.recentShown || []).filter(item => item.artTemplate).slice(0,2);
  return pick(NAIL_ART_TEMPLATES.filter(t => !recent.some(item => item.artTemplate === t.id))).id;
}

function nailArtPattern(combo){
  if(!combo.art?.some(marks => marks?.length)) return '';
  // Include actual placement and color, not the marketing/template name.
  return '|art:' + combo.art.map(marks => (marks || []).map(mark =>
    `${mark.color.id}@${mark.x},${mark.y},${mark.r}` +
      (mark.kind && mark.kind !== 'dot' ? `:${mark.kind}:${mark.width || ''},${mark.length || ''},${mark.rotation || 0}` : '') +
      (mark.depth !== undefined ? `:depth=${mark.depth}` : '') + (mark.centerColor ? `:center=${mark.centerColor.id}` : '')
  ).join(';')).join('/');
}

function nailArtDots(color, variant=0, small=false){
  const points = [
    [-.21,.19], [.20,.30], [-.21,.44], [.22,.57], [-.17,.70], [.08,.86]
  ];
  return points.map(([x,y]) => ({
    x: variant % 2 ? -x : x,
    y,
    r: small ? .052 : .085,
    color
  }));
}

function nailArtLargeDots(color,variant=0){
  // Wider spacing lets the larger dots stay separate on every nail shape.
  return [[-.20,.21],[.20,.30],[-.20,.46],[.20,.55],[-.17,.71],[.17,.80]].map(([x,y])=>({
    x:variant%2 ? -x : x,y,r:.17,color
  }));
}

function nailArtCombo(templateId = pickNextNailArtTemplate(), options = {}){
  const template = NAIL_ART_TEMPLATES.find(t => t.id === templateId) || NAIL_ART_TEMPLATES[0];
  // Tiny hand-dotted art uses opaque polish. The shimmer French template
  // explicitly allows metallic/glitter tips; magnetic stays solid-only.
  const base = options.base && regularColor(options.base) ? options.base : pickColorWeighted(regularColor);
  const second = pickNailArtColor(base);
  const third = pickNailArtColor(base, [second.id]);
  const variant = options.variant ?? Math.floor(Math.random()*6);
  const dotSize = NAIL_ART_DOT_TEMPLATES.has(template.id) ? (options.dotSize || pick(['small','large'])) : null;
  const placement = [.22,.50,.78][variant % 3];
  const art = Array.from({length:5}, () => []);
  let nails;
  const dot = (color, y=placement) => [{x:0,y,r:dotSize==='large' ? .17 : .085,color}];
  const dots = (color,v=variant,small=false) => dotSize==='large' ? nailArtLargeDots(color,v) : nailArtDots(color,v,small);

  switch(template.id){
    case 'single': {
      const accents = variant % 2 ? [second,third] : [second];
      nails = Array(5).fill(base);
      art.forEach((_,i) => { art[i] = dot(accents[i % accents.length]); });
      break;
    }
    case 'accent':
      nails = [base,second,second,base,base];
      art[1] = dot(base); art[2] = dot(base);
      break;
    case 'polka':
      nails = Array(5).fill(base);
      art.forEach((_,i) => { art[i] = dots(second,variant+i,true); });
      break;
    case 'inverse':
      nails = variant % 2 ? [second,base,second,base,second] : [base,second,base,second,base];
      art.forEach((_,i) => { art[i] = dots(nails[i].id === base.id ? second : base,variant+i); });
      break;
    case 'trio': {
      const colors = [base,second,third];
      nails = Array.from({length:5}, (_,i) => colors[(i + variant) % 3]);
      art.forEach((_,i) => {
        const base = nails[i];
        const accent = colors.filter(c => c.id !== base.id).sort((a,b) =>
          nailArtContrast(base,b) - nailArtContrast(base,a)
        )[0];
        art[i] = dot(accent);
      });
      break;
    }
    case 'accent-polka':
      nails = variant % 2 ? [base,third,base,second,third] : [third,base,third,second,base];
      art[3] = dots(base,variant);
      break;
    case 'partial-polka':
      nails = Array(5).fill(base);
      (variant % 2 ? [0,2,3] : [1,2]).forEach(i => { art[i] = dots(second,variant+i); });
      break;
    case 'color-polka': {
      nails = Array(5).fill(base);
      const decorated = variant % 2 ? [0,3,4] : [0,3];
      decorated.forEach(i => { nails[i] = second; art[i] = dots(base,variant+i); });
      break;
    }
    case 'contrast-polka': {
      nails = Array(5).fill(base);
      // The dot color contrasts with its own accent background, independently
      // of the main manicure color, so all three shades can change freely.
      const dotColor = pickNailArtColor(second,[base.id]);
      [0,3].forEach(i => { nails[i] = second; art[i] = dots(dotColor,variant+i); });
      break;
    }
    case 'confetti': {
      const accents = [second,third,pickNailArtColor(base, [second.id,third.id])];
      nails = Array(5).fill(base);
      art.forEach((_,i) => {
        art[i] = dots(second,variant+i,true).map((mark,j) => ({
          ...mark, color:accents[(i+j) % accents.length]
        }));
      });
      break;
    }
    case 'star':
      nails = Array(5).fill(base);
      art[3] = [{kind:'star',x:0,y:[.34,.5,.66][variant%3],r:.25,color:second,rotation:0}];
      if(variant%2) art[0] = [{kind:'star',x:0,y:.5,r:.23,color:second,rotation:12}];
      break;
    case 'heart':
      nails = Array(5).fill(base);
      art.forEach((_,i) => { art[i] = dots(second,variant+i,true); });
      art[3] = [
        {kind:'heart',x:0,y:.5,r:.23,color:second},
        ...dots(second,variant,true).filter(mark => mark.y < .28 || mark.y > .78)
      ];
      break;
    case 'stripes':
      nails = [base,base,second,base,base];
      art[2] = dots(base,variant,true);
      // Stripes extend beyond the nail and are trimmed by its existing mask.
      art[3] = [-.27,0,.27].map(x => ({kind:'stripe',x,y:.5,r:0,width:.075,length:1.6,color:second}));
      break;
    case 'line-accent': {
      const backdrop = pickColorWeighted(c => regularColor(c) && ['ניוד','בהירים'].includes(c.family) && c.id!==base.id && c.id!==second.id);
      nails = [base,base,second,backdrop,base];
      const lineColor=[base,second].find(c=>nailArtContrast(backdrop,c)>=2.2) || pickNailArtColor(backdrop);
      art[3] = [{kind:'stripe',x:0,y:.5,r:0,width:.025,length:1.6,rotation:variant%2 ? 90 : 0,color:lineColor}];
      break;
    }
    case 'flower':
      nails = Array(5).fill(base);
      art[3] = [{kind:'flower',x:0,y:[.34,.5,.66][variant%3],r:.28,color:second}];
      if(variant%2) art[1] = [{kind:'flower',x:0,y:.5,r:.24,color:second}];
      break;
    case 'french':
    case 'french-shimmer':
    case 'french-rainbow':
    case 'french-flower': {
      nails=Array(5).fill(base);
      const accents=[template.id==='french-shimmer' ? pickFrenchShimmerColor(base) : second];
      if(template.id==='french-rainbow'){
        while(accents.length<5) accents.push(pickNailArtColor(base,accents.map(c=>c.id)));
      }
      art.forEach((_,i)=>{art[i]=[{kind:'french',x:0,y:1,r:0,depth:.06,color:accents[i%accents.length]}];});
      if(template.id==='french-flower'){
        art[3]=[{kind:'flower',x:0,y:.5,r:.3,color:second,centerColor:pickNailArtColor(second,[base.id])}];
      }
      break;
    }
  }

  const allColors = [...nails, ...art.flat().flatMap(mark => [mark.color,mark.centerColor].filter(Boolean))];
  const colors = [...new Map(allColors.map(c => [c.id,c])).values()];
  const combo = makeCombo({
    type:'nailArt',
    artTemplate:template.id,
    dotSize,
    art,
    lookName:template.id==='polka' ? `נקודות ${dotSize==='large' ? 'גדולות' : 'קטנות'}` : template.label,
    styleLabel:`${template.detail}${dotSize ? ` · נקודות ${dotSize==='large' ? 'גדולות' : 'קטנות'}` : ''} · ${template.skill || 'קל לביצוע'}`,
    colors,
    nails,
    instructions:nailArtInstructions(nails,art),
    why:'נייל ארט עדין בצבעים מתחלפים, בהשראת הרפרנסים שלך.'
  });
  return options.paired ? pairNailArtHands(combo) : combo;
}

function pickNailArtColor(base, excluded=[]){
  // Mostly use the original family rules, with some wider color pairings
  // (such as turquoise/red). Tiny marks always retain minimum contrast.
  const eligible = color => regularColor(color) && color.id !== base.id &&
    !excluded.includes(color.id) && nailArtContrast(base,color) >= 2.2;
  const distinct = color => eligible(color) && excluded.every(id => COLORS[id].family !== color.family);
  const filter = colorList().some(distinct) ? distinct : eligible;
  return Math.random()<.35 ? pickColorWeighted(filter) : pickCompatible(base,filter);
}

function pickFrenchShimmerColor(base){
  // A colored tip is a larger shape than a dot: hue contrast can distinguish
  // a cobalt tip from a caramel base even at similar luminance.
  return pickCompatible(base,c => ['metallic','glitter'].includes(c.finish) &&
    (nailArtContrast(base,c)>=2.2 || polishColorDistance(base,c)>=100));
}

function nailArtContrast(a,b){
  const luminance = color => {
    if(NAIL_ART_LUMINANCE.has(color.hex)) return NAIL_ART_LUMINANCE.get(color.hex);
    const values = color.hex.slice(1).match(/../g).map(v => {
      const n = parseInt(v,16)/255;
      return n <= .04045 ? n/12.92 : ((n+.055)/1.055)**2.4;
    });
    const result=values[0]*.2126 + values[1]*.7152 + values[2]*.0722;
    NAIL_ART_LUMINANCE.set(color.hex,result);
    return result;
  };
  const x=luminance(a), y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}

function nailArtInstructions(nails,art){
  const location = mark => mark.y < .4 ? 'ליד בסיס הציפורן' : mark.y > .6 ? 'ליד הקצה' : 'במרכז';
  const rows = nails.map((color,i) => {
    const marks = art[i];
    if(!marks.length) return {area:NAIL_ART_FINGERS[i], text:`${color.he}, חלק`};
    const descriptions = [...new Set(marks.map(mark=>mark.kind || 'dot'))].map(kind=>{
      const group=marks.filter(mark=>(mark.kind || 'dot')===kind);
      const names=[...new Set(group.map(mark=>mark.color.he))].join(', ');
      if(kind==='stripe'){
        const direction=group[0].rotation===90 ? 'לרוחב' : 'לאורך';
        return group.length===1 ? `פס דק אחד ${direction} הציפורן ב${names}` : `${group.length} פסים דקים ${direction} הציפורן ב${names}`;
      }
      if(kind==='french') return `פרנץ׳ דק ב${names}`;
      if(kind==='star') return `כוכב קטן ב${names} ${location(group[0])}`;
      if(kind==='heart') return `לב קטן ב${names} ${location(group[0])}`;
      if(kind==='flower') return `פרח קטן מנקודות ב${names} ${location(group[0])}${group[0].centerColor ? ` ונקודת מרכז ב${group[0].centerColor.he}` : ''}`;
      const size=group.every(mark=>mark.r>=.15) ? 'גדולות' : 'קטנות';
      return group.length===1 ? `נקודה ${size==='גדולות' ? 'גדולה' : 'קטנה'} ב${names} ${location(group[0])}` : `${group.length} נקודות ${size} ב${names}`;
    });
    return {area:NAIL_ART_FINGERS[i], text:`${color.he} עם ${descriptions.join(' ו')}`};
  });
  const kinds=new Set(art.flat().map(mark=>mark.kind || 'dot'));
  if(kinds.has('star')) rows.push({area:'הכוכב',text:'הכי קל עם מדבקת כוכב בגוון שמופיע בהצעה. אפשר גם לצייר כוכב קטן במברשת דקה.'});
  if(kinds.has('heart')) rows.push({area:'הלב',text:'הניחי שתי נקודות צמודות. משכי כל אחת בעדינות בקיסם או במברשת דקה לקצה משותף, בצורת לב.'});
  if(kinds.has('stripe')) rows.push({area:'הפסים',text:'במברשת דקה משכי את הפס או הפסים בכיוון שמופיע ליד האצבע. אפשר להיעזר בסרטי סימון על בסיס יבש לגמרי ולהסיר אותם בזהירות אחרי הצביעה.'});
  if(kinds.has('french')) rows.push({area:'הפרנץ׳',text:'במברשת דקה ציירי פס מעוגל ועדין לאורך הקצה החופשי של הציפורן. התחילי משני הצדדים וחברי באמצע. אפשר להיעזר במדבקות סימון לפרנץ׳ על בסיס יבש.'});
  if(kinds.has('flower')) rows.push({area:'הפרח',text:art.flat().some(mark=>mark.centerColor) ? 'עם מנקד הניחי חמש נקודות קטנות במעגל, ובמרכז הוסיפי נקודה בצבע שמופיע בהוראות.' : 'עם מנקד הניחי חמש נקודות קטנות במעגל, והשאירי רווח קטן באמצע. אין צורך לצייר עלי כותרת במברשת.'});
  if(kinds.has('dot')) rows.push({area:'הנקודות',text:art.flat().some(mark=>(!mark.kind || mark.kind==='dot') && mark.r>=.15)
    ? 'לנקודות הגדולות השתמשי במנקד עם ראש עגול גדול. טבלי מחדש לכל נקודה, הניחי בנגיעה ישרה והשאירי רווח בין הנקודות. נסי קודם על נייר.'
    : 'מנקד, או קצה קיסם לנקודות קטנות. הניחי בנגיעה ישרה וקלה, ונסי קודם על נייר.'});
  rows.push({area:'סדר המריחה',text:'מרחי את צבע הבסיס והמתיני לייבוש לפני הקישוט. כשהקישוט יבש, סיימי בטופ. בלק ג׳ל, הקשיחי לפי הוראות המוצר.'});
  return rows;
}

function paintNailArt(combo){
  const svgNS='http://www.w3.org/2000/svg';
  NAIL_ART_FRAMES.forEach((frame,index) => {
    const nail=document.getElementById(`n${index+1}`);
    if(!nail) return;
    nail.querySelector('.nail-art-layer')?.remove();
    const marks=combo.art?.[index] || [];
    if(!marks.length) return;
    const layer=document.createElementNS(svgNS,'svg');
    layer.setAttribute('class','nail-art-layer');
    layer.setAttribute('viewBox','0 0 1122 1402');
    layer.setAttribute('aria-hidden','true');
    layer.setAttribute('focusable','false');
    const ax=frame.tip[0]-frame.base[0], ay=frame.tip[1]-frame.base[1];
    const length=Math.hypot(ax,ay);
    const wx=-ay/length*frame.width, wy=ax/length*frame.width;
    const angle=Math.atan2(wy,wx)*180/Math.PI;
    marks.forEach((mark,markIndex) => {
      const x=frame.base[0]+wx*mark.x+ax*mark.y;
      const y=frame.base[1]+wy*mark.x+ay*mark.y;
      const kind=mark.kind || 'dot';
      const radius=frame.width*mark.r;
      let shape;
      const transform=`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(angle+(mark.rotation || 0)).toFixed(2)})`;
      if(kind==='french'){
        shape=document.createElementNS(svgNS,'path');
        const edge=1-mark.depth;
        shape.setAttribute('d',`M${-frame.width} ${-(edge-.4)*length} Q0 ${-(edge+.4)*length} ${frame.width} ${-(edge-.4)*length} L${frame.width} ${-1.8*length} L${-frame.width} ${-1.8*length} Z`);
        shape.setAttribute('transform',`translate(${frame.base[0]} ${frame.base[1]}) rotate(${angle.toFixed(2)})`);
      }else if(kind==='stripe'){
        shape=document.createElementNS(svgNS,'rect');
        const width=frame.width*mark.width, height=length*mark.length;
        shape.setAttribute('x',(-width/2).toFixed(2)); shape.setAttribute('y',(-height/2).toFixed(2));
        shape.setAttribute('width',width.toFixed(2)); shape.setAttribute('height',height.toFixed(2));
        shape.setAttribute('transform',transform);
      }else if(kind==='star' || kind==='heart'){
        shape=document.createElementNS(svgNS,'path');
        if(kind==='star'){
          const points=Array.from({length:10},(_,i)=>{
            const a=-Math.PI/2+i*Math.PI/5, r=i%2 ? .44 : 1;
            return `${i ? 'L' : 'M'}${(Math.cos(a)*r).toFixed(5)} ${(Math.sin(a)*r).toFixed(5)}`;
          });
          shape.setAttribute('d',points.join(' ')+' Z');
        }else{
          shape.setAttribute('d','M0 -.48 C-.48 -1.18 -1.24 -.64 -.92 -.02 C-.72 .34 -.22 .72 0 .98 C.22 .72 .72 .34 .92 -.02 C1.24 -.64 .48 -1.18 0 -.48 Z');
        }
        shape.setAttribute('transform',`${transform} scale(${(radius*.92).toFixed(2)} ${radius.toFixed(2)})`);
      }else if(kind==='flower'){
        shape=document.createElementNS(svgNS,'g');
        shape.setAttribute('transform',`${transform} scale(${(radius*.92).toFixed(2)} ${radius.toFixed(2)})`);
        for(let i=0;i<5;i++){
          const a=-Math.PI/2+i*Math.PI*2/5;
          const petal=document.createElementNS(svgNS,'circle');
          petal.setAttribute('cx',(Math.cos(a)*.57).toFixed(5));
          petal.setAttribute('cy',(Math.sin(a)*.57).toFixed(5));
          petal.setAttribute('r','.34');
          shape.append(petal);
        }
        if(mark.centerColor){
          const center=document.createElementNS(svgNS,'circle');
          center.setAttribute('r','.22');
          center.setAttribute('fill',mark.centerColor.hex);
          shape.append(center);
        }
      }else{
        shape=document.createElementNS(svgNS,'ellipse');
        shape.setAttribute('cx',x.toFixed(2)); shape.setAttribute('cy',y.toFixed(2));
        shape.setAttribute('rx',(radius*.92).toFixed(2)); shape.setAttribute('ry',radius.toFixed(2));
        shape.setAttribute('transform',`rotate(${angle.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})`);
      }
      shape.setAttribute('class','nail-art-mark');
      shape.setAttribute('data-kind',kind);
      shape.setAttribute('fill',mark.color.hex);
      if(['metallic','glitter'].includes(mark.color.finish)){
        paintNailArtFinish(layer,shape,mark.color,`art-finish-${index}-${markIndex}`);
      }
      layer.append(shape);
    });
    nail.insertBefore(layer,nail.firstChild);
  });
}

function paintNailArtFinish(layer,shape,color,id){
  const ns='http://www.w3.org/2000/svg';
  const element=(tag,attributes)=>{
    const node=document.createElementNS(ns,tag);
    Object.entries(attributes).forEach(([name,value])=>node.setAttribute(name,value));
    return node;
  };
  const defs=element('defs',{});
  if(color.finish==='glitter'){
    const pattern=element('pattern',{id,patternUnits:'userSpaceOnUse',width:7,height:9});
    pattern.append(element('rect',{width:7,height:9,fill:color.hex}));
    [[1,2,.6,.7],[5,6,.45,.55],[3,8,.35,.4]].forEach(([cx,cy,r,opacity])=>{
      pattern.append(element('circle',{cx,cy,r,fill:'#ffffff',opacity}));
    });
    defs.append(pattern);
  }else{
    const gradient=element('linearGradient',{id,x1:'0%',y1:'0%',x2:'100%',y2:'30%'});
    [[0,darken(color.hex,12)],[.42,lighten(color.hex,45)],[.7,color.hex],[1,darken(color.hex,8)]].forEach(([offset,fill])=>{
      gradient.append(element('stop',{offset,'stop-color':fill}));
    });
    defs.append(gradient);
  }
  layer.append(defs);
  shape.setAttribute('fill',`url(#${id})`);
  shape.setAttribute('data-finish',color.finish);
}

function paintPolishFinishes(combo){
  const ns='http://www.w3.org/2000/svg';
  const element=(tag,attributes)=>{
    const node=document.createElementNS(ns,tag);
    Object.entries(attributes).forEach(([name,value])=>node.setAttribute(name,value));
    return node;
  };
  NAIL_ART_FRAMES.forEach((frame,i)=>{
    const nail=document.getElementById(`n${i+1}`);
    if(!nail) return;
    nail.querySelector('.nail-finish-layer')?.remove();
    const color=combo.nails?.[i];
    if(color?.finish!=='metallic') return;
    const layer=element('svg',{class:'nail-finish-layer',viewBox:'0 0 1122 1402','aria-hidden':'true',focusable:'false'});
    const ax=frame.tip[0]-frame.base[0],ay=frame.tip[1]-frame.base[1],length=Math.hypot(ax,ay);
    const wx=-ay/length*frame.width,wy=ax/length*frame.width;
    const x=frame.base[0]+ax*.5,y=frame.base[1]+ay*.5;
    const gradient=element('linearGradient',{
      id:`polish-metal-${i}`,gradientUnits:'userSpaceOnUse',
      x1:x-wx*.6,y1:y-wy*.6,x2:x+wx*.6,y2:y+wy*.6
    });
    // A soft metallic band follows the individual nail, under the unchanged
    // photographic reflection. A photo-wide gradient barely showed the finish.
    [[0,-20],[.24,-5],[.43,38],[.52,65],[.64,23],[.84,-6],[1,-18]].forEach(([offset,amount])=>{
      gradient.append(element('stop',{offset,'stop-color':shift(color.hex,amount)}));
    });
    const grain=element('pattern',{id:`polish-grain-${i}`,patternUnits:'userSpaceOnUse',width:6,height:7});
    [[1,2,.38,.3],[4,5,.3,.22]].forEach(([cx,cy,r,opacity])=>grain.append(element('circle',{cx,cy,r,opacity,fill:'#ffffff'})));
    const defs=element('defs',{});defs.append(gradient,grain);layer.append(defs);
    layer.append(element('rect',{width:1122,height:1402,fill:`url(#polish-metal-${i})`}));
    layer.append(element('rect',{width:1122,height:1402,fill:`url(#polish-grain-${i})`}));
    nail.insertBefore(layer,nail.firstChild);
  });
}
