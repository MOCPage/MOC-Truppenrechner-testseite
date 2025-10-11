const TRANSLATIONS = {
  de:{site_title:'MOC Truppenrechner',
    left_title:'🧮 Basisrechner für gleichmässig verteilte Truppen', right_title:'⚔️ Marschverteilung',
    calc:'Berechnen', advanced:'Erweitertes Rechnen', reset_left:'Zurücksetzen', recalc_right:'Neu berechnen', reset_right:'Zurücksetzen',
    lbl_troops:'Anzahl Truppen', lbl_marches:'Anzahl Märsche', lbl_pet:'Haustier Buff', lbl_cyrille:'Cyrille Buff', lbl_squad:'Schwadronengrösse',
    res_per_march:'Truppen pro Marsch', res_total_squad:'Totale Schwadronengrösse', res_percent:'Endergebnis (%)',
    th_lock:'Sperren', th_march:'Marsch', th_percent:'%', th_count_total:'Anzahl / Total', prompt_advanced:'Drücke „Erweitertes Rechnen“', total_sum_label:'Truppensumme:',
    err_inputs:'Bitte gültige Werte eingeben.', err_first_calc:'Bitte zuerst links Berechnen drücken.',
    help_title:'MOC Truppenrechner – Hilfe',
    help_html:`<p><strong>Ziel:</strong> Der Rechner hilft, Truppen gleichmäßig auf mehrere Märsche zu verteilen und dabei Buffs (z. B. durch Haustier, Cyrille oder Schwadronenbonus) zu berücksichtigen.</p>
      <h3>1️⃣ Basisrechner (linke Seite)</h3>
      <ul>
        <li><strong>Anzahl Truppen:</strong> Gesamtzahl aller verfügbaren Truppen</li>
        <li><strong>Anzahl Märsche:</strong> Wie viele Märsche gleichzeitig möglich sind</li>
        <li><strong>Haustier Buff:</strong> Bonuswert durch das aktive Haustier</li>
        <li><strong>Cyrille Buff:</strong> Bonuswert durch Cyrilles Fähigkeit</li>
        <li><strong>Schwadronengrösse:</strong> Basisgröße einer Schwadron</li>
      </ul>
      <p>Klicke auf ℹ️ neben einem Feld, um eine Infobox mit Bild und Beschreibung zu öffnen. Beim Klick auf das Bild schließt sich die Infobox wieder.</p>
      <p>Drücke <strong>„Berechnen“</strong>, um die Resultate zu sehen: Truppen pro Marsch, totale Schwadronengrösse und prozentuales Verhältnis.</p>
      <h3>2️⃣ Marschverteilung (rechte Seite)</h3>
      <p>Klicke auf <strong>„Erweitertes Rechnen“</strong>, um die rechte Seite zu öffnen.</p>
      <ul>
        <li>Regler mit +/− Buttons pro Marsch</li>
        <li><strong>Sperren</strong> fixiert einen Marsch</li>
        <li><strong>Neu berechnen</strong> ändert nur ungesperrte Märsche</li>
      </ul>
      <h3>3️⃣ Sprache & Speicherung</h3>
      <ul><li>Deutsch/Englisch/Französisch/Italienisch/Türkisch/Arabisch</li><li>Eingaben werden automatisch gespeichert</li></ul>`,
    info_texts:{truppen:'Gesamtzahl aller verfügbaren Truppen', maersche:'Anzahl der gleichzeitig möglichen Märsche', haustier:'Bonus durch das aktive Haustier',
      cyrille:'Bonus durch Cyrilles Fähigkeit', schwadron:'Basisgröße einer Schwadron'}
  },
  en:{site_title:'MOC Troop Calculator',
    left_title:'🧮 Basic calculator for evenly distributed troops', right_title:'⚔️ March distribution',
    calc:'Calculate', advanced:'Advanced Calculation', reset_left:'Reset', recalc_right:'Recalculate', reset_right:'Reset',
    lbl_troops:'Total troops', lbl_marches:'Number of marches', lbl_pet:'Pet buff', lbl_cyrille:'Cyrille buff', lbl_squad:'Squadron size',
    res_per_march:'Troops per march', res_total_squad:'Total squadron size', res_percent:'Final result (%)',
    th_lock:'Lock', th_march:'March', th_percent:'%', th_count_total:'Count / Total', prompt_advanced:'Press “Advanced Calculation”', total_sum_label:'Troop sum:',
    err_inputs:'Please enter valid values.', err_first_calc:'Please calculate on the left first.',
    help_title:'MOC Troop Calculator – Help',
    help_html:`<p><strong>Goal:</strong> Distribute troops evenly across marches and consider buffs (Pet, Cyrille, Squadron).</p>
      <h3>1️⃣ Basic calculator (left)</h3>
      <ul>
        <li><strong>Total troops</strong></li><li><strong>Number of marches</strong></li>
        <li><strong>Pet buff</strong></li><li><strong>Cyrille buff</strong></li><li><strong>Squadron size</strong></li>
      </ul>
      <p>Click ℹ️ to open an info box with image & text. Click the image to close.</p>
      <p>Press <strong>“Calculate”</strong> to see results.</p>
      <h3>2️⃣ March distribution (right)</h3>
      <ul><li>Slider with +/− per march</li><li><strong>Lock</strong> fixes a march</li><li><strong>Recalculate</strong> changes only unlocked marches</li></ul>
      <h3>3️⃣ Language & saving</h3><ul><li>DE/EN/FR/IT/TR/AR</li><li>Inputs are saved automatically</li></ul>`,
    info_texts:{truppen:'Total number of available troops', maersche:'Number of simultaneous marches', haustier:'Bonus from the active pet',
      cyrille:'Bonus from Cyrille’s skill', schwadron:'Base size of a squadron'}
  },
  fr:{site_title:'Calculateur de troupes MOC',
    left_title:'🧮 Calcul de base pour une répartition uniforme', right_title:'⚔️ Répartition des marches',
    calc:'Calculer', advanced:'Calcul avancé', reset_left:'Réinitialiser', recalc_right:'Recalculer', reset_right:'Réinitialiser',
    lbl_troops:'Nombre total de troupes', lbl_marches:'Nombre de marches', lbl_pet:'Bonus familier', lbl_cyrille:'Bonus Cyrille', lbl_squad:'Taille d’escadron',
    res_per_march:'Troupes par marche', res_total_squad:'Taille totale d’escadron', res_percent:'Résultat final (%)',
    th_lock:'Verrou', th_march:'Marche', th_percent:'%', th_count_total:'Nombre / Total', prompt_advanced:'Appuyez sur « Calcul avancé »', total_sum_label:'Total de troupes :',
    err_inputs:'Veuillez saisir des valeurs valides.', err_first_calc:'Veuillez d’abord calculer à gauche.',
    help_title:'Aide – Calculateur de troupes MOC',
    help_html:`<p><strong>Objectif :</strong> Répartir les troupes entre les marches en tenant compte des bonus (familier, Cyrille, escadron).</p>
      <h3>1️⃣ Calcul de base (gauche)</h3>
      <ul><li>Troupes totales</li><li>Nombre de marches</li><li>Bonus familier</li><li>Bonus Cyrille</li><li>Taille d’escadron</li></ul>
      <p>Cliquez sur ℹ️ pour ouvrir une infobox avec image et texte. Cliquez sur l’image pour fermer.</p>
      <h3>2️⃣ Répartition (droite)</h3>
      <ul><li>Curseur avec +/−</li><li><strong>Verrouiller</strong> fige une marche</li><li><strong>Recalculer</strong> ne modifie que les marches déverrouillées</li></ul>
      <h3>3️⃣ Langue & sauvegarde</h3><ul><li>DE/EN/FR/IT/TR/AR</li><li>Saisie sauvegardée automatiquement</li></ul>`,
    info_texts:{truppen:'Nombre total de troupes disponibles', maersche:'Nombre de marches simultanées', haustier:'Bonus du familier actif',
      cyrille:'Bonus de la compétence de Cyrille', schwadron:'Taille de base d’un escadron'}
  },
  it:{site_title:'Calcolatore truppe MOC',
    left_title:'🧮 Calcolatore base per distribuzione uniforme', right_title:'⚔️ Distribuzione marce',
    calc:'Calcola', advanced:'Calcolo avanzato', reset_left:'Reimposta', recalc_right:'Ricalcola', reset_right:'Reimposta',
    lbl_troops:'Totale truppe', lbl_marches:'Numero di marce', lbl_pet:'Bonus animale', lbl_cyrille:'Bonus Cyrille', lbl_squad:'Dimensione squadrone',
    res_per_march:'Truppe per marcia', res_total_squad:'Dimensione totale squadrone', res_percent:'Risultato finale (%)',
    th_lock:'Blocca', th_march:'Marcia', th_percent:'%', th_count_total:'Quantità / Totale', prompt_advanced:'Premi “Calcolo avanzato”', total_sum_label:'Totale truppe:',
    err_inputs:'Inserisci valori validi.', err_first_calc:'Calcola prima sulla sinistra.',
    help_title:'Aiuto – Calcolatore truppe MOC',
    help_html:`<p><strong>Obiettivo:</strong> Distribuire le truppe tra le marce considerando i bonus (animale, Cyrille, squadrone).</p>
      <h3>1️⃣ Calcolatore base (sinistra)</h3>
      <ul><li>Truppe totali</li><li>Numero di marce</li><li>Bonus animale</li><li>Bonus Cyrille</li><li>Dimensione squadrone</li></ul>
      <p>Clic su ℹ️ per aprire l’infobox con immagine e testo. Clic sull’immagine per chiudere.</p>`,
    info_texts:{truppen:'Numero totale di truppe disponibili', maersche:'Numero di marce simultanee', haustier:'Bonus dall’animale attivo',
      cyrille:'Bonus dall’abilità di Cyrille', schwadron:'Dimensione base di uno squadrone'}
  },
  tr:{site_title:'MOC Asker Hesaplayıcı',
    left_title:'🧮 Eşit dağıtım için temel hesaplayıcı', right_title:'⚔️ Sefer dağılımı',
    calc:'Hesapla', advanced:'Gelişmiş hesaplama', reset_left:'Sıfırla', recalc_right:'Yeniden hesapla', reset_right:'Sıfırla',
    lbl_troops:'Toplam asker', lbl_marches:'Sefer sayısı', lbl_pet:'Evcil hayvan desteği', lbl_cyrille:'Cyrille desteği', lbl_squad:'Filo büyüklüğü',
    res_per_march:'Sefer başına asker', res_total_squad:'Toplam filo büyüklüğü', res_percent:'Nihai sonuç (%)',
    th_lock:'Kilitle', th_march:'Sefer', th_percent:'%', th_count_total:'Adet / Toplam', prompt_advanced:'“Gelişmiş hesaplama”ya basın', total_sum_label:'Asker toplamı:',
    err_inputs:'Lütfen geçerli değerler girin.', err_first_calc:'Önce solda hesaplayın.',
    help_title:'Yardım – MOC Asker Hesaplayıcı',
    help_html:`<p><strong>Amaç:</strong> Askerleri seferlere dağıtmak ve destekleri dikkate almak (evcil hayvan, Cyrille, filo).</p>`,
    info_texts:{truppen:'Mevcut toplam asker sayısı', maersche:'Aynı anda yapılabilecek sefer sayısı', haustier:'Aktif evcil hayvandan gelen destek',
      cyrille:'Cyrille yeteneğinden destek', schwadron:'Bir filonun temel büyüklüğü'}
  },
  ar:{site_title:'حاسبة قوات MOC',
    left_title:'🧮 حاسبة أساسية لتوزيع متساوٍ للقوات', right_title:'⚔️ توزيع المسيرات',
    calc:'احسب', advanced:'حساب متقدّم', reset_left:'إعادة ضبط', recalc_right:'إعادة حساب', reset_right:'إعادة ضبط',
    lbl_troops:'إجمالي القوات', lbl_marches:'عدد المسيرات', lbl_pet:'تعزيز الحيوان الأليف', lbl_cyrille:'تعزيز سيريل', lbl_squad:'حجم السرب',
    res_per_march:'قوات لكل مسيرة', res_total_squad:'إجمالي حجم السرب', res_percent:'النتيجة النهائية (%)',
    th_lock:'قفل', th_march:'مسيرة', th_percent:'%', th_count_total:'عدد / الإجمالي', prompt_advanced:'اضغط "حساب متقدّم"', total_sum_label:'مجموع القوات:',
    err_inputs:'يرجى إدخال قيم صحيحة.', err_first_calc:'يرجى الحساب أولاً في اليسار.',
    help_title:'مساعدة – حاسبة قوات MOC',
    help_html:`<p><strong>الهدف:</strong> توزيع القوات على المسيرات مع احتساب التعزيزات (الحيوان الأليف، سيريل، السرب).</p>`,
    info_texts:{truppen:'إجمالي عدد القوات المتاحة', maersche:'عدد المسيرات المتزامنة', haustier:'تعزيز من الحيوان الأليف النشط',
      cyrille:'تعزيز من مهارة سيريل', schwadron:'الحجم الأساسي للسرب'}
  }
};

document.addEventListener('DOMContentLoaded',()=>{
  const sel=document.getElementById('langSelect');
  function setLeadingText(el, text){
    let tn = Array.from(el.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);
    if(tn){ tn.nodeValue = text + ' '; }
    else{ el.insertBefore(document.createTextNode(text + ' '), el.firstChild); }
  }
  function apply(l){
    const m=TRANSLATIONS[l]||TRANSLATIONS.de;
    document.documentElement.lang = l;
    document.documentElement.setAttribute('dir', l==='ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.dataset.i18n;
      if(!m[k]) return;
      if(el.tagName==='LABEL'||el.querySelector('.info-icon')) setLeadingText(el,m[k]);
      else el.textContent=m[k];
    });

    // Inject help HTML content
    const helpText = document.getElementById('helpText');
    if (helpText && m.help_html) helpText.innerHTML = m.help_html;

    document.title=m.site_title;
    localStorage.setItem('lang',l);
    sel.value=l;
  }
  let lang=localStorage.getItem('lang');
  if(!lang){
    const br=(navigator.language||'de').slice(0,2).toLowerCase();
    lang=TRANSLATIONS[br]?br:'de';
  }
  apply(lang);
  sel.addEventListener('change',()=>apply(sel.value));
});