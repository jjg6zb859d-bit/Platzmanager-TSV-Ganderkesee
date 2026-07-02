function initPlaetze() {
    renderPlaetze();
}

function renderPlaetze() {

    const div =
        document.getElementById("platzMatrix");

    let html =
        '<div class="grid">';

    APPDATA.plaetze.forEach(platz => {

        const belegt =
            APPDATA.reservierungen.filter(
                r => r.platz === platz.name
            );

        let status = "frei";
        let css = "status-frei";

        if (belegt.length > 0) {

            status =
                `${belegt.length} Belegung(en)`;

            css =
                "status-belegt";
        }

        html += `

        <div class="card ${css}">

            <h3>
                ${platz.name}
            </h3>

            <strong>${status}</strong>

        </div>

        `;
    });

    html += "</div>";

    div.innerHTML =
        html;
}
