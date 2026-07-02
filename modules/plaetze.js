function initPlaetze() {

    renderPlaetze();

}

function renderPlaetze() {

    const container =
        document.getElementById(
            "platzMatrix"
        );

    let html =
        '<div class="grid">';

    APPDATA.plaetze.forEach(platz => {

        const reservierungen =
            APPDATA.reservierungen.filter(
                r =>
                r.platz === platz.name
            );

        let klasse = "frei";

        if (
            reservierungen.length > 0
        ) {

            klasse = "belegt";

        }

        html += `

        <div class="card ${klasse}">

            <h3>
                ${platz.name}
            </h3>

        `;

        if (
            reservierungen.length === 0
        ) {

            html += `

            <strong>
                Frei
            </strong>

            `;

        }

        reservierungen.forEach(r => {

            html += `

            <div class="reservierung">

                <strong>
                    ${r.team}
                </strong>

                <br>

                ${r.start}
                -
                ${r.ende}

                <br>

                ${r.status}

            </div>

            `;

        });

        html += `

        </div>

        `;

    });

    html += "</div>";

    container.innerHTML =
        html;

}
