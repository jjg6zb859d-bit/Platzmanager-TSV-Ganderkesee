function initTeams(){

    renderTeams();

}

function renderTeams(){

    const div =
    document.getElementById(
        "teamContent"
    );

    let html = `

    <div class="card">

        <h3>Neues Team</h3>

        <input
            id="teamName"
            placeholder="Team">

        <input
            id="trainerName"
            placeholder="Trainer">

        <button
            onclick="teamAnlegen()">

            Team speichern

        </button>

    </div>

    `;

    APPDATA.teams.forEach(team=>{

        html += `

        <div
        class="card">

            <h3>${team.name}</h3>

            Trainer:
            ${team.trainer || "-"}

        </div>

        `;

    });

    div.innerHTML = html;

}

function teamAnlegen(){

    const teamName =
    document.getElementById(
        "teamName"
    ).value;

    const trainer =
    document.getElementById(
        "trainerName"
    ).value;

    if(!teamName){

        alert(
            "Teamname fehlt"
        );

        return;
    }

    APPDATA.teams.push({

        id:
        neueID(),

        name:
        teamName,

        trainer:
        trainer,

        telefon:"",
        email:"",
        farbe:"#0054A6"

    });

    speichern();

    renderTeams();

    initDashboard();

}
