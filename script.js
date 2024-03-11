let namen = [];
let getrokkenNamen = []; // Namen getrokken in de huidige ronde
let geschiedenisRondes = [[]]; // Begint met één lege ronde voor de geschiedenis

function voegNaamToe() {
    const naamInput = document.getElementById('naamInput');
    const naam = naamInput.value.trim();
    if (!naam) {
        alert('De naam mag niet leeg zijn.');
        return;
    }
    if (namen.includes(naam)) {
        alert('Deze naam bestaat al.');
        return;
    }
    namen.push(naam);
    updateNamenLijst();
    naamInput.value = ''; // Reset inputveld
    if (namen.length === 1 || getrokkenNamen.length < namen.length) {
        document.getElementById('trekNaamKnop').style.display = 'inline'; // Toon de "Trek naam" knop
    }
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = '';
    namen.forEach(naam => {
        const li = document.createElement('li');
        li.textContent = naam;
        const verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijder';
        verwijderBtn.onclick = () => verwijderNaam(naam);
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    if (!confirm('Weet je zeker dat je deze naam wilt verwijderen?')) return;
    namen = namen.filter(n => n !== naam);
    // Direct bijwerken van de getrokken namen is niet langer nodig; de logica hanteert nu verwijderingen adequaat.
    updateNamenLijst();
    document.getElementById('trekNaamKnop').style.display = getrokkenNamen.length < namen.length ? 'inline' : 'none';
}

function trekNaam() {
    const beschikbareNamen = namen.filter(naam => !getrokkenNamen.includes(naam));
    if (beschikbareNamen.length === 0) {
        alert('Alle namen zijn al getrokken voor deze ronde.');
        return;
    }
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    getrokkenNamen.push(getrokkenNaam);
    geschiedenisRondes[geschiedenisRondes.length - 1].push(getrokkenNaam); // Voeg toe aan de huidige ronde
    updateGeschiedenis();
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    getrokkenNamen = [];
    geschiedenisRondes.push([]); // Start een nieuwe ronde in de geschiedenis
    document.getElementById('trekNaamKnop').style.display = namen.length > 0 ? 'inline' : 'none'; // Toon of verberg de trekknop
    updateGeschiedenis();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    geschiedenisRondes.forEach((ronde, index) => {
        if (ronde.length > 0) { // Toon alleen rondes met getrokken namen
            const rondeTekst = `Ronde ${index + 1}: ${ronde.join(', ')}`;
            geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
        }
    });
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});