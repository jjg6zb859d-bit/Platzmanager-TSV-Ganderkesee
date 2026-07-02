function initKabinen() {

    renderKabinen();

}

function renderKabinen() {

    const div =
        document.getElementById(
            "kabinenMatrix"
        );

    let html =
        '<div class="grid">';

    APPDATA.kabinen.forEach(kabine => {

        const belegung =
            APPDATA.reservierungen.filter(
                r => r.kabine === kabine.name
            );

        let css = "frei";

        if (belegung.length > 0) {

            css = "belegt";

        }

        html += `

        <div class="card ${css}">

            <h3>

                ${kabine.name}

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

                `;

            });

        }

        html += `</div>`;

    });

    html += '</div>';

    div.innerHTML = html;

}
