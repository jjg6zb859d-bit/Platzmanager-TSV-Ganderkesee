function initKabinen(){

const div =
document.getElementById(
"kabinenMatrix"
);

let html =
'<div class="grid">';

APPDATA.kabinen.forEach(k=>{

html += `

<div class="card status-frei">

<h3>${k}</h3>

frei

</div>

`;

});

html += '</div>';

div.innerHTML = html;

}
``
