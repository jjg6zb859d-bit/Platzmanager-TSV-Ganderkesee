let reservierungen =
JSON.parse(
localStorage.getItem("reservierungen")
) || [];

anzeigen();
dashboard();
wochenplan();

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
"Datum und Uhrzeit auswählen."
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
"\n" +
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
wochenplan();

}

function anzeigen(){

const liste =
document.getElementById("liste");

const filter =
document.getElementById("filterDatum").value;

liste.innerHTML = "";

let daten = reservierungen;

if(filter){

daten =
reservierungen.filter(
r => r.datum === filter
);

}

daten.sort(
(a,b)=>
a.datum.localeCompare(b.datum)
);

daten.forEach((r,index)=>{

let klasse = "team-d1";

if(r.team==="D2") klasse="team-d2";
if(r.team==="C1") klasse="team-c1";
if(r.team==="C2") klasse="team-c2";
if(r.team==="Herren") klasse="team-herren";

liste.innerHTML +=

`<div class="eintrag ${klasse}">

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

document.getElementById(
"dashboard"
).innerHTML =

`<div class="dashboard-box">

📋 Reservierungen:
<strong>${reservierungen.length}</strong>

</div>

<div class="dashboard-box">

⚽ Plätze:
<strong>9</strong>

</div>

<div class="dashboard-box">

🚪 Kabinenhälften:
<strong>16</strong>

</div>`;

}

function wochenplan(){

const container =
document.getElementById(
"wochenplan"
);

container.innerHTML = "";

const tage = [
"Montag",
"Dienstag",
"Mittwoch",
"Donnerstag",
"Freitag",
"Samstag",
"Sonntag"
];

tage.forEach(tag=>{

container.innerHTML +=

`<div class="tag">

<h3>${tag}</h3>

<div class="tag-eintrag">

Noch keine Termine

</div>

</div>`;

});

}

function loeschen(index){

reservierungen.splice(
index,
1
);

localStorage.setItem(
"reservierungen",
JSON.stringify(
reservierungen
)
);

anzeigen();
dashboard();
wochenplan();

}
