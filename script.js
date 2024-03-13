let namen = [];
let rondesGeschiedenis = []; // Hier worden de getrokken namen per ronde opgeslagen

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
    getrokkenNamenVanAlleRondes = rondesGeschiedenis.flat();
    if (getrokkenNamenVanAlleRondes.includes(naam)) {
        alert("Je kunt een al getrokken naam niet verwijderen.");
        return;
    }
    updateNamenLijst();
    updateTrekNaamKnopStatus();
}

function trekNaam() {
    const laatsteRonde = rondesGeschiedenis[rondesGeschiedenis.length - 1] || [];
    if (laatsteRonde.length === namen.length) {
        alert('Alle namen zijn getrokken voor deze ronde.');
        return;
    }
    const beschikbareNamen = namen.filter(naam => !laatsteRonde.includes(naam));
    const getrokkenNaam = beschikbareNamen[Math.floor(Math.random() * beschikbareNamen.length)];
    if (!rondesGeschiedenis.length || laatsteRonde.length === namen.length) {
        rondesGeschiedenis.push([getrokkenNaam]);
    } else {
        laatsteRonde.push(getrokkenNaam);
    }
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
}

function startNieuweRonde() {
    if (!rondesGeschiedenis.length || rondesGeschiedenis[rondesGeschiedenis.length - 1].length < namen.length) {
        alert('Je moet alle namen trekken voordat je een nieuwe ronde start.');
        return;
    }
    rondesGeschiedenis.push([]);
    updateGeschiedenis();
    updateTrekNaamKnopStatus();
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
    const laatsteRonde = rondesGeschiedenis[rondesGeschiedenis.length - 1] || [];
    document.getElementById('trekNaamKnop').style.display = laatsteRonde.length < namen.length ? '' : 'none';
}

document.getElementById('naamInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Voorkomt dat de pagina ververst wordt bij het indrukken van Enter
        voegNaamToe();
    }
});