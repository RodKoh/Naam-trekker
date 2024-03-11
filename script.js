let namen = [];
let rondesGeschiedenis = [[]]; // Bevat lijsten van namen voor elke ronde, inclusief de huidige

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
    // Toon altijd de "Trek naam" knop als er namen zijn, tenzij ze allemaal al getrokken zijn
    updateTrekNaamKnopStatus();
}

function updateNamenLijst() {
    const namenLijst = document.getElementById('namenLijst');
    namenLijst.innerHTML = '';
    namen.forEach(naam => {
        let li = document.createElement('li');
        li.textContent = naam;
        let verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijder';
        verwijderBtn.onclick = () => verwijderNaam(naam);
        li.appendChild(verwijderBtn);
        namenLijst.appendChild(li);
    });
}

function verwijderNaam(naam) {
    if (confirm('Weet je zeker dat je deze naam wilt verwijderen?')) {
        namen = namen.filter(n => n !== naam);
        updateNamenLijst();
        // Mogelijkheid tot trekken heroverwegen als namen worden verwijderd
        updateTrekNaamKnopStatus();
    }
}

function trekNaam() {
    const nogTeTrekkenNamen = namen.filter(naam => !rondesGeschiedenis[rondesGeschiedenis.length - 1].includes(naam));
    if (nogTeTrekkenNamen.length === 0) {
        alert('Alle namen zijn al getrokken voor deze ronde.');
        return;
    }
    const getrokkenNaam = nogTeTrekkenNamen[Math.floor(Math.random() * nogTeTrekkenNamen.length)];
    rondesGeschiedenis[rondesGeschiedenis.length - 1].push(getrokkenNaam);
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (rondesGeschiedenis[rondesGeschiedenis.length - 1].length < namen.length && !confirm('Niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    rondesGeschiedenis.push([]);
    updateTrekNaamKnopStatus();
    updateGeschiedenis();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        if (ronde.length > 0) {
            const rondeTekst = `Ronde ${index + 1}: ${ronde.join(', ')}`;
            geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
        }
    });
}

function updateTrekNaamKnopStatus() {
    const huidigeRondeNamen = rondesGeschiedenis[rondesGeschiedenis.length - 1];
    const zijnAlleNamenGetrokken = namen.every(naam => huidigeRondeNamen.includes(naam));
    document.getElementById('trekNaamKnop').style.display = zijnAlleNamenGetrokken ? 'none' : '';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});