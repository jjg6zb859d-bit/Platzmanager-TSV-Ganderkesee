function initReservierungen() {
    renderReservierungen();
}

function renderReservierungen() {

    const div =
        document.getElementById("adminContent");

    let html = `
    <div class="card">

        <h3>Neue Reservierung</h3>

        <select id="resTeam">
            ${APPDATA.teams.map(team =>
                `<option>${team.name}</option>`
            ).join("")}
        </select>

        <input
            type="date"
            id="resDatum">

        <input
            type="time"
            id="resStart">

        <input
            type="time"
            id="resEnde">

        <select id="resPlatz">
            ${APPDATA.plaetze.map(platz =>
                `<option>${platz.name}</option>`
            ).join("")}
        </select>

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
        <h3>Reservierungen</h3>
    `;

    APPDATA.reservierungen.forEach(r => {

        html += `
        <div class="card">

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
}

function reservierungSpeichern() {

    const team =
        document.getElementById("resTeam").value;

    const datum =
        document.getElementById("resDatum").value;

    const start =
        document.getElementById("resStart").value;

    const ende =
        document.getElementById("resEnde").value;

    const platz =
        document.getElementById("resPlatz").value;

    const kabine =
        document.getElementById("resKabine").value;

    if (!datum || !start || !ende) {

        alert("Bitte Datum und Uhrzeit auswählen");

        return;
    }

    APPDATA.reservierungen.push({

        id: neueID(),

        team,
        datum,
        start,
        ende,
        platz,
        kabine

    });

    speichern();

    renderReservierungen();

    initDashboard();
    renderPlaetze();
    renderKabinen();
}
