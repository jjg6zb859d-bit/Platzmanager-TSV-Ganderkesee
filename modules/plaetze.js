function initPlaetze(){

const div =
document.getElementById(
"platzMatrix"
);

let html =
'<div class="grid">';

APPDATA.plaetze.forEach(p=>{

html += `

<div class="card status-frei">

<h3>${p}</h3>

frei

</div>

`;

});

html += '</div>';

div.innerHTML = html;

}
