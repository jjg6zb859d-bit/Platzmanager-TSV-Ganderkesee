function initKabinen(){

    renderKabinen();

}

function renderKabinen(){

    const div =
    document.getElementById(
        "kabinenMatrix"
    );

    let html =
    '<div class="grid">';

    APPDATA.kabinen.forEach(k=>{

        html += `

        <div
        class="card status-frei">

            <h3>

            ${k.name}

            </h3>

            ${k.status}

        </div>

        `;

    });

    html += "</div>";

    div.innerHTML =
    html;

}
