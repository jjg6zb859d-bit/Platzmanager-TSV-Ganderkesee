const teams = [
    {
        name: "D1",
        klasse: "team-d1"
    },
    {
        name: "D2",
        klasse: "team-d2"
    },
    {
        name: "C1",
        klasse: "team-c1"
    },
    {
        name: "C2",
        klasse: "team-c2"
    },
    {
        name: "Herren",
        klasse: "team-herren"
    }
];

const plaetze = [
    "Hauptplatz A",
    "Hauptplatz B",
    "Hauptplatz C",
    "Hauptplatz D",
    "Kunstrasen Nord",
    "Kunstrasen Süd",
    "Trainingsplatz A",
    "Trainingsplatz B",
    "Jugendplatz"
];

const kabinen = [
    "K1 Links",
    "K1 Rechts",
    "K2 Links",
    "K2 Rechts",
    "K3 Links",
    "K3 Rechts",
    "K4 Links",
    "K4 Rechts",
    "K5 Links",
    "K5 Rechts",
    "K6 Links",
    "K6 Rechts",
    "K7 Links",
    "K7 Rechts",
    "K8 Links",
    "K8 Rechts"
];

let reservierungen =
JSON.parse(localStorage.getItem("reservierungen")) || [];

starten();

function starten() {
    selectFelderFuellen();
    heutigesDatumSetzen();
    aktualisieren();
}

function selectFelderFuellen() {
    const teamSelect = document.getElementById("team");
    const platzSelect = document.getElementById("platz");
    const kabinenSelect = document.getElementById("kabine");

    teamSelect.innerHTML = "";
    platzSelect.innerHTML = "";
    kabinenSelect.innerHTML = "";

    teams.forEach(team => {
        teamSelect.innerHTML += `<option>${team.name}</option>`;
    });

    plaetze.forEach(platz => {
        platzSelect.innerHTML += `<option>${platz}</option>`;
    });

    kabinen.forEach(kabine => {
        kabinenSelect.innerHTML += `<option>${kabine}</option>`;
    });
}

function heutigesDatumSetzen() {
    const heute = new Date();
    const heuteText = datumFormat(heute);

    document.getElementById("datum").value = heuteText;
    document.getElementById("wochenDatum").value = heuteText;
}

function speichern() {
    const datum = document.getElementById("datum").value;
    const start = document.getElementById("start").value;
    const ende = document.getElementById("ende").value;
    const team = document.getElementById("team").value;
    const platz = document.getElementById("platz").value;
    const kabine = document.getElementById("kabine").value;

    if (!datum || !start || !ende) {
        alert("Bitte Datum, Startzeit und Endzeit auswählen.");
        return;
    }

    if (start >= ende) {
        alert("Die Endzeit muss nach der Startzeit liegen.");
        return;
    }

    const konflikt = reservierungen.find(r => {
        const gleicherTag = r.datum === datum;
        const zeitUeberschneidung = start < r.ende && ende > r.start;
        const gleicherPlatz = r.platz === platz;
        const gleicheKabine = r.kabine === kabine;

        return gleicherTag && zeitUeberschneidung && (gleicherPlatz || gleicheKabine);
    });

    if (konflikt) {
        alert(
            "Konflikt erkannt!\n\n" +
            "Team: " + konflikt.team + "\n" +
            "Zeit: " + konflikt.start + " - " + konflikt.ende + "\n" +
            "Platz: " + konflikt.platz + "\n" +
            "Kabine: " + konflikt.kabine
        );
        return;
    }

    const neueReservierung = {
        id: Date.now(),
        datum: datum,
        start: start,
        ende: ende,
        team: team,
        platz: platz,
        kabine: kabine
    };

    reservierungen.push(neueReservierung);

    speichernLocalStorage();
    formularZuruecksetzen();
    aktualisieren();
}

function formularZuruecksetzen() {
    document.getElementById("start").value = "";
    document.getElementById("ende").value = "";
}

function speichernLocalStorage() {
    localStorage.setItem(
        "reservierungen",
        JSON.stringify(reservierungen)
    );
}

function aktualisieren() {
    dashboard();
    anzeigen();
    wochenplan();
}

function dashboard() {
    const dashboard = document.getElementById("dashboard");

    const anzahl = reservierungen.length;
    const heute = datumFormat(new Date());

    const heuteReservierungen = reservierungen.filter(
        r => r.datum === heute
    ).length;

    dashboard.innerHTML = `
        <div class="dashboard-grid">

            <div class="dashboard-box">
                📋 Gesamt
                <strong>${anzahl}</strong>
            </div>

            <div class="dashboard-box">
                📅 Heute
                <strong>${heuteReservierungen}</strong>
            </div>

            <div class="dashboard-box">
                🚪 Kabinenhälften
                <strong>${kabinen.length}</strong>
            </div>

        </div>
    `;
}

