'use strict';

function singleHandPattern(look){
  return (look.nails || []).map(c=>`${c.id}:${polishKind(c)}`).join('|') + nailArtPattern(look);
}

function manicurePattern(combo){
  if(!combo.hands) return singleHandPattern(combo);
  return `left:${singleHandPattern(combo.hands.left)}|right:${singleHandPattern(combo.hands.right)}`;
}

function colorsInHand(look){
  const colors=[...look.nails,...(look.art || []).flat().flatMap(mark=>[mark.color,mark.centerColor].filter(Boolean))];
  return [...new Map(colors.map(color=>[color.id,color])).values()];
}

function handInstructions(look){
  if(!look.art?.some(marks=>marks?.length) && new Set(look.nails.map(color=>color.id)).size===1){
    return [{area:'כל חמש הציפורניים',text:`${look.nails[0].he}, לק אחיד ללא קישוטים`}];
  }
  return look.art?.some(marks=>marks?.length)
    ? nailArtInstructions(look.nails,look.art)
    : look.nails.map((color,i)=>({area:NAIL_ART_FINGERS[i],text:`${color.he}${color.finish && !color.he.includes(polishKind(color)) ? ` · ${polishKind(color)}` : ''}, ללא קישוט`}));
}

function makePairedCombo(left,right,metadata){
  const hands={left:{...left,instructions:handInstructions(left)},right:{...right,instructions:handInstructions(right)}};
  const colors=[...new Map([...colorsInHand(left),...colorsInHand(right)].map(c=>[c.id,c])).values()];
  return makeCombo({...metadata,hands,colors,nails:left.nails,art:left.art,instructions:hands.left.instructions});
}

function twoHandsCombo(mode=pick(['solid','palette']),anchorColor=null){
  const base=anchorColor && regularColor(anchorColor) ? anchorColor : pickColorWeighted(regularColor);
  const second=mode==='solid' ? pickPlainHandColor(base) : pickNailArtColor(base);
  let left,right;
  if(mode==='palette'){
    const third=pickNailArtColor(base,[second.id]);
    left={nails:[base,second,third,second,base]};
    right={nails:[second,third,base,third,second]};
  }else{
    left={nails:Array(5).fill(base)};
    right={nails:Array(5).fill(second)};
  }
  return makePairedCombo(left,right,{
    type:'twoHands',pairStyle:mode,
    lookName:mode==='palette' ? 'אותם צבעים, קצב אחר' : 'כל יד בצבע שלה',
    styleLabel:mode==='palette' ? 'שלושה גוונים בחלוקה שונה' : 'שני צבעים · לק אחיד בכל יד'
  });
}

function pickPlainHandColor(base){
  // Whole hands can use two light colors. Require visible color separation,
  // without the luminance-contrast rule needed for tiny decorative marks.
  const distinct=color=>regularColor(color) && color.id!==base.id &&
    polishColorDistance(base,color)>=75;
  return Math.random()<.5 ? pickCompatible(base,distinct) : pickColorWeighted(distinct);
}

function polishColorDistance(a,b){
  const rgb=hex=>hex.slice(1).match(/../g).map(value=>parseInt(value,16));
  const first=rgb(a.hex);
  return Math.hypot(...rgb(b.hex).map((channel,i)=>channel-first[i]));
}

