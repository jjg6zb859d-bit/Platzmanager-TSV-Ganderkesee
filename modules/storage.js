let APPDATA = {

    teams: [

        {
            id: 1,
            name: "D1",
            trainer: "Niels"
        },

        {
            id: 2,
            name: "C1",
            trainer: ""
        },

        {
            id: 3,
            name: "Herren"
        }

    ],

    plaetze: [

        {
            id: 1,
            name: "Hauptplatz A"
        },

        {
            id: 2,
            name: "Hauptplatz B"
        },

        {
            id: 3,
            name: "Hauptplatz C"
        },

        {
            id: 4,
            name: "Hauptplatz D"
        },

        {
            id: 5,
            name: "Kunstrasen Nord"
        },

        {
            id: 6,
            name: "Kunstrasen Süd"
        },

        {
            id: 7,
            name: "Trainingsplatz A"
        },

        {
            id: 8,
            name: "Trainingsplatz B"
        }

    ],

    kabinen: [

        {
            id: 1,
            name: "K1 Links"
        },

        {
            id: 2,
            name: "K1 Rechts"
        },

        {
            id: 3,
            name: "K2 Links"
        },

        {
            id: 4,
            name: "K2 Rechts"
        },

        {
            id: 5,
            name: "K3 Links"
        },

        {
            id: 6,
            name: "K3 Rechts"
        },

        {
            id: 7,
            name: "K4 Links"
        },

        {
            id: 8,
            name: "K4 Rechts"
        }

    ],

    reservierungen: [

    ]

};

function neueID() {

    return Date.now() +
    Math.floor(
        Math.random() * 10000
    );

}
