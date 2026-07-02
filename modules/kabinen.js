function initKabinen(){

const div =
document.getElementById(
"kabinenMatrix"
);

let html =
'<div class="grid">';

APPDATA.kabinen.forEach(k=>{

html += `

<div class="card frei">

<h3>${k.name}</h3>

frei

</div>

`;

});

html += '</div>';

div.innerHTML = html;

}
