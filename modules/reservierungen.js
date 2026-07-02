function initReservierungen() {

    renderReservierungen();

}

function renderReservierungen() {

    const container =
        document.getElementById(
            "reservierungContent"
        );

    let html = `

    <div class="card">

        <h2>
            Neue Reservierung
        </h2>

        <label>
            Team
        </label>

        <select id="resTeam">

            ${APPDATA.teams.map(team => `

                <option>
                    ${team.name}
                </option>

            `).join("")}

        </select>

        <label>
            Datum
        </label>

        <input
            type="date"
            id="resDatum">

        <label>
            Startzeit
        </label>

        <input
            type="time"
            id="resStart">

        <label>
            Endzeit
        </label>

        <input
            type="time"
            id="resEnde">

        <label>
            Platz
        </label>

        <select id="resPlatz">

            ${APPDATA.plaetze.map(platz => `

                <option>
                    ${platz.name}
                </option>

            `).join("")}

        </select>

        <label>
            Kabine
        </label>

        <select id="resKabine">

            ${APPDATA.kabinen.map(kabine => `

                <option>
                    ${kabine.name}
                </option>

            `).join("")}

        </select>

        <label>
            Status
        </label>

        <select id="resStatus">

            <option>
                Reserviert
            </option>

            <option>
                Freigegeben
            </option>

            <option>
                Gesperrt
            </option>

        </select>

        <button
            onclick="reservierungSpeichern()">

            Reservierung speichern

        </button>

    </div>

    <div class="card">

        <h2>
            Aktuelle Reservierungen
        </h2>

    `;

    if (
        APPDATA.reservierungen.length === 0
    ) {

        html += `

        <p>
            Noch keine Reservierungen vorhanden.
        </p>

        `;

    }

    APPDATA.reservierungen.forEach(r => {

        html += `

        <div class="reservierung">

            <strong>
                ${r.team}
            </strong>

            <br>

            📅
            ${formatDate(
                r.datum
            )}

            <br>

            ⏰
            ${r.start}
            -
            ${r.ende}

            <br>

            ⚽
            ${r.platz}

            <br>

            🚪
            ${r.kabine}

            <br>

            Status:

            <span
            style="
            color:${getStatusColor(
                r.status
            )};
            font-weight:bold;
            ">

            ${r.status}

            </span>

            <br><br>

            <button
                onclick="
                reservierungLoeschen(
                    ${r.id}
                )
                ">

                Löschen

            </button>

        </div>

        `;

    });

    html += `

    </div>

    `;

    container.innerHTML =
        html;

}

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

    const status =
        document.getElementById(
            "resStatus"
        ).value;

    if (
        !datum ||
        !start ||
        !ende
    ) {

        alert(
            "Bitte Datum und Uhrzeit auswählen."
        );

        return;

    }

    if (
        start >= ende
    ) {

        alert(
            "Endzeit muss nach Startzeit liegen."
        );

        return;

    }

    const konflikt =
        APPDATA.reservierungen.find(r => {

            const gleicherTag =
                r.datum === datum;

            const gleicheZeit =

                start < r.ende &&
                ende > r.start;

            const gleicherPlatz =
                r.platz === platz;

            const gleicheKabine =
                r.kabine === kabine;

            return (
                gleicherTag &&
                gleicheZeit &&
                (
                    gleicherPlatz ||
                    gleicheKabine
                )
            );

        });

    if (
        konflikt
    ) {

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

        id:
            neueID(),

        team:
            team,

        datum:
            datum,

        start:
            start,

        ende:
            ende,

        platz:
            platz,

        kabine:
            kabine,

        status:
            status

    });

    saveAppData();

    refreshAll();

}

function reservierungLoeschen(id) {

    const bestaetigung =
        confirm(
            "Reservierung löschen?"
        );

    if (
        !bestaetigung
    ) {

        return;

    }

    APPDATA.reservierungen =
        APPDATA.reservierungen.filter(
            r => r.id !== id
        );

    saveAppData();

    refreshAll();

}
