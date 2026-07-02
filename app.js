function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add("active");

    }

}

/* =========================
   APP START
========================= */

function startApp() {

    console.log(
        "TSV PlatzManager V1.0 Beta gestartet"
    );

    if (
        typeof initDashboard ===
        "function"
    ) {

        initDashboard();

    }

    if (
        typeof initPlaetze ===
        "function"
    ) {

        initPlaetze();

    }

    if (
        typeof initKabinen ===
        "function"
    ) {

        initKabinen();

    }

    if (
        typeof initTeams ===
        "function"
    ) {

        initTeams();

    }

    if (
        typeof initReservierungen ===
        "function"
    ) {

        initReservierungen();

    }

}

/* =========================
   HILFSFUNKTIONEN
========================= */

function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }

    const date =
        new Date(dateString);

    return date
        .toLocaleDateString(
            "de-DE"
        );

}

function getHeute() {

    const heute =
        new Date();

    return heute
        .toISOString()
        .split("T")[0];

}

function freiePlaetze() {

    if (
        !APPDATA ||
        !APPDATA.plaetze
    ) {

        return 0;

    }

    const belegt =
        new Set();

    APPDATA.reservierungen
        .forEach(r => {

            belegt.add(
                r.platz
            );

        });

    return (
        APPDATA.plaetze.length -
        belegt.size
    );

}

function freieKabinen() {

    if (
        !APPDATA ||
        !APPDATA.kabinen
    ) {

        return 0;

    }

    const belegt =
        new Set();

    APPDATA.reservierungen
        .forEach(r => {

            belegt.add(
                r.kabine
            );

        });

    return (
        APPDATA.kabinen.length -
        belegt.size
    );

}

/* =========================
   STATUS
========================= */

function getStatusColor(
    status
) {

    switch (status) {

        case "Freigegeben":
            return "#4CAF50";

        case "Reserviert":
            return "#FFB300";

        case "Gesperrt":
            return "#E53935";

        default:
            return "#607D8B";

    }

}

/* =========================
   DASHBOARD UPDATE
========================= */

function refreshAll() {

    if (
        typeof initDashboard ===
        "function"
    ) {

        initDashboard();

    }

    if (
        typeof renderPlaetze ===
        "function"
    ) {

        renderPlaetze();

    }

    if (
        typeof renderKabinen ===
        "function"
    ) {

        renderKabinen();

    }

    if (
        typeof renderTeams ===
        "function"
    ) {

        renderTeams();

    }

    if (
        typeof renderReservierungen ===
        "function"
    ) {

        renderReservierungen();

    }

}

/* =========================
   LOCAL STORAGE
========================= */

function saveAppData() {

    localStorage.setItem(
        "TSV_PLATZMANAGER",
        JSON.stringify(
            APPDATA
        )
    );

}

function loadAppData() {

    const daten =
        localStorage.getItem(
            "TSV_PLATZMANAGER"
        );

    if (
        daten
    ) {

        APPDATA =
            JSON.parse(
                daten
            );

    }

}

/* =========================
   EXPORT
========================= */

function exportData() {

    const data =
        JSON.stringify(
            APPDATA,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type:
                "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "platzmanager-backup.json";

    a.click();

    URL.revokeObjectURL(
        url
    );

}

/* =========================
   IMPORT
========================= */

function importData(
    event
) {

    const file =
        event.target.files[0];

    if (!file) {

        return;

    }

    const reader =
        new FileReader();

    reader.onload =
        function(e) {

            try {

                APPDATA =
                    JSON.parse(
                        e.target.result
                    );

                saveAppData();

                refreshAll();

                alert(
                    "Backup erfolgreich importiert."
                );

            }

            catch {

                alert(
                    "Import fehlgeschlagen."
                );

            }

        };

    reader.readAsText(
        file
    );

}

/* =========================
   APP STARTEN
========================= */

window.addEventListener(
    "load",
    () => {

        loadAppData();

        startApp();

    }
);
