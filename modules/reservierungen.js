function initReservierungen() {

    renderReservierungen();

}

function renderReservierungen() {

    const div =
        document.getElementById(
            "reservierungContent"
        );

    let html = `

    <div class="card">

        <h3>Neue Reservierung</h3>

        <label>Team</label>

        <select id="resTeam">

            ${APPDATA.teams.map(team =>

                `<option>${team.name}</option>`

            ).join("")}

        </select>

        <label>Datum</label>

        <input
            type="date"
            id="resDatum">

        <label>Start</label>

        <input
            type="time"
            id="resStart">

        <label>Ende</label>

        <input
            type="time"
            id="resEnde">

        <label>Platz</label>

        <select id="resPlatz">

            ${APPDATA.plaetze.map(platz =>

                `<option>${platz.name}</option>`

            ).join("")}

        </select>

        <label>Kabine</label>

        <select id="resKabine">

            ${APPDATA.kabinen.map(kabine =>

                `<option>${kabine.name}</option>`

            ).join("")}

        </select>

        <button onclick="reservierungSpeichern()">

            Reservierung speichern

        </button>

    </div>

    <div class="card">

        <h3>Aktuelle Reservierungen</h3>

    `;

    APPDATA.reservierungen.forEach(r => {

        html += `

        <div class="card belegt">

            <strong>${r.team}</strong>

            <br>

            📅 ${r.datum}

            <br>

            ⏰ ${r.start} - ${r.ende}

            <br>

            ⚽ ${r.platz}

            <br>

            🚪 ${r.kabine}

        </div>

        `;

    });

    html += `</div>`;

    div.innerHTML = html;

   function reservierungSpeichern() {

    const team =
        document.getElementById(
            "resTeam"
        ).value;

    const datum =
        document.getElementById(
            "resDatum"
        ).value;

    const start =
        document.getElementById(
            "resStart"
        ).value;

    const ende =
        document.getElementById(
            "resEnde"
        ).value;

    const platz =
        document.getElementById(
            "resPlatz"
        ).value;

    const kabine =
        document.getElementById(
            "resKabine"
        ).value;

    if (
        !datum ||
        !start ||
        !ende
    ) {

        alert(
            "Datum und Uhrzeit auswählen"
        );

        return;
    }

    const konflikt =
        APPDATA.reservierungen.find(r => {

            const gleicherTag =
                r.datum === datum;

            const zeitKonflikt =
                start < r.ende &&
                ende > r.start;

            const platzKonflikt =
                r.platz === platz;

            const kabinenKonflikt =
                r.kabine === kabine;

            return (
                gleicherTag &&
                zeitKonflikt &&
                (
                    platzKonflikt ||
                    kabinenKonflikt
                )
            );

        });

    if (konflikt) {

        alert(
            "Konflikt erkannt!\n\n" +
            konflikt.team +
            "\n" +
            konflikt.platz +
            "\n" +
            konflikt.start +
            " - " +
            konflikt.ende
        );

        return;
    }

    APPDATA.reservierungen.push({

        id: Date.now(),

        team,
        datum,
        start,
        ende,
        platz,
        kabine

    });

    renderReservierungen();

    initDashboard();

    renderPlaetze();

    renderKabinen();
} 

}
``
