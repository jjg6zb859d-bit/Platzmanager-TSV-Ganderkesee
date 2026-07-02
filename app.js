let reservierungen =
JSON.parse(
localStorage.getItem("reservierungen")
) || [];

anzeigen();

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

if(
!datum ||
!start ||
!ende
){

alert(
"Bitte Datum und Uhrzeiten auswählen."
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

"Team: " +
konflikt.team +
"\n" +

"Platz: " +
konflikt.platz +
"\n" +

"Kabine: " +
konflikt.kabine

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

JSON.stringify(
reservierungen
)

);

anzeigen();

}

function anzeigen(){

const liste =
document.getElementById("liste");

liste.innerHTML = "";

reservierungen.forEach((r,index)=>{

let cssKlasse =
"team-d1";

if(r.team === "D2")
cssKlasse = "team-d2";

if(r.team === "C1")
cssKlasse = "team-c1";

if(r.team === "C2")
cssKlasse = "team-c2";

if(r.team === "Herren")
cssKlasse = "team-herren";

liste.innerHTML += `

<div class="eintrag ${cssKlasse}">

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

</div>

`;

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

}
