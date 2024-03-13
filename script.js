let namen = [];
let rondesGeschiedenis = []; // Bevat lijsten van namen voor elke ronde

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
    updateNamenLijst();
    updateTrekNaamKnopStatus();
}

function trekNaam() {
    // Voorkom trekken als er geen namen zijn of alle namen al getrokken zijn
    if (!rondesGeschiedenis.length || rondesGeschiedenis[0].length === namen.length) {
        updateTrekNaamKnopStatus();
        return;
    }
    const beschikbareNamen = namen.filter(naam => !rondesGeschiedenis[0].includes(naam));
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    rondesGeschiedenis[0].push(getrokkenNaam);
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (rondesGeschiedenis.length === 0 || rondesGeschiedenis[0].length < namen.length) {
        rondesGeschiedenis.unshift([]);
        updateGeschiedenis();
    } else {
        alert('Alle namen zijn al getrokken voor deze ronde.');
    }
    updateTrekNaamKnopStatus();
}

function updateGeschiedenis() {
    const geschiedenisLijst = document.getElementById('trekkingGeschiedenis');
    geschiedenisLijst.innerHTML = '';
    rondesGeschiedenis.forEach((ronde, index) => {
        const rondeTekst = `Ronde ${rondesGeschiedenis.length - index}: ${ronde.join(', ')}`;
        geschiedenisLijst.innerHTML += `<li>${rondeTekst}</li>`;
    });
}

function updateTrekNaamKnopStatus() {
    const trekNaamKnop = document.getElementById('trekNaamKnop');
    trekNaamKnop.style.display = (rondesGeschiedenis.length === 0 || rondesGeschiedenis[0].length < namen.length) ? '' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Voorkom herladen van de pagina
        voegNaamToe();
    }
});