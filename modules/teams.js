function initTeams() {

    renderTeams();

}

function renderTeams() {

    const container =
        document.getElementById(
            "teamContent"
        );

    let html = `

    <div class="card">

        <h2>
            Neues Team
        </h2>

        <label>
            Teamname
        </label>

        <input
            type="text"
            id="teamName"
            placeholder="z.B. D1">

        <label>
            Trainer
        </label>

        <input
            type="text"
            id="trainerName"
            placeholder="Trainername">

        <button
            onclick="teamSpeichern()">

            Team speichern

        </button>

    </div>

    <div class="card">

        <h2>
            Vorhandene Teams
        </h2>

    `;

    APPDATA.teams.forEach(team => {

        html += `

        <div class="reservierung">

            <strong>
                ${team.name}
            </strong>

            <br>

            Trainer:
            ${team.trainer || "-"}

            <br><br>

            <button
                onclick="teamLoeschen(${team.id})">

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

function teamSpeichern() {

    const teamName =
        document.getElementById(
            "teamName"
        ).value.trim();

    const trainer =
        document.getElementById(
            "trainerName"
        ).value.trim();

    if (!teamName) {

        alert(
            "Bitte Teamnamen eingeben."
        );

        return;
    }

    const vorhanden =
        APPDATA.teams.find(t =>
            t.name.toLowerCase() ===
            teamName.toLowerCase()
        );

    if (vorhanden) {

        alert(
            "Team existiert bereits."
        );

        return;
    }

    APPDATA.teams.push({

        id: neueID(),

        name: teamName,

        trainer: trainer

    });

    saveAppData();

    refreshAll();

}

function teamLoeschen(id) {

    const bestaetigung =
        confirm(
            "Team wirklich löschen?"
        );

    if (!bestaetigung) {

        return;

    }

    APPDATA.teams =
        APPDATA.teams.filter(
            t => t.id !== id
        );

    saveAppData();

    refreshAll();

}
