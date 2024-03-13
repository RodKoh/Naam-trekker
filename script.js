let namen = [];
let getrokkenNamen = []; // Namen getrokken in de huidige ronde
let rondesGeschiedenis = []; // Bevat de geschiedenis van alle rondes

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
    namen = namen.filter(n => n !== naam);
    getrokkenNamen = getrokkenNamen.filter(n => n !== naam); // Zorg ervoor dat verwijderde namen ook uit getrokkenNamen verwijderd worden
    updateNamenLijst();
    updateTrekNaamKnopStatus();
}

function trekNaam() {
    if (getrokkenNamen.length === namen.length) {
        updateTrekNaamKnopStatus(); // Zorgt ervoor dat de knop correct wordt bijgewerkt
        return;
    }

    const beschikbareNamen = namen.filter(naam => !getrokkenNamen.includes(naam));
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    getrokkenNamen.push(getrokkenNaam);
    rondesGeschiedenis.push(getrokkenNaam); // Voeg toe aan de huidige ronde geschiedenis

    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (getrokkenNamen.length < namen.length && !confirm('Niet alle namen zijn getrokken. Wil je toch een nieuwe ronde starten?')) {
        return;
    }
    getrokkenNamen = []; // Reset getrokken namen voor de nieuwe ronde
    rondesGeschiedenis = []; // Reset de ronde geschiedenis
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((naam, index) => {
        geschiedenisLijst.innerHTML += `<li>${naam}</li>`;
    });
}

function updateTrekNaamKnopStatus() {
    document.getElementById('trekNaamKnop').style.display = getrokkenNamen.length < namen.length ? '' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        voegNaamToe();
    }
});