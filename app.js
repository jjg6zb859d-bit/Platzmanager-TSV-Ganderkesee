const ADMIN_PIN = "1892";

let istAdmin = false;

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
    rollenAnzeigeAktualisieren();
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

function adminLogin() {
    const pin = document.getElementById("adminPin").value;

    if (pin === ADMIN_PIN) {
        istAdmin = true;
        document.getElementById("adminPin").value = "";
        rollenAnzeigeAktualisieren();
        aktualisieren();
        alert("Admin-Modus aktiviert.");
    } else {
        alert("Falscher Admin-PIN.");
    }
}

function trainerModus() {
    istAdmin = false;
    rollenAnzeigeAktualisieren();
    aktualisieren();
}

function rollenAnzeigeAktualisieren() {
    const anzeige = document.getElementById("rollenAnzeige");

    if (istAdmin) {
        anzeige.textContent = "Aktueller Modus: Jugendleiter / Admin";
        anzeige.className = "rollen-anzeige admin";
    } else {
        anzeige.textContent = "Aktueller Modus: Trainer";
        anzeige.className = "rollen-anzeige trainer";
    }
}

function speichern() {
    const datum = document.getElementById("datum").value;
    const start = document.getElementById("start").value;
    const ende = document.getElementById("ende").value;
    const team = document.getElementById("team").value;
    const platz = document.getElementById("platz").value;
    const kabine = document.getElementById("kabine").value;
    const status = document.getElementById("status").value;
    const notiz = document.getElementById("notiz").value.trim();

    if (!datum || !start || !ende) {
        alert("Bitte Datum, Startzeit und Endzeit auswählen.");
        return;
    }

    if (start >= ende) {
        alert("Die Endzeit muss nach der Startzeit liegen.");
        return;
    }

    if ((status === "Freigegeben" || status === "Gesperrt") && !istAdmin) {
        alert("Nur der Admin darf Freigaben oder Sperrungen eintragen.");
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
            "Status: " + konflikt.status + "\n" +
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
        kabine: kabine,
        status: status,
        notiz: notiz
    };

    reservierungen.push(neueReservierung);

    speichernLocalStorage();
    formularZuruecksetzen();
    aktualisieren();
}

function formularZuruecksetzen() {
    document.getElementById("start").value = "";
    document.getElementById("ende").value = "";
    document.getElementById("notiz").value = "";
    document.getElementById("status").value = "Entwurf";
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

    const gesamt = reservierungen.length;

    const entwurf = reservierungen.filter(
        r => r.status === "Entwurf"
    ).length;

    const freigegeben = reservierungen.filter(
        r => r.status === "Freigegeben"
    ).length;

    const gesperrt = reservierungen.filter(
        r => r.status === "Gesperrt"
    ).length;

    dashboard.innerHTML = `
        <div class="dashboard-grid">

            <div class="dashboard-box">
                📋 Gesamt
                <strong>${gesamt}</strong>
            </div>

            <div class="dashboard-box">
                🟡 Entwürfe
                <strong>${entwurf}</strong>
            </div>

            <div class="dashboard-box">
                🟢 Freigegeben
                <strong>${freigegeben}</strong>
            </div>

            <div class="dashboard-box">
                🔴 Gesperrt
                <strong>${gesperrt}</strong>
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
        const statusKlasse = statusKlasseErmitteln(r.status);

        let loeschButton = "";

        if (istAdmin) {
            loeschButton = `
                <button class="loeschen" onclick="loeschen(${r.id})">
                    Löschen
                </button>
            `;
        } else {
            loeschButton = `
                <div class="admin-hinweis">
                    Löschen nur im Admin-Modus möglich.
                </div>
            `;
        }

        liste.innerHTML += `
            <div class="eintrag ${klasse} ${statusKlasse}">

                <span class="status-label">${r.status}</span>

                <br>

                <strong>${r.team}</strong>

                <br>

                📅 ${r.datum}

                <br>

                ⏰ ${r.start} - ${r.ende}

                <br>

                ⚽ ${r.platz}

                <br>

                🚪 ${r.kabine}

                ${r.notiz ? `<br>📝 ${r.notiz}` : ""}

                <br>

                ${loeschButton}

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
                const statusKlasse = statusKlasseErmitteln(r.status);

                html += `
                    <div class="wochen-eintrag ${klasse} ${statusKlasse}">
                        <span class="status-label">${r.status}</span><br>
                        <strong>${r.team}</strong><br>
                        ${r.start} - ${r.ende}<br>
                        ⚽ ${r.platz}<br>
                        🚪 ${r.kabine}
                        ${r.notiz ? `<br>📝 ${r.notiz}` : ""}
                    </div>
                `;
            });
        }

        html += `</div>`;

        container.innerHTML += html;
    });
}

function loeschen(id) {
    if (!istAdmin) {
        alert("Nur der Admin darf Reservierungen löschen.");
        return;
    }

    const bestaetigung = confirm(
        "Diese Reservierung wirklich löschen?"
    );

    if (!bestaetigung) {
        return;
    }

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

function statusKlasseErmitteln(status) {
    if (status === "Entwurf") {
        return "status-entwurf";
    }

    if (status === "Reserviert") {
        return "status-reserviert";
    }

    if (status === "Freigegeben") {
        return "status-freigegeben";
    }

    if (status === "Gesperrt") {
        return "status-gesperrt";
    }

    return "";
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

            reservierungen = daten.map(eintrag => {
                return {
                    id: eintrag.id || Date.now(),
                    datum: eintrag.datum || "",
                    start: eintrag.start || "",
                    ende: eintrag.ende || "",
                    team: eintrag.team || "D1",
                    platz: eintrag.platz || "Hauptplatz A",
                    kabine: eintrag.kabine || "K1 Links",
                    status: eintrag.status || "Entwurf",
                    notiz: eintrag.notiz || ""
                };
            });

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
    if (!istAdmin) {
        alert("Nur der Admin darf alle Daten löschen.");
        return;
    }

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
