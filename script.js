let namen = [];
let rondesGeschiedenis = []; // Bevat getrokken namen voor elke ronde

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
    naamInput.value = '';
    updateTrekNaamKnopStatus(); // Verzekert dat de knop getoond wordt als er namen zijn om te trekken.
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
    namen = namen.filter(n => n !== naam);
    updateNamenLijst();
    updateTrekNaamKnopStatus(); // Herbereken de status van de knop na het verwijderen van een naam.
}

function trekNaam() {
    if (namen.length === 0 || (rondesGeschiedenis.length && rondesGeschiedenis[0].length === namen.length)) {
        // Als alle namen getrokken zijn, toon de knop niet.
        updateTrekNaamKnopStatus();
        return;
    }
    if (!rondesGeschiedenis.length || rondesGeschiedenis[0].length === namen.length) {
        rondesGeschiedenis.unshift([]); // Begin een nieuwe ronde als de vorige vol is
    }
    const beschikbareNamen = namen.filter(naam => !rondesGeschiedenis[0].includes(naam));
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    rondesGeschiedenis[0].push(getrokkenNaam);
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (!rondesGeschiedenis.length || rondesGeschiedenis[0].length < namen.length) {
        alert('Je moet alle namen trekken voordat je een nieuwe ronde start.');
    } else {
        rondesGeschiedenis.unshift([]); // Voegt een nieuwe lege ronde toe aan het begin van de geschiedenis
        updateTrekNaamKnopStatus();
    }
    updateGeschiedenis();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        let rondeTekst = `Ronde ${index + 1}: ${ronde.join(', ')}`;
        geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
    });
}

function updateTrekNaamKnopStatus() {
    const knop = document.getElementById('trekNaamKnop');
    if (!rondesGeschiedenis.length || rondesGeschiedenis[0].length < namen.length) {
        knop.style.display = '';
    } else {
        knop.style.display = 'none';
    }
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});