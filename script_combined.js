const $ = id => document.getElementById(id);

// Left
const inputTruppen = $('inputTruppen');
const inputMaersche = $('inputMaersche');
const inputHaustier = $('inputHaustier');
const inputCyrille = $('inputCyrille');
const inputSchwadron = $('inputSchwadron');
const zw1El = $('zw1');
const zw2El = $('zw2');
const endResultEl = $('endResult');
const btnCalc = $('btnCalc');
const btnAdvanced = $('btnAdvanced');
const btnResetLeft = $('btnResetLeft');

// Right
const rightPanel = $('rightPanel');
const tableBody = $('tableBody');
const btnRecalc = $('btnRecalc');
const btnReset = $('btnReset');
const totalUsedEl = $('totalUsed');
const totalCapEl = $('totalCap');

// Info popup
const infoPopup = $('infoPopup');
const infoContent = $('infoContent');
const infoImage = $('infoImage');
const closeInfo = $('closeInfo');

let state = { totalTroops:0, marches:0, zw1:0, zw2:0, rows:[] };

// Info buttons → popup toggles
document.addEventListener('click', (e)=>{
  if(e.target.classList && e.target.classList.contains('info-btn')){
    openInfo(e.target.getAttribute('data-info'));
  } else if(e.target.id === 'closeInfo' || e.target.id === 'infoPopup'){
    infoPopup.classList.add('hidden'); infoPopup.setAttribute('aria-hidden','true');
  }
});
function openInfo(id){
  const texts = {
    truppen: '<strong>Anzahl Truppen</strong><p>Gib hier deine Anzahl an Bogenschützen an.</p>',
    maersche: '<strong>Anzahl Märsche</strong><p>Gib hier die Anzahl Märsche ein. Das Feld bleibt standardmässig leer.</p>',
    haustier: '<strong>Haustier</strong><p>Trage den rot markierten Bereich ein.</p>',
    cyrille: '<strong>Cyrille</strong><p>Trage den rot markierten Bereich ein.</p>',
    schwadron: '<strong>Schwadron</strong><p>Trage deine Schwadronengrösse ein. Wichtig: du hast noch keine Buffs aktiv.</p>'
  };
  infoContent.innerHTML = texts[id] || '';
  infoImage.src = 'img/' + (id === 'cyrille' ? 'Cyrille.jpg' : id === 'haustier' ? 'Haustier.jpg' : 'schwadron.jpg');
  infoImage.style.display = 'block';
  infoPopup.classList.remove('hidden');
  infoPopup.setAttribute('aria-hidden','false');

// 🆕 Auto-Info bei Fokus auf Eingabefeldern (Basisrechner)
[
  ['inputTruppen', 'truppen'],
  ['inputMaersche', 'maersche'],
  ['inputHaustier', 'haustier'],
  ['inputCyrille', 'cyrille'],
  ['inputSchwadron', 'schwadron']
].forEach(([id, key]) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('focus', () => openInfo(key));
  el.addEventListener('blur', () => {
    infoPopup.classList.add('hidden');
    infoPopup.setAttribute('aria-hidden', 'true');
  });
});

}

// Left calc
btnCalc.addEventListener('click', ()=>{
  const t = Math.max(0, Math.floor(Number(inputTruppen.value) || 0));
  const m = Math.max(0, Math.floor(Number(inputMaersche.value) || 0));
  const H = Math.max(0, Math.floor(Number(inputHaustier.value) || 0));
  const C = Math.max(0, Math.floor(Number(inputCyrille.value) || 0));
  const S = Math.max(0, Math.floor(Number(inputSchwadron.value) || 0));
  if(t<=0 || m<=0){ alert('Bitte Anzahl Truppen und Anzahl Märsche ausfüllen.'); return; }

  state.totalTroops = t;
  state.marches = m;
  state.zw1 = Math.floor(t / m);
  state.zw2 = Math.max(1, H + C + S);

  zw1El.value = state.zw1;
  zw2El.value = state.zw2;
  endResultEl.value = Math.floor((100 * state.zw1) / state.zw2) + '%';
  totalCapEl.textContent = state.totalTroops;
});

// Left reset
btnResetLeft.addEventListener('click', ()=>{
  inputTruppen.value = '';
  inputMaersche.value = '';
  inputHaustier.value = '';
  inputCyrille.value = '';
  inputSchwadron.value = '';
  zw1El.value = '';
  zw2El.value = '';
  endResultEl.value = '';
  state = { totalTroops:0, marches:0, zw1:0, zw2:0, rows:[] };
  tableBody.innerHTML = '<div class="muted">Drücke "Erweitertes Rechnen", um die Verteilung zu erzeugen.</div>';
  totalUsedEl.textContent = '0';
  totalCapEl.textContent = '0';
  rightPanel.classList.add('hidden');
  rightPanel.setAttribute('aria-hidden','true');
});

