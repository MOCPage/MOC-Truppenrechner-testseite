const TRANSLATIONS = {
  de: { site_title:"MOC Truppenrechner", left_title:"🧮 Basisrechner für gleichmässig verteilte Truppen",
        right_title:"⚔️ Marschverteilung bei ungleichmässig verteilten Truppen", label_truppen:"Anzahl Truppen",
        label_maersche:"Anzahl Märsche", label_haustier:"Haustier Buff", label_cyrille:"Cyrille Buff",
        label_schwadron:"Schwadronengrösse", zw1:"Anzahl Truppen pro Marsch", zw2:"Totale Schwadronengrösse",
        endresult:"Endergebnis (%)", btn_calc:"Berechnen", btn_advanced:"Erweitertes Rechnen",
        btn_reset_left:"Zurücksetzen", press_calc:"Drücke \"Erweitertes Rechnen\", um die Verteilung zu erzeugen.",
        col_marsch:"Marsch", col_pct:"% vom Endergebnis", col_control:"Anzahl pro Marsch / Total", col_fix:"Marsch speichern",
        btn_recalc:"Neu berechnen", btn_reset:"Werte zurücksetzen" },
  en: { site_title:"MOC Troop Calculator", left_title:"🧮 Base calculator for evenly distributed troops",
        right_title:"⚔️ March distribution for unevenly distributed troops", label_truppen:"Total troops",
        label_maersche:"Number of marches", label_haustier:"Pet Buff", label_cyrille:"Cyrille Buff",
        label_schwadron:"Squadron size", zw1:"Troops per march", zw2:"Total squadron size",
        endresult:"Result (%)", btn_calc:"Calculate", btn_advanced:"Advanced calculate",
        btn_reset_left:"Reset", press_calc:"Press \"Advanced calculate\" to generate the distribution.",
        col_marsch:"March", col_pct:"% of result", col_control:"Troops per march / Total", col_fix:"Save march",
        btn_recalc:"Recalculate", btn_reset:"Reset values" },
  fr: { site_title:"Calculateur de troupes MOC", left_title:"🧮 Calculateur de base pour troupes réparties également",
        right_title:"⚔️ Répartition des marches pour troupes réparties inégalement", label_truppen:"Nombre de troupes",
        label_maersche:"Nombre de marches", label_haustier:"Bonus animal", label_cyrille:"Bonus Cyrille",
        label_schwadron:"Taille d'escadron", zw1:"Troupes par marche", zw2:"Taille totale de l'escadron",
        endresult:"Résultat (%)", btn_calc:"Calculer", btn_advanced:"Calcul avancé",
        btn_reset_left:"Réinitialiser", press_calc:"Appuyez sur \"Calcul avancé\" pour générer la répartition.",
        col_marsch:"Marche", col_pct:"% du résultat", col_control:"Troupes par marche / Total", col_fix:"Sauvegarder marche",
        btn_recalc:"Recalculer", btn_reset:"Réinitialiser" },
  it: { site_title:"Calcolatore truppe MOC", left_title:"🧮 Calcolatore base per truppe distribuite equamente",
        right_title:"⚔️ Distribuzione delle marce per truppe distribuite in modo non uniforme", label_truppen:"Numero di truppe",
        label_maersche:"Numero di marce", label_haustier:"Bonus animale", label_cyrille:"Bonus Cyrille",
        label_schwadron:"Dimensione squadrone", zw1:"Truppe per marcia", zw2:"Dimensione totale squadrone",
        endresult:"Risultato (%)", btn_calc:"Calcola", btn_advanced:"Calcolo avanzato",
        btn_reset_left:"Reimposta", press_calc:"Premi \"Calcolo avanzato\" per generare la distribuzione.",
        col_marsch:"Marcia", col_pct:"% del risultato", col_control:"Truppe per marcia / Totale", col_fix:"Salva marcia",
        btn_recalc:"Ricalcola", btn_reset:"Reimposta" },
  tr: { site_title:"MOC Birlik Hesaplayıcı", left_title:"🧮 Eşit dağıtılmış birlikler için temel hesaplayıcı",
        right_title:"⚔️ Eşit olmayan dağıtılmış birlikler için yürüyüş dağılımı", label_truppen:"Toplam birlik",
        label_maersche:"Yürüyüş sayısı", label_haustier:"Evcil hayvan buff", label_cyrille:"Cyrille buff",
        label_schwadron:"Filon boyutu", zw1:"Her yürüyüş başına birlik", zw2:"Toplam filon boyutu",
        endresult:"Sonuç (%)", btn_calc:"Hesapla", btn_advanced:"Gelişmiş hesapla",
        btn_reset_left:"Sıfırla", press_calc:"Dağılımı oluşturmak için \"Gelişmiş hesapla\" tuşuna basın.",
        col_marsch:"Yürüyüş", col_pct:"Sonucun %'i", col_control:"Yürüyüş başına birlik / Toplam", col_fix:"Yürüyüşü kaydet",
        btn_recalc:"Yeniden hesapla", btn_reset:"Sıfırla" },
  ar: { site_title:"حاسبة قوات MOC", left_title:"🧮 الآلة الأساسية للقوات الموزعة بالتساوي",
        right_title:"⚔️ توزيع المسيرات للقوات الموزعة بشكل غير متساو", label_truppen:"إجمالي القوات",
        label_maersche:"عدد المسيرات", label_haustier:"تعزيز الحيوان الأليف", label_cyrille:"تعزيز سيريل",
        label_schwadron:"حجم السرب الكلي", zw1:"القوات لكل مسيرة", zw2:"الحجم الكلي للسرب",
        endresult:"النتيجة (%)", btn_calc:"حساب", btn_advanced:"حساب متقدم",
        btn_reset_left:"إعادة ضبط", press_calc:"اضغط \"حساب متقدم\" لإنشاء التوزيع.",
        col_marsch:"مسيرة", col_pct:"٪ من النتيجة", col_control:"القوات لكل مسيرة / الإجمالي", col_fix:"حفظ المسيرة",
        btn_recalc:"إعادة الحساب", btn_reset:"إعادة ضبط" }
};

function applyTranslations(lang){
  const map = TRANSLATIONS[lang] || TRANSLATIONS.de;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(!key) return;
    el.textContent = map[key] !== undefined ? map[key] : el.textContent;
  });
  document.title = map.site_title || document.title;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const sel = document.getElementById('langSelect');
  applyTranslations(sel.value || 'de');
  sel.addEventListener('change', ()=> applyTranslations(sel.value));
});
