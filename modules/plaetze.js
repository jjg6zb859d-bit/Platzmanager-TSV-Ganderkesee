function initPlaetze() {

    renderPlaetze();

}

function renderPlaetze() {

    const div =
        document.getElementById(
            "platzMatrix"
        );

    let html =
        '<div class="grid">';

    APPDATA.plaetze.forEach(platz => {

        const belegung =
            APPDATA.reservierungen.filter(
                r => r.platz === platz.name
            );

        let css = "frei";

        if (belegung.length > 0) {

            css = "belegt";

        }

        html += `

        <div class="card ${css}">

            <h3>

                ${platz.name}

            </h3>

        `;

        if (belegung.length === 0) {

            html += `FREI`;

        } else {

            belegung.forEach(b => {

                html += `

                <strong>
                ${b.team}
                </strong>

                <br>

                ${b.start} - ${b.ende}

                <br><br>

                `;

            });

        }

        html += `</div>`;

    });

    html += '</div>';

    div.innerHTML = html;

}
