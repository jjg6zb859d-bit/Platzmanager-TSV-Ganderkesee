function initPlaetze(){

    renderPlaetze();

}

function renderPlaetze(){

    const div =
    document.getElementById(
        "platzMatrix"
    );

    let html =
    '<div class="grid">';

    APPDATA.plaetze.forEach(platz=>{

        html += `

        <div class="card status-frei">

            <h3>

            ${platz.name}

            </h3>

            ${platz.status}

        </div>

        `;

    });

    html += "</div>";

    div.innerHTML =
    html;

}
