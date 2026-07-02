let reservierungen =
JSON.parse(
localStorage.getItem("reservierungen")
) || [];

anzeigen();

function speichern() {

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

if (!datum || !start || !ende) {

alert(
"Bitte Datum und Uhrzeiten auswählen."
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

}

function anzeigen() {

const liste =
document.getElementById("liste");

liste.innerHTML = "";

reservierungen.forEach((r,index) => {

liste.innerHTML += `

<div class="eintrag">

<strong>${r.team}</strong>

<br>

📅 ${r.datum}

<br>

⏰ ${r.start} - ${r.ende}

<br>

⚽ ${r.platz}

<br>

🚪 ${r.kabine}

<br><br>

<button onclick="loeschen(${index})">

Löschen

</button>

</div>

`;

});

}

function loeschen(index){

reservierungen.splice(index,1);

localStorage.setItem(

"reservierungen",

JSON.stringify(reservierungen)

);

anzeigen();

}
