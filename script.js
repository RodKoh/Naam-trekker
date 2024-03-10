let namen = [];
let actieveNamen = []; // Een kopie van de namenlijst specifiek voor de trekking
let trekkingGeschiedenis = [];

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        actieveNamen.push(naam); // Voeg ook toe aan actieveNamen voor de trekking
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = namen.map((naam, index) => 
        `<li>${naam} <button onclick="verwijderNaam(${index})">Verwijder</button></li>`
    ).join('');
}

function verwijderNaam(index) {
    if (confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        const naam = namen[index];
        namen.splice(index, 1); // Verwijder uit de oorspronkelijke lijst
        const actieveIndex = actieveNamen.indexOf(naam);
        if (actieveIndex > -1) {
            actieveNamen.splice(actieveIndex, 1); // Verwijder ook uit actieveNamen
        }
        updateNamenLijst();
    }
}

function trekNaam() {
    if (actieveNamen.length > 0) {
        const index = Math.floor(Math.random() * actieveNamen.length);
        const getrokkenNaam = actieveNamen.splice(index, 1)[0];
        document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;
        trekkingGeschiedenis.push(getrokkenNaam);
        if (actieveNamen.length === 0) {
            alert('Einde van deze ronde');
            document.getElementById('trekkingGeschiedenis').innerHTML += `<li>${trekkingGeschiedenis.join(', ')}</li>`;
            trekkingGeschiedenis = []; // Reset voor de volgende ronde
            resetActieveNamen(); // Reset actieveNamen voor een nieuwe ronde
        }
    } else {
        alert('Alle namen zijn getrokken. Start een nieuwe ronde.');
    }
}

function resetActieveNamen() {
    actieveNamen = [...namen]; // Kopieer alle namen opnieuw naar actieveNamen voor de volgende ronde
    document.getElementById('getrokkenNamen').innerHTML = ''; // Maak de lijst van getrokken namen leeg
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});

// Initialiseer actieveNamen bij het laden van de pagina
window.onload = function() {
    resetActieveNamen();
};