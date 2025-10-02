function berechnen() {
  const truppen = parseFloat(document.getElementById('anzahlTruppen').value);
  const maersche = parseFloat(document.getElementById('anzahlMaersche').value);
  const haustier = parseFloat(document.getElementById('haustierBuff').value);
  const cyrille = parseFloat(document.getElementById('cyrilleBuff').value);
  const schwadron = parseFloat(document.getElementById('schwadronGroesse').value);

  if (isNaN(truppen) || isNaN(maersche) || isNaN(haustier) || isNaN(cyrille) || isNaN(schwadron)) {
    alert('⚠️ Es wurden nicht alle Eingabefelder ausgefüllt. Möchtest du trotzdem berechnen?');
    return;
  }

  const zw1 = truppen / maersche;
  document.getElementById('zwischensumme1').value = zw1;

  const zw2 = haustier + cyrille + schwadron;
  document.getElementById('zwischensumme2').value = zw2;

  const end = (100 / zw2) * zw1;
  document.getElementById('endergebnis').value = end.toFixed(2) + '%';
}

function openInfo(id) {
  document.getElementById(id).style.display = 'block';
}
function closeInfo(id) {
  document.getElementById(id).style.display = 'none';
}
