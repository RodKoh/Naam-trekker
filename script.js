let namen = [];
let getrokkenNamen = []; // Tijdelijke opslag voor de namen getrokken in de huidige ronde
let geschiedenis = []; // Opslag voor elke ronde's getrokken namen

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (naam && !namen.includes(naam)) {
        namen.push(naam);
        updateNamenLijst();
        naamInput.value = ''; // Reset inputveld
        // Zorg dat de "Trek naam" knop zichtbaar is wanneer er namen zijn om te trekken.
        document.getElementById('trekNaamKnop').style.display = 'block';
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
    if (getrokkenNamen.length === namen.length) {
        alert('Alle namen zijn al getrokken. Start een nieuwe ronde.');
        return;
    }

    let beschikbareNamen = namen.filter(naam => !getrokkenNamen.includes(naam));
    let getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    getrokkenNamen.push(getrokkenNaam);

    document.getElementById('getrokkenNamen').innerHTML += `<li>${getrokkenNaam}</li>`;

    if (getrokkenNamen.length === namen.length) {
        document.getElementById('trekNaamKnop').style.display = 'none'; // Verberg de knop als alle namen getrokken zijn
        geschiedenis.push([...getrokkenNamen]); // Voeg de getrokken namen van de huidige ronde toe aan de geschiedenis
        updateGeschiedenis();
    }
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length) {
        geschiedenis.push([...getrokkenNamen]); // Zorg ervoor dat gedeeltelijk getrokken namen ook bewaard blijven
        updateGeschiedenis();
    }
    getrokkenNamen = [];
    document.getElementById('getrokkenNamen').innerHTML = '';
    document.getElementById('trekNaamKnop').style.display = namen.length ? 'block' : 'none';
    alert('Nieuwe ronde gestart. Je kunt weer namen trekken.');
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    geschiedenis.forEach((ronde, index) => {
        let rondeTekst = `Ronde ${index + 1}: ${ronde.join(', ')}`;
        geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
    });
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});