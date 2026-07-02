const ADMIN_PIN = "1892";

let istAdmin = false;
let bearbeitungsId = null;

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
    const filterTeam = document.getElementById("filterTeam");

    teamSelect.innerHTML = "";
    platzSelect.innerHTML = "";
    kabinenSelect.innerHTML = "";
    filterTeam.innerHTML = "<option>Alle Teams</option>";

    teams.forEach(team => {
        teamSelect.innerHTML += `<option>${team.name}</option>`;
        filterTeam.innerHTML += `<option>${team.name}</option>`;
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
    document.getElementById("tagesDatum").value = heuteText;
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
    bearbeitungAbbrechen();
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

    if (bearbeitungsId !== null && !istAdmin) {
        alert("Bearbeiten ist nur im Admin-Modus möglich.");
        return;
    }

    const konflikt = reservierungen.find(r => {
        const nichtSelberEintrag = r.id !== bearbeitungsId;
        const gleicherTag = r.datum === datum;
        const zeitUeberschneidung = start < r.ende && ende > r.start;
        const gleicherPlatz = r.platz === platz;
        const gleicheKabine = r.kabine === kabine;

        return nichtSelberEintrag &&
            gleicherTag &&
            zeitUeberschneidung &&
            (gleicherPlatz || gleicheKabine);
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

    if (bearbeitungsId !== null) {
        reservierungen = reservierungen.map(r => {
            if (r.id === bearbeitungsId) {
                return {
                    id: r.id,
                    datum: datum,
                    start: start,
                    ende: ende,
                    team: team,
                    platz: platz,
                    kabine: kabine,
                    status: status,
                    notiz: notiz
                };
            }

            return r;
        });

        bearbeitungAbbrechen(false);
    } else {
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
        formularZuruecksetzen();
    }

    speichernLocalStorage();
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
    tagesplan();
}

function dashboard() {
    const dashboard = document.getElementById("dashboard");

    const gesamt = reservierungen.length;

    const entwurf = reservierungen.filter(
        r => r.status === "Entwurf"
    ).length;

    const reserviert = reservierungen.filter(
        r => r.status === "Reserviert"
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
                🔵 Reserviert
                <strong>${reserviert}</strong>
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

    const filterTeam = document.getElementById("filterTeam").value;
    const filterStatus = document.getElementById("filterStatus").value;

    liste.innerHTML = "";

    let daten = [...reservierungen];

    if (filterTeam !== "Alle Teams") {
        daten = daten.filter(r => r.team === filterTeam);
    }

    if (filterStatus !== "Alle Status") {
        daten = daten.filter(r => r.status === filterStatus);
    }

    daten.sort((a,b) => {
        if (a.datum !== b.datum) {
            return a.datum.localeCompare(b.datum);
        }

        return a.start.localeCompare(b.start);
    });

    if (daten.length === 0) {
        liste.innerHTML = `<div class="leer">Keine passenden Reservierungen vorhanden.</div>`;
        return;
    }

    daten.forEach(r => {
        const klasse = teamKlasse(r.team);
        const statusKlasse = statusKlasseErmitteln(r.status);

        let adminButtons = "";

        if (istAdmin) {
            adminButtons = `
                <div class="button-row">
                    <button class="bearbeiten" onclick="bearbeiten(${r.id})">
                        Bearbeiten
                    </button>

                    <button class="loeschen" onclick="loeschen(${r.id})">
                        Löschen
                    </button>
                </div>
            `;
        } else {
            adminButtons = `
                <div class="admin-hinweis">
                    Bearbeiten und Löschen nur im Admin-Modus möglich.
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

                ${r.notiz ? `<br>📝 ${textSicher(r.notiz)}` : ""}

                <br>

                ${adminButtons}

            </div>
        `;
    });
}

function bearbeiten(id) {
    if (!istAdmin) {
        alert("Bearbeiten ist nur im Admin-Modus möglich.");
        return;
    }

    const eintrag = reservierungen.find(r => r.id === id);

    if (!eintrag) {
        alert("Reservierung wurde nicht gefunden.");
        return;
    }

    bearbeitungsId = id;

    document.getElementById("formularTitel").textContent = "Reservierung bearbeiten";
    document.getElementById("speicherButton").textContent = "Änderungen speichern";
    document.getElementById("abbrechenButton").classList.remove("hidden");

    document.getElementById("datum").value = eintrag.datum;
    document.getElementById("start").value = eintrag.start;
    document.getElementById("ende").value = eintrag.ende;
    document.getElementById("team").value = eintrag.team;
    document.getElementById("platz").value = eintrag.platz;
    document.getElementById("kabine").value = eintrag.kabine;
    document.getElementById("status").value = eintrag.status;
    document.getElementById("notiz").value = eintrag.notiz || "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function bearbeitungAbbrechen(resetFormular = true) {
    bearbeitungsId = null;

    document.getElementById("formularTitel").textContent = "Neue Reservierung";
    document.getElementById("speicherButton").textContent = "Reservierung speichern";
    document.getElementById("abbrechenButton").classList.add("hidden");

    if (resetFormular) {
        formularZuruecksetzen();
    }
}

function tagesplan() {
    const container = document.getElementById("tagesplan");
    const datum = document.getElementById("tagesDatum").value;

    container.innerHTML = "";

    if (!datum) {
        container.innerHTML = `<div class="leer">Bitte einen Tag auswählen.</div>`;
        return;
    }

    let html = `<div class="platzmatrix">`;

    plaetze.forEach(platz => {
        const eintraege = reservierungen
            .filter(r => r.datum === datum && r.platz === platz)
            .sort((a,b) => a.start.localeCompare(b.start));

        html += `
            <div class="platzbox">
                <h3>${platz}</h3>
        `;

        if (eintraege.length === 0) {
            html += `<div class="leer">frei</div>`;
        } else {
            eintraege.forEach(r => {
                const klasse = teamKlasse(r.team);
                const statusKlasse = statusKlasseErmitteln(r.status);

                html += `
                    <div class="platz-eintrag ${klasse} ${statusKlasse}">
                        <span class="status-label">${r.status}</span><br>
                        <strong>${r.team}</strong><br>
                        ${r.start} - ${r.ende}<br>
                        🚪 ${r.kabine}
                        ${r.notiz ? `<br>📝 ${textSicher(r.notiz)}` : ""}
                    </div>
                `;
            });
        }

        html += `</div>`;
    });

    html += `</div>`;

    container.innerHTML = html;
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
                        ${r.notiz ? `<br>📝 ${textSicher(r.notiz)}` : ""}
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

function textSicher(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
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
                    id: eintrag.id || Date.now() + Math.floor(Math.random() * 100000),
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

    event.target.value = "";
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
