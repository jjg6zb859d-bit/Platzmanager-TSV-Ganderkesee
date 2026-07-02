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

}
``
