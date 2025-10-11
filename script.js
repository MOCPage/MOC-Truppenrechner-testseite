const $ = id => document.getElementById(id);
let state = { totalTroops: 0, marches: 0, zw1: 0, zw2: 0, rows: [] };

const INFO_IMAGES = {
  haustier: "img/Haustier.jpg",
  cyrille: "img/Cyrille.jpg",
  schwadron: "img/schwadron.jpg"
};

function currentLang(){
  const sel = document.getElementById('langSelect');
  const saved = localStorage.getItem('lang');
  return (sel && sel.value) || saved || 'de';
}

document.addEventListener("DOMContentLoaded", () => {
  ['inputTruppen','inputMaersche','inputHaustier','inputCyrille','inputSchwadron'].forEach(id => {
    const el = $(id);
    const v = localStorage.getItem(id);
    if (v !== null) el.value = v;
    el.addEventListener('input', () => localStorage.setItem(id, el.value));
  });

  $('btnCalc').addEventListener('click', onCalc);
  $('btnAdvanced').addEventListener('click', onAdvanced);
  $('btnResetLeft').addEventListener('click', onResetLeft);
  $('btnRecalcRight').addEventListener('click', onRecalcRight);
  $('btnResetRight').addEventListener('click', onResetRight);

  attachInfoBoxes();

  const langSel = document.getElementById('langSelect');
  langSel && langSel.addEventListener('change', () => {
    document.querySelectorAll('.field-row.open').forEach(r => r.classList.remove('open'));
  });

  // Help modal
  const helpBtn = $('helpBtn'), helpModal = $('helpModal'), closeHelp = $('closeHelp');
  if (helpBtn && helpModal && closeHelp) {
    helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
    closeHelp.addEventListener('click', () => helpModal.classList.add('hidden'));
    helpModal.addEventListener('click', e => { if (e.target === helpModal) helpModal.classList.add('hidden'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') helpModal.classList.add('hidden'); });
  }
});

function attachInfoBoxes(){
  document.querySelectorAll('.field-row').forEach(row => {
    const icon = row.querySelector('.info-icon');
    const box  = row.querySelector('.info-box');
    const img  = row.querySelector('.info-img');
    const txt  = row.querySelector('.info-text');
    if (!icon || !box || !txt) return;

    icon.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.field-row.open').forEach(r => { if (r !== row) r.classList.remove('open'); });
      const key = row.dataset.infoKey;
      const infoTexts = (TRANSLATIONS[currentLang()]?.info_texts) || TRANSLATIONS.de.info_texts;
      txt.textContent = infoTexts[key] || '';
      const src = INFO_IMAGES[key];
      if (src) { img.src = src; img.classList.remove('hidden'); }
      else { img.classList.add('hidden'); img.removeAttribute('src'); }
      img.onclick = () => row.classList.remove('open');
      box.addEventListener('click', ev => ev.stopPropagation());
      row.classList.toggle('open');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.field-row')) document.querySelectorAll('.field-row.open').forEach(r => r.classList.remove('open'));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.field-row.open').forEach(r => r.classList.remove('open')); });
}

function onCalc() {
  const t = +$('inputTruppen').value || 0;
  const m = +$('inputMaersche').value || 0;
  const H = +$('inputHaustier').value || 0;
  const C = +$('inputCyrille').value || 0;
  const S = +$('inputSchwadron').value || 0;
  if (!t || !m) return alert((TRANSLATIONS[currentLang()]?.err_inputs)||'Bitte gültige Werte eingeben.');

  Object.assign(state, { totalTroops: t, marches: m, zw1: Math.floor(t/m), zw2: Math.max(1, H+C+S) });
  $('zw1').value = state.zw1.toLocaleString();
  $('zw2').value = state.zw2.toLocaleString();
  $('endResult').value = Math.floor(100 * state.zw1 / state.zw2) + '%';
  $('totalCap').textContent = t.toLocaleString();
}

function onAdvanced() {
  if (!state.totalTroops) return alert((TRANSLATIONS[currentLang()]?.err_first_calc)||'Bitte zuerst links Berechnen drücken.');
  const initPct = Math.floor(100 * state.zw1 / state.zw2);
  state.rows = Array.from({ length: state.marches }, () => ({ percent: initPct, locked: false }));
  $('rightPanel').classList.remove('hidden');
  renderRows();
}

function onResetLeft(){ localStorage.clear(); location.reload(); }

function onRecalcRight() {
  if (!state.totalTroops) return alert((TRANSLATIONS[currentLang()]?.err_first_calc)||'Bitte zuerst links Berechnen drücken.');

  const prev = state.rows || [];
  const totalLocked = prev
    .filter(r => r.locked)
    .reduce((sum, r) => sum + Math.floor(r.percent * state.zw2 / 100), 0);

  const unlockedCount = prev.filter(r => !r.locked).length || state.marches;
  const freePerMarch = Math.floor((state.totalTroops - totalLocked) / Math.max(1, unlockedCount));
  const newPercent = Math.floor(100 * freePerMarch / state.zw2);

  state.rows = Array.from({ length: state.marches }, (_, i) => {
    const old = prev[i] || { locked: false, percent: newPercent };
    return old.locked ? { ...old } : { locked: false, percent: newPercent };
  });

  $('rightPanel').classList.remove('hidden');
  renderRows();
}

function onResetRight(){
  state.rows = [];
  $('rightPanel').classList.add('hidden');
  $('tableBody').innerHTML = `<div class="muted">${(TRANSLATIONS[currentLang()]?.prompt_advanced)||'Drücke „Erweitertes Rechnen“'}</div>`;
  updateTotals();
}

function renderRows() {
  const body = $('tableBody'); body.innerHTML = '';
  state.rows.forEach((r,i)=>{
    const row = document.createElement('div'); row.className='marchRow' + (r.locked ? ' locked' : '');

    const lockCol = document.createElement('div');
    const lock = document.createElement('input'); lock.type='checkbox'; lock.checked=r.locked;
    lock.onchange=()=>{ r.locked=lock.checked; renderRows(); };
    lockCol.appendChild(lock);

    const nameCol = document.createElement('div'); nameCol.textContent = (TRANSLATIONS[currentLang()]?.th_march || 'Marsch') + ' ' + (i+1);

    const pctCol = document.createElement('div');
    const sliderArea = document.createElement('div'); sliderArea.className='sliderArea';
    const minus = document.createElement('button'); minus.textContent='−'; minus.disabled=r.locked; minus.onclick=()=>!r.locked&&onPercentChange(i,r.percent-1);
    const range = document.createElement('input'); range.type='range'; range.min=0; range.max=100; range.value=r.percent; range.disabled=r.locked; range.className='slider';
    range.oninput=()=>!r.locked&&onPercentChange(i,+range.value);
    const plus = document.createElement('button'); plus.textContent='+'; plus.disabled=r.locked; plus.onclick=()=>!r.locked&&onPercentChange(i,r.percent+1);
    sliderArea.append(minus,range,plus); pctCol.append(sliderArea);

    const dispCol = document.createElement('div');
    const disp = document.createElement('div'); disp.className='disp';
    disp.textContent = `${r.percent}% → ${Math.floor(r.percent*state.zw2/100).toLocaleString()} / ${state.zw2.toLocaleString()}`;
    dispCol.append(disp);

    row.append(lockCol,nameCol,pctCol,dispCol);
    body.append(row);
  });
  updateTotals();
}

function onPercentChange(idx,newPct){
  const clamp=v=>Math.max(0,Math.min(100,Math.floor(v)));
  newPct=clamp(newPct);
  let troops=state.rows.map(r=>Math.floor(r.percent*state.zw2/100));
  const target=Math.min(Math.floor(newPct*state.zw2/100),state.zw2);
  let delta=target-troops[idx];
  if(delta===0)return;
  const others=state.rows.map((r,i)=>({i,locked:r.locked})).filter(o=>!o.locked&&o.i!==idx);
  while(delta!==0&&others.length>0){
    for(const o of others){
      if(delta===0)break;
      if(delta>0&&troops[o.i]>0){troops[o.i]--;troops[idx]++;delta--;}
      else if(delta<0&&troops[o.i]<state.zw2){troops[o.i]++;troops[idx]--;delta++;}
    }
    const stuck=others.every(o=>(delta>0&&troops[o.i]===0)||(delta<0&&troops[o.i]===state.zw2));
    if(stuck)break;
  }
  const sum=troops.reduce((a,b)=>a+b,0);
  if(sum>state.totalTroops)troops[idx]-=(sum-state.totalTroops);
  state.rows.forEach((r,i)=>r.percent=Math.floor(100*troops[i]/state.zw2));
  renderRows();
}

function updateTotals(){
  const totalUsed=state.rows.reduce((s,r)=>s+Math.floor(r.percent*state.zw2/100),0);
  $('totalUsed').textContent=totalUsed.toLocaleString();
  $('totalCap').textContent=state.totalTroops.toLocaleString();
}