function initKabinen() {
    renderKabinen();
}

function renderKabinen() {

    const div =
        document.getElementById("kabinenMatrix");

    let html =
        '<div class="grid">';

    APPDATA.kabinen.forEach(kabine => {

        const belegt =
            APPDATA.reservierungen.filter(
                r => r.kabine === kabine.name
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
                ${kabine.name}
            </h3>

            <strong>${status}</strong>

        </div>

        `;
    });

    html += "</div>";

    div.innerHTML =
        html;
}
