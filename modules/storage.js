const STORAGE_KEY = "TSV_PLATZMANAGER_V091";

let APPDATA = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
);

if (!APPDATA) {

    APPDATA = {

        teams: [

            {
                id: 1,
                name: "D1",
                trainer: "Niels",
                telefon: "",
                email: "",
                farbe: "#0054A6"
            },

            {
                id: 2,
                name: "C1",
                trainer: "",
                telefon: "",
                email: "",
                farbe: "#E53935"
            }

        ],

        plaetze: [

            {
                id: 1,
                name: "Hauptplatz A",
                status: "frei"
            },

            {
                id: 2,
                name: "Hauptplatz B",
                status: "frei"
            },

            {
                id: 3,
                name: "Hauptplatz C",
                status: "frei"
            },

            {
                id: 4,
                name: "Hauptplatz D",
                status: "frei"
            },

            {
                id: 5,
                name: "Kunstrasen Nord",
                status: "frei"
            },

            {
                id: 6,
                name: "Kunstrasen Süd",
                status: "frei"
            }

        ],

        kabinen: [

            {
                id: 1,
                name: "K1 Links",
                status: "frei"
            },

            {
                id: 2,
                name: "K1 Rechts",
                status: "frei"
            },

            {
                id: 3,
                name: "K2 Links",
                status: "frei"
            },

            {
                id: 4,
                name: "K2 Rechts",
                status: "frei"
            }

        ],

        reservierungen: []

    };

    speichern();
}

function speichern() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(APPDATA)
    );

}

function neueID(collection){

    return Date.now() +
    Math.floor(Math.random() * 10000);

}
