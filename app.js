function showPage(page){

document
.querySelectorAll(".page")
.forEach(section=>{

section.classList.remove(
"active"
);

});

document
.getElementById(page)
.classList.add(
"active"
);

}

initDashboard();
initPlaetze();
initKabinen();
initTeams();
initReservierungen();