// Advanced
btnAdvanced.addEventListener('click', ()=>{
  if(state.totalTroops<=0 || state.marches<=0){ alert('Bitte zuerst links Berechnen drücken.'); return; }
  buildRows();
  rightPanel.classList.remove('hidden');
  rightPanel.setAttribute('aria-hidden','false');
});

function buildRows(){
  state.rows = [];
  const initPct = Math.floor((100 * state.zw1) / state.zw2);
  for(let i=0;i<state.marches;i++){
    state.rows.push({ percent: initPct, locked: false });
  }
  renderRows();
  updateTotals();
}

function renderRows(){
  tableBody.innerHTML = '';
  state.rows.forEach((r, idx)=>{
    const row = document.createElement('div'); row.className = 'marchRow';
    if(!r.locked) row.classList.add('active'); else row.classList.add('locked');

    // Lock column (Marsch speichern)
    const lockCol = document.createElement('div'); lockCol.className='lockcol';
    const chk = document.createElement('input'); chk.type='checkbox'; chk.checked = r.locked;
    chk.addEventListener('change', ()=>{ r.locked = chk.checked; renderRows(); });
    lockCol.appendChild(chk);

    // Name
    const nameCol = document.createElement('div'); nameCol.className='namecol'; nameCol.textContent = 'Marsch ' + (idx+1);

    // Percent column
    const pctCol = document.createElement('div'); pctCol.className='pctcol';
    const pctInput = document.createElement('input'); pctInput.type='number'; pctInput.className='pctInput'; pctInput.min=0; pctInput.max=100; pctInput.value=r.percent;
    if(r.locked) pctInput.disabled = true;
    pctInput.addEventListener('input', ()=>{ if(r.locked) return; onPercentChangeRealtime(idx, Math.floor(Number(pctInput.value)||0)); });
    pctCol.appendChild(pctInput);

    // Control column (value + slider + buttons)
    const controlCol = document.createElement('div'); controlCol.className='controlcol';
    const troopsPer = Math.floor(r.percent * state.zw2 / 100);
    const valueDisplay = document.createElement('div'); valueDisplay.style.textAlign='right'; valueDisplay.style.color='var(--muted)'; valueDisplay.textContent = `${troopsPer} / ${state.zw2}`;
    const controls = document.createElement('div'); controls.style.display='flex'; controls.style.alignItems='center'; controls.style.gap='8px';
    const btnMinus = document.createElement('button'); btnMinus.textContent='-'; btnMinus.className='btn';
    const slider = document.createElement('input'); slider.type='range'; slider.className='smallSlider'; slider.min=0; slider.max=100; slider.value=r.percent;
    const btnPlus = document.createElement('button'); btnPlus.textContent='+'; btnPlus.className='btn';
    if(r.locked){ btnMinus.disabled=true; btnPlus.disabled=true; slider.disabled=true; }
    btnMinus.addEventListener('click', ()=>{ if(r.locked) return; onPercentChangeRealtime(idx, Math.max(0, r.percent-1)); });
    btnPlus.addEventListener('click', ()=>{ if(r.locked) return; const newTarget = r.percent + 1; onPercentChangeRealtime(idx, newTarget); });
    slider.addEventListener('input', ()=>{ if(r.locked) return; onPercentChangeRealtime(idx, Math.floor(Number(slider.value))); });
    controls.appendChild(btnMinus); controls.appendChild(slider); controls.appendChild(btnPlus);
    controlCol.appendChild(valueDisplay); controlCol.appendChild(controls);

    row.appendChild(lockCol); row.appendChild(nameCol); row.appendChild(pctCol); row.appendChild(controlCol);
    tableBody.appendChild(row);
  });
  updateTotals();
}

// Pulse helper (2s)
function pulseRows(indices){
  const rows = [...tableBody.querySelectorAll('.marchRow')];
  indices.forEach(i=>{
    const el = rows[i];
    if(!el) return;
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse');
    setTimeout(()=> el.classList.remove('pulse'), 2000);
  });
}

