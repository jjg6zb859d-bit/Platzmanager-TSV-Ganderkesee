let reservierungen =
JSON.parse(
localStorage.getItem("reservierungen")
) || [];

anzeigen();
dashboard();

function speichern(){

const datum =
document.getElementById("datum").value;

const start =
document.getElementById("start").value;

const ende =
document.getElementById("ende").value;

const team =
document.getElementById("team").value;

const platz =
document.getElementById("platz").value;

const kabine =
document.getElementById("kabine").value;

if(!datum || !start || !ende){

alert(
"Datum und Uhrzeit auswählen"
);

return;
}

const konflikt =
reservierungen.find(r =>

r.datum === datum &&

(
r.platz === platz ||
r.kabine === kabine
)

);

if(konflikt){

alert(
"Konflikt erkannt!\n\n" +
konflikt.team +
" nutzt bereits\n" +
konflikt.platz
);

return;
}

reservierungen.push({

datum,
start,
ende,
team,
platz,
kabine

});

localStorage.setItem(
"reservierungen",
JSON.stringify(reservierungen)
);

anzeigen();
dashboard();
}

function anzeigen(){

const liste =
document.getElementById("liste");

const filter =
document.getElementById("filterDatum").value;

liste.innerHTML = "";

let daten =
reservierungen;

if(filter){

daten =
reservierungen.filter(
r => r.datum === filter
);

}

daten.sort((a,b)=>{

if(a.datum < b.datum) return -1;
if(a.datum > b.datum) return 1;

return 0;

});

daten.forEach((r,index)=>{

let cssKlasse="team-d1";

if(r.team==="D2")
cssKlasse="team-d2";

if(r.team==="C1")
cssKlasse="team-c1";

if(r.team==="C2")
cssKlasse="team-c2";

if(r.team==="Herren")
cssKlasse="team-herren";

liste.innerHTML +=

`<div class="eintrag ${cssKlasse}">

<strong>${r.team}</strong>

<br>

📅 ${r.datum}

<br>

⏰ ${r.start} - ${r.ende}

<br>

⚽ ${r.platz}

<br>

🚪 ${r.kabine}

<br>

<button
class="loeschen"
onclick="loeschen(${index})">

Löschen

</button>

</div>`;

});

}

function dashboard(){

const dashboard =
document.getElementById("dashboard");

const anzahl =
reservierungen.length;

dashboard.innerHTML =

`<div class="dashboard-box">

📋 Reservierungen gesamt:
<strong>${anzahl}</strong>

</div>

<div class="dashboard-box">

⚽ Plätze im System:
<strong>9</strong>

</div>

<div class="dashboard-box">

🚪 Kabinenhälften:
<strong>16</strong>

</div>`;
}

function loeschen(index){

reservierungen.splice(index,1);

localStorage.setItem(
"reservierungen",
JSON.stringify(reservierungen)
);

anzeigen();
dashboard();

}
