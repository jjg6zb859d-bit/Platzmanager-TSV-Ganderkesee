function initReservierungen(){

const div =
document.getElementById(
"reservierungContent"
);

div.innerHTML = `

<div class="card">

<h3>Neue Reservierung</h3>

<select>

<option>D1</option>

<option>C1</option>

</select>

<input type="date">

<input type="time">

<input type="time">

<button>

Reservieren

</button>

</div>

`;

}