function anzeigen() {
    const liste = document.getElementById("liste");

    liste.innerHTML = "";

    const daten = [...reservierungen].sort((a,b) => {
        if (a.datum !== b.datum) {
            return a.datum.localeCompare(b.datum);
        }

        return a.start.localeCompare(b.start);
    });

    if (daten.length === 0) {
        liste.innerHTML = `<div class="leer">Noch keine Reservierungen vorhanden.</div>`;
        return;
    }

    daten.forEach(r => {
        const klasse = teamKlasse(r.team);

        liste.innerHTML += `
            <div class="eintrag ${klasse}">

                <strong>${r.team}</strong>

                <br>

                📅 ${r.datum}

                <br>

                ⏰ ${r.start} - ${r.ende}

                <br>

                ⚽ ${r.platz}

                <br>

                🚪 ${r.kabine}

                <br>

                <button class="loeschen" onclick="loeschen(${r.id})">
                    Löschen
                </button>

            </div>
        `;
    });
}

function wochenplan() {
    const container = document.getElementById("wochenplan");
    const basisDatum = document.getElementById("wochenDatum").value;

    container.innerHTML = "";

    if (!basisDatum) {
        container.innerHTML = `<div class="leer">Bitte ein Datum auswählen.</div>`;
        return;
    }

    const montag = montagDerWoche(new Date(basisDatum));

    const tage = [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Sonntag"
    ];

    tage.forEach((tag, index) => {
        const aktuellerTag = new Date(montag);
        aktuellerTag.setDate(montag.getDate() + index);

        const datumText = datumFormat(aktuellerTag);

        const eintraege = reservierungen
            .filter(r => r.datum === datumText)
            .sort((a,b) => a.start.localeCompare(b.start));

        let html = `
            <div class="wochentag">
                <h3>${tag}</h3>
                <div class="datum-klein">${datumText}</div>
        `;

        if (eintraege.length === 0) {
            html += `<div class="leer">frei</div>`;
        } else {
            eintraege.forEach(r => {
                const klasse = teamKlasse(r.team);

                html += `
                    <div class="wochen-eintrag ${klasse}">
                        <strong>${r.team}</strong><br>
                        ${r.start} - ${r.ende}<br>
                        ⚽ ${r.platz}<br>
                        🚪 ${r.kabine}
                    </div>
                `;
            });
        }

        html += `</div>`;

        container.innerHTML += html;
    });
}

function loeschen(id) {
    reservierungen = reservierungen.filter(
        r => r.id !== id
    );

    speichernLocalStorage();
    aktualisieren();
}

function teamKlasse(teamName) {
    const team = teams.find(
        t => t.name === teamName
    );

    if (team) {
        return team.klasse;
    }

    return "team-standard";
}

function montagDerWoche(datum) {
    const tag = datum.getDay();
    const differenz = datum.getDate() - tag + (tag === 0 ? -6 : 1);

    return new Date(
        datum.setDate(differenz)
    );
}

function datumFormat(datum) {
    const jahr = datum.getFullYear();
    const monat = String(datum.getMonth() + 1).padStart(2, "0");
    const tag = String(datum.getDate()).padStart(2, "0");

    return `${jahr}-${monat}-${tag}`;
}

function exportJSON() {
    const daten = JSON.stringify(
        reservierungen,
        null,
        2
    );

    const blob = new Blob(
        [daten],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "platzmanager-backup.json";

    link.click();

    URL.revokeObjectURL(url);
}

function importJSON(event) {
    const datei = event.target.files[0];

    if (!datei) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const daten = JSON.parse(e.target.result);

            if (!Array.isArray(daten)) {
                alert("Die Datei enthält kein gültiges Backup.");
                return;
            }

            reservierungen = daten;

            speichernLocalStorage();
            aktualisieren();

            alert("Backup wurde erfolgreich importiert.");

        } catch (fehler) {
            alert("Die Datei konnte nicht gelesen werden.");
        }
    };

    reader.readAsText(datei);
}

function alleDatenLoeschen() {
    const bestaetigung = confirm(
        "Möchtest du wirklich alle Reservierungen löschen?"
    );

    if (!bestaetigung) {
        return;
    }

    reservierungen = [];

    speichernLocalStorage();
    aktualisieren();
}
