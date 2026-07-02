function initDashboard() {

    renderDashboard();

}

function renderDashboard() {

    const div =
        document.getElementById(
            "dashboardContent"
        );

    const freiePlaetzeAnzahl =
        freiePlaetze();

    const freieKabinenAnzahl =
        freieKabinen();

    const reservierungenHeute =
        APPDATA.reservierungen.filter(r => {

            return (
                r.datum === getHeute()
            );

        }).length;

    let letzteReservierungen =
        [...APPDATA.reservierungen]
        .reverse()
        .slice(0, 5);

    let html = `

    <div class="grid">

        <div class="dashboard-box">

            <h3>⚽ Plätze</h3>

            <div class="dashboard-zahl">
                ${APPDATA.plaetze.length}
            </div>

        </div>

        <div class="dashboard-box">

            <h3>🚪 Kabinen</h3>

            <div class="dashboard-zahl">
                ${APPDATA.kabinen.length}
            </div>

        </div>

        <div class="dashboard-box">

            <h3>👥 Teams</h3>

            <div class="dashboard-zahl">
                ${APPDATA.teams.length}
            </div>

        </div>

        <div class="dashboard-box">

            <h3>📅 Reservierungen</h3>

            <div class="dashboard-zahl">
                ${APPDATA.reservierungen.length}
            </div>

        </div>

    </div>

    <div class="grid">

        <div class="card frei">

            <h3>🟢 Freie Plätze</h3>

            <div class="dashboard-zahl">
                ${freiePlaetzeAnzahl}
            </div>

        </div>

        <div class="card frei">

            <h3>🟢 Freie Kabinen</h3>

            <div class="dashboard-zahl">
                ${freieKabinenAnzahl}
            </div>

        </div>

        <div class="card">

            <h3>📋 Reservierungen heute</h3>

            <div class="dashboard-zahl">
                ${reservierungenHeute}
            </div>

        </div>

    </div>

    <div class="card">

        <h2>
            Letzte Reservierungen
        </h2>

    `;

    if (
        letzteReservierungen.length === 0
    ) {

        html += `

        <p>
            Noch keine Reservierungen vorhanden.
        </p>

        `;

    } else {

        letzteReservierungen.forEach(r => {

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

                <span
                style="
                color:${getStatusColor(
                    r.status
                )};
                font-weight:bold;
                ">

                ${r.status}

                </span>

            </div>

            `;

        });

    }

    html += `

    </div>

    `;

    div.innerHTML =
        html;

}
