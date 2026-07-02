function initDashboard(){

    const div =
    document.getElementById(
        "dashboardContent"
    );

    div.innerHTML = `

    <div class="grid">

        <div class="card">

            <h3>⚽ Plätze</h3>

            ${APPDATA.plaetze.length}

        </div>

        <div class="card">

            <h3>🚪 Kabinen</h3>

            ${APPDATA.kabinen.length}

        </div>

        <div class="card">

            <h3>👥 Teams</h3>

            ${APPDATA.teams.length}

        </div>

        <div class="card">

            <h3>📋 Reservierungen</h3>

            ${APPDATA.reservierungen.length}

        </div>

    </div>

    `;

}
