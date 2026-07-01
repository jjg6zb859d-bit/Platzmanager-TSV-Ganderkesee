let reservierungen =
JSON.parse(
localStorage.getItem("reservierungen")
) || [];

anzeigen();

function speichern(){

    const datum =
    document.getElementById("datum").value;

    const team =
    document.getElementById("team").value;

    const platz =
    document.getElementById("platz").value;

    if(!datum){
        alert("Datum auswählen");
        return;
    }

    reservierungen.push({
        datum,
        team,
        platz
    });

    localStorage.setItem(
        "reservierungen",
        JSON.stringify(reservierungen)
    );

    anzeigen();
}

function anzeigen(){

    const liste =
    document.getElementById("liste");

    liste.innerHTML = "";

    reservierungen.forEach((r,index)=>{

        liste.innerHTML += `
        <div class="eintrag">

            <strong>${r.team}</strong>

            <br>

            ${r.datum}

            <br>

            ${r.platz}

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
