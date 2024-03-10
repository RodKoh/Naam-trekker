let namen = [];
let getrokkenNamen = []; // Namen getrokken in de huidige ronde
let rondesGeschiedenis = [[]]; // Begint met één lege ronde voor de geschiedenis

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        document.getElementById('trekNaamKnop').style.display = 'inline'; // Zorg dat de trekknop zichtbaar is
    } else {
        alert('Deze naam bestaat al of is leeg.');
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = '';
    namen.forEach(naam => {
        let li = document.createElement('li');
        li.textContent = naam;
        let verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijder';
        verwijderBtn.onclick = function() { verwijderNaam(naam); };
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    if (confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        namen = namen.filter(n => n !== naam);
        updateNamenLijst();
    }
}

function trekNaam() {
    if (namen.length === 0) {
        alert('Voeg eerst namen toe voor de trekking.');
        return;
    }

    let beschikbareNamen = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (beschikbareNamen.length > 0) {
        let getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
        getrokkenNamen.push(getrokkenNaam);
        rondesGeschiedenis[rondesGeschiedenis.length - 1].push(getrokkenNaam); // Voeg toe aan de huidige ronde in de geschiedenis
        updateGeschiedenis();
    } else {
        alert('Alle namen zijn getrokken voor deze ronde.');
    }

    // Controleer na het trekken of er nog namen beschikbaar zijn om te trekken.
    if (beschikbareNamen.length <= 1) {
        document.getElementById('trekNaamKnop').style.display = 'none'; // Verberg de "Trek naam" knop als dit de laatste naam was
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length) {
        alert('Start een nieuwe ronde terwijl er nog namen niet getrokken zijn.');
    }

    getrokkenNamen = [];
    rondesGeschiedenis.push([]); // Begin een nieuwe ronde in de geschiedenis
    document.getElementById('trekNaamKnop').style.display = namen.length ? 'inline' : 'none'; // Toon de knop als er namen zijn om te trekken
    updateGeschiedenis(); // Update de geschiedenis direct om de nieuwe ronde weer te geven
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        if (ronde.length > 0) { // Toon alleen niet-lege rondes
            let rondeTekst = `Ronde ${index + 1}: ${ronde.join(', ')}`;
            geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
        }
    });
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});