function richPaletteCombo(shimmer=false,anchorColor=null,options={}){
  const eligible=shimmer ? c=>c.finish==='metallic' : regularColor;
  const base=anchorColor && eligible(anchorColor) ? anchorColor : pickColorWeighted(eligible);
  const count=options.count===4 || options.count===5 ? options.count : pick([4,5]);
  const variant=options.variant ?? Math.floor(Math.random()*5);
  const colors=[base];
  while(colors.length<count){
    const distinct=c=>eligible(c) && colors.every(other=>other.id!==c.id && polishColorDistance(other,c)>=65);
    const newFamily=c=>distinct(c) && colors.every(other=>other.family!==c.family);
    const vivid=c=>{
      const rgb=c.hex.slice(1).match(/../g).map(v=>parseInt(v,16));
      return Math.max(...rgb)-Math.min(...rgb)>=70;
    };
    const vividFamily=c=>newFamily(c) && vivid(c);
    const filter=!shimmer && vivid(base) && colorList().some(vividFamily) ? vividFamily : colorList().some(newFamily) ? newFamily : colorList().some(distinct) ? distinct : c=>eligible(c) && !colors.some(other=>other.id===c.id);
    // Rich palettes can cross the original neighboring-family rules, allowing
    // red, green, yellow and purple together, with fresh shades each time.
    colors.push(Math.random()<.65 ? pickColorWeighted(filter) : pickCompatible(base,filter));
  }
  const left={nails:Array.from({length:5},(_,i)=>colors[(i+variant)%count])};
  const order=[2,4,1,0,3];
  const right={nails:order.map(i=>left.nails[i])};
  return makePairedCombo(left,right,{
    type:'twoHands',pairStyle:shimmer ? 'palette-shimmer' : 'palette-rich',
    lookName:shimmer ? 'צבעים באור אחר' : 'פלטה בשתי ידיים',
    styleLabel:`${count===4 ? 'ארבעה' : 'חמישה'} גוונים${shimmer ? ' מטאליים' : ''} · חלוקה שונה בכל יד`
  });
}

function pairNailArtHands(combo){
  const left={nails:combo.nails,art:combo.art};
  let right;
  if(combo.colors.length===2){
    const [a,b]=combo.colors;
    const swap=color=>color.id===a.id ? b : a;
    right={
      nails:left.nails.map(swap),
      art:left.art.map(marks=>marks.map(mark=>({...mark,color:swap(mark.color),...(mark.centerColor ? {centerColor:swap(mark.centerColor)} : {})})))
    };
  }else{
    // Keep each decoration attached to its base when changing the finger order.
    const order=[2,3,4,0,1];
    right={nails:order.map(i=>left.nails[i]),art:order.map(i=>left.art[i].map(mark=>({...mark})))};
  }
  if(singleHandPattern(left)===singleHandPattern(right)) return combo;
  return makePairedCombo(left,right,{
    type:'nailArt',pairStyle:'art',artTemplate:combo.artTemplate,
    dotSize:combo.dotSize,
    lookName:combo.name,styleLabel:`נייל ארט משלים בשתי הידיים${combo.dotSize ? ` · נקודות ${combo.dotSize==='large' ? 'גדולות' : 'קטנות'}` : ''}`
  });
}

function visibleHand(combo){
  return combo.hands?.[state.previewHand==='right' ? 'right' : 'left'] || combo;
}

function renderHandSwitch(combo){
  const paired=Boolean(combo.hands);
  $('handSwitch').hidden=!paired;
  document.querySelector('.polish-card').classList.toggle('has-paired-hands',paired);
  document.querySelector('.photo-manicure').classList.toggle('right-hand',paired && state.previewHand==='right');
  $('instructionsHeading').textContent=paired ? `איך למרוח · יד ${state.previewHand==='right' ? 'ימין' : 'שמאל'}` : 'איך למרוח · שתי הידיים';
  document.querySelectorAll('[data-hand]').forEach(button=>{
    const side=button.dataset.hand;
    const selected=side===(state.previewHand==='right' ? 'right' : 'left');
    button.setAttribute('aria-pressed',String(selected));
    const preview=button.querySelector('.hand-swatches');
    preview.replaceChildren();
    if(paired) combo.hands[side].nails.forEach(color=>{
      const dot=document.createElement('span');
      dot.style.backgroundColor=color.hex;
      preview.append(dot);
    });
  });
  document.querySelector('.manicure-photo').alt=paired ? `תצוגת יד ${state.previewHand==='right' ? 'ימין' : 'שמאל'}` : 'אותו לוק בשתי הידיים';
}

function bindHandSwitch(){
  document.querySelectorAll('[data-hand]').forEach(button=>button.addEventListener('click',()=>{
    if(!state.current.hands) return;
    state.previewHand=button.dataset.hand;
    renderHome();
    persist();
  }));
}
