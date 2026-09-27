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
    : look.nails.map((color,i)=>({area:NAIL_ART_FINGERS[i],text:`${color.he}, חלק`}));
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
  const rgb=hex=>hex.slice(1).match(/../g).map(value=>parseInt(value,16));
  const baseRgb=rgb(base.hex);
  // Whole hands can use two light colors. Require visible color separation,
  // without the luminance-contrast rule needed for tiny decorative marks.
  const distinct=color=>regularColor(color) && color.id!==base.id &&
    Math.hypot(...rgb(color.hex).map((channel,i)=>channel-baseRgb[i]))>=75;
  return Math.random()<.5 ? pickCompatible(base,distinct) : pickColorWeighted(distinct);
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
    lookName:combo.name,styleLabel:'נייל ארט משלים בשתי הידיים'
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