// Realtime auto-balance (never exceed totalTroops; per row max = zw2)
function onPercentChangeRealtime(idx, newPct){
  newPct = Math.max(0, Math.min(100, Math.floor(newPct)));
  let troops = state.rows.map(r => Math.floor(r.percent * state.zw2 / 100));
  const currentUsed = troops.reduce((a,b)=>a+b,0);
  const newVal = Math.min(Math.floor(newPct * state.zw2 / 100), state.zw2);
  const delta = newVal - troops[idx];
  if(delta === 0){ state.rows[idx].percent = newPct; renderRows(); return; }

  const affected = new Set();

  if(delta > 0){
    // try global free capacity first
    let freeGlobal = Math.max(0, state.totalTroops - currentUsed);
    let take = Math.min(delta, freeGlobal);
    troops[idx] += take;
    let still = delta - take;

    // then pull proportionally from other UNLOCKED rows
    if(still > 0){
      const others = troops.map((t,i)=>({i,t,locked:state.rows[i].locked}))
        .filter(o=> o.i !== idx && !o.locked && o.t > 0);
      let pool = others.reduce((s,o)=> s + o.t, 0);
      if(pool > 0){
        others.forEach(o=>{
          const share = Math.floor((o.t / pool) * still);
          const real = Math.min(share, o.t);
          troops[o.i] -= real; troops[idx] += real;
          if(real>0) affected.add(o.i);
          still -= real;
        });
        if(still > 0){
          others.sort((a,b)=> b.t - a.t);
          for(let k=0;k<others.length && still>0;k++){
            const i2 = others[k].i;
            const can = Math.max(0, troops[i2]);
            const real = Math.min(can, still);
            troops[i2] -= real; troops[idx] += real;
            if(real>0) affected.add(i2);
            still -= real;
          }
        }
      }
    }
  } else {
    // decrease → distribute to other UNLOCKED rows (respect per-row cap and global cap)
    troops[idx] = newVal;
    let free = -delta;

    const others = troops.map((t,i)=>({i,t,locked:state.rows[i].locked}))
      .filter(o=> o.i !== idx && !o.locked);
    let caps = others.map(o=> ({i:o.i, cap: Math.max(0, state.zw2 - troops[o.i])}));
    let capSum = caps.reduce((s,c)=> s + c.cap, 0);
    let canAddGlobal = Math.max(0, state.totalTroops - troops.reduce((a,b)=>a+b,0));
    let toDistribute = Math.min(free, capSum, canAddGlobal + free);

    if(toDistribute > 0 && capSum > 0){
      caps.forEach(c=>{
        const share = Math.floor((c.cap / capSum) * toDistribute);
        troops[c.i] += share; if(share>0) affected.add(c.i);
        toDistribute -= share;
      });
      const order = caps.map(c=>c.i);
      let it=0;
      while(toDistribute > 0 && order.length>0){
        const i2 = order[it % order.length];
        const capLeft = Math.max(0, state.zw2 - troops[i2]);
        if(capLeft>0){ troops[i2]+=1; affected.add(i2); toDistribute-=1; }
        it++;
      }
    }
  }

  // global cap enforcement due to rounding
  let sumNow = troops.reduce((a,b)=>a+b,0);
  if(sumNow > state.totalTroops){
    let over = sumNow - state.totalTroops;
    const others = troops.map((t,i)=>({i,t,locked:state.rows[i].locked}))
      .filter(o=> !o.locked && o.i !== idx);
    others.sort((a,b)=> b.t - a.t);
    for(let k=0;k<others.length && over>0;k++){
      const i2 = others[k].i;
      const take = Math.min(over, troops[i2]);
      troops[i2] -= take; over -= take; affected.add(i2);
    }
  }

  // write back (% rounded down)
  state.rows.forEach((r,i)=>{
    r.percent = Math.floor((troops[i] / state.zw2) * 100);
  });
  renderRows();
  pulseRows([...affected]);
}

function updateTotals(){
  const totalUsed = state.rows.reduce((s,r)=> s + Math.floor(r.percent*state.zw2/100), 0);
  totalUsedEl.textContent = totalUsed;
  totalCapEl.textContent = state.totalTroops;
}

// Even redistribution among unlocked
btnRecalc.addEventListener('click', ()=>{
  const lockedTroops = state.rows.reduce((s,r)=> s + (r.locked ? Math.floor(r.percent*state.zw2/100) : 0), 0);
  let available = Math.max(0, state.totalTroops - lockedTroops);
  const unlocked = state.rows.map((r,i)=> r.locked? -1 : i).filter(i=> i>=0);
  if(unlocked.length === 0){ renderRows(); return; }

  let base = Math.min(state.zw2, Math.floor(available / unlocked.length));
  let troops = state.rows.map(r => Math.floor(r.percent*state.zw2/100));
  unlocked.forEach(i=> troops[i] = base);

  let used = unlocked.reduce((s,i)=> s + troops[i], 0);
  let rem = Math.max(0, available - used);
  let k=0;
  while(rem>0 && k<unlocked.length){
    const i = unlocked[k];
    const capLeft = Math.max(0, state.zw2 - troops[i]);
    const add = Math.min(rem, capLeft);
    troops[i] += add; rem -= add; k = (k+1) % unlocked.length;
  }

  state.rows.forEach((r,i)=>{ if(!r.locked){ r.percent = Math.floor((troops[i] / state.zw2) * 100); } });
  renderRows();
});

btnReset.addEventListener('click', ()=>{
  state.rows.forEach(r=> { if(!r.locked) r.percent = 0; });
  renderRows();
});

// init placeholder
tableBody.innerHTML = '<div class="muted" data-i18n="press_calc">Drücke "Erweitertes Rechnen", um die Verteilung zu erzeugen.</div>';
