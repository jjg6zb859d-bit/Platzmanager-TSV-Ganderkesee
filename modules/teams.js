function initTeams(){

const div =
document.getElementById(
"teamContent"
);

let html = "";

APPDATA.teams.forEach(t=>{

html += `

<div class="card">

<h3>${t.name}</h3>

Team angelegt

</div>

`;

});

div.innerHTML = html;

}
