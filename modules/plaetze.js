function initPlaetze(){

const div =
document.getElementById(
"platzMatrix"
);

let html =
'<div class="grid">';

APPDATA.plaetze.forEach(p=>{

html += `

<div class="card frei">

<h3>${p.name}</h3>

frei

</div>

`;

});

html += '</div>';

div.innerHTML = html;

}
