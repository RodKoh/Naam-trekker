let namen = [];
let trekkingGeschiedenis = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if(naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset input veld
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = namen.map((naam, index) => 
        `<li>${naam} <button onclick="verwijderNaam(${index})">Verwijder</button></li>`
    ).join('');
}

function verwijderNaam(index) {
    if(confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        namen.splice(index, 1);
        updateNamenLijst();
    }
}

function trekNaam() {
    if(namen.length > 0) {
        const index = Math.floor(Math.random() * namen.length);
        const getrokkenNaam = namen.splice(index, 1)[0];
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
        updateNamenLijst();
        trekkingGeschiedenis.push(getrokkenNaam);
    } else {
        alert('Einde van deze ronde');
        // Voeg ronde toe aan geschiedenis
        document.getElementById('trekkingGeschiedenis').innerHTML += `<li>${trekkingGeschiedenis.join(', ')}</li>`;
        trekkingGeschiedenis = []; // Reset voor de volgende ronde
    }
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